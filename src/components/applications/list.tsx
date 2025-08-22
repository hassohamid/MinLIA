"use client";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Calendar,
  User,
  MoreHorizontal,
  Heart,
  Edit,
  Trash2,
  Send,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterBar from "./filter-bar";

interface Application {
  id: number;
  companyName: string;
  role: string;
  applicationDate: string;
  status: string;
  isFavorite: boolean;
}

interface ApplicationListProps {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "skickat":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200"
        >
          Skickat
        </Badge>
      );
    case "antagen":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Antagen
        </Badge>
      );
    case "besvarat":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          Besvarat
        </Badge>
      );
    default:
      return <Badge variant="outline">Okänd</Badge>;
  }
};

export default function ApplicationList({
  applications,
  setApplications,
}: ApplicationListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("company-asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<Application | null>(null);
  const itemsPerPage = 10;

  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    let filtered = [...applications];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (app) =>
          app.companyName.toLowerCase().includes(query) ||
          app.role.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((app) => app.isFavorite);
    }

    // Sort applications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "company-asc":
          return a.companyName.localeCompare(b.companyName);
        case "company-desc":
          return b.companyName.localeCompare(a.companyName);
        case "date-desc":
          return (
            new Date(b.applicationDate).getTime() -
            new Date(a.applicationDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.applicationDate).getTime() -
            new Date(b.applicationDate).getTime()
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [applications, sortBy, statusFilter, showFavoritesOnly, searchQuery]);

  const totalPages = Math.ceil(
    filteredAndSortedApplications.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredAndSortedApplications.slice(
    startIndex,
    endIndex
  );

  const favoriteCount = applications.filter(
    (app: Application) => app.isFavorite
  ).length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFavorite = (id: number) => {
    setApplications((prev: Application[]) =>
      prev.map((app: Application) =>
        app.id === id ? { ...app, isFavorite: !app.isFavorite } : app
      )
    );
  };

  const updateApplicationStatus = (id: number, newStatus: string) => {
    setApplications((prev: Application[]) =>
      prev.map((app: Application) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const deleteApplication = (id: number) => {
    setApplications((prev: Application[]) =>
      prev.filter((app: Application) => app.id !== id)
    );
  };

  const handleDeleteClick = (application: Application) => {
    setApplicationToDelete(application);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (applicationToDelete) {
      deleteApplication(applicationToDelete.id);
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setApplicationToDelete(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "skickat":
        return <Send size={14} className="text-yellow-600" />; // Gul som badge
      case "antagen":
        return <UserCheck size={14} className="text-green-600" />; // Grön som badge
      case "besvarat":
        return <MessageSquare size={14} className="text-blue-600" />; // Blå som badge
      default:
        return null;
    }
  };

  // Reset page when filters change
  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleFavoriteFilter = (showFavorites: boolean) => {
    setShowFavoritesOnly(showFavorites);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Building2 size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Inga ansökningar än</h3>
          <p className="text-muted-foreground text-center">
            Lägg till din första LIA-ansökan för att komma igång!
          </p>
        </CardContent>
      </Card>
    );
  }

  if (filteredAndSortedApplications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 size={20} />
            Dina ansökningar ({applications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FilterBar
            onSortChange={handleSortChange}
            onStatusFilter={handleStatusFilter}
            onFavoriteFilter={handleFavoriteFilter}
            onSearchChange={handleSearchChange}
            currentSort={sortBy}
            currentStatusFilter={statusFilter}
            showFavoritesOnly={showFavoritesOnly}
            favoriteCount={favoriteCount}
            searchQuery={searchQuery}
          />

          <div className="flex flex-col items-center justify-center py-12">
            <Building2 size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Inga resultat hittades
            </h3>
            <p className="text-muted-foreground text-center">
              Prova att justera dina filter eller sökkriterier.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 size={20} />
          Dina ansökningar ({filteredAndSortedApplications.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FilterBar
          onSortChange={handleSortChange}
          onStatusFilter={handleStatusFilter}
          onFavoriteFilter={handleFavoriteFilter}
          onSearchChange={handleSearchChange}
          currentSort={sortBy}
          currentStatusFilter={statusFilter}
          showFavoritesOnly={showFavoritesOnly}
          favoriteCount={favoriteCount}
          searchQuery={searchQuery}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  Företag
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  Roll
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Ansökningsdatum
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentApplications.map((application) => (
              <TableRow key={application.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {application.companyName}
                </TableCell>
                <TableCell>{application.role}</TableCell>
                <TableCell>
                  {new Date(application.applicationDate).toLocaleDateString(
                    "sv-SE"
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(application.id)}
                    className="p-1 h-8 w-8"
                  >
                    <Heart
                      size={16}
                      className={`transition-colors ${
                        application.isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Åtgärder</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* Status ändringar */}
                      <DropdownMenuItem
                        onClick={() =>
                          updateApplicationStatus(application.id, "skickat")
                        }
                        disabled={application.status === "skickat"}
                        className="flex items-center gap-2"
                      >
                        <Send size={14} className="text-yellow-600" />
                        Markera som skickat
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          updateApplicationStatus(application.id, "besvarat")
                        }
                        disabled={application.status === "besvarat"}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare size={14} className="text-blue-600" />
                        Markera som besvarat
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          updateApplicationStatus(application.id, "antagen")
                        }
                        disabled={application.status === "antagen"}
                        className="flex items-center gap-2"
                      >
                        <UserCheck size={14} className="text-green-600" />
                        Markera som antagen
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* Ta bort */}
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(application)}
                        className="flex items-center gap-2 text-red-600 focus:text-red-600"
                      >
                        <Trash2 size={14} />
                        Ta bort ansökan
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>

      {/* Bekräftelsedialog för borttagning */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 size={20} className="text-red-500" />
              Ta bort ansökan
            </DialogTitle>
            <DialogDescription>
              Är du säker på att du vill ta bort ansökningen till{" "}
              <span className="font-semibold">
                {applicationToDelete?.companyName}
              </span>{" "}
              för rollen{" "}
              <span className="font-semibold">{applicationToDelete?.role}</span>
              ?
              <br />
              <br />
              <span className="text-red-600 text-sm">
                Denna åtgärd kan inte ångras.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 ">
            <Button
              variant="outline"
              onClick={cancelDelete}
              className="w-full sm:w-auto"
            >
              Avbryt
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="w-full sm:w-auto"
            >
              <Trash2 size={16} className="mr-2" />
              Ta bort
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
