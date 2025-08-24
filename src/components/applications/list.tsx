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
} from "@/components/ui/dialog";
import FilterBar from "./filter-bar";
import type { Application } from "./types";
import {
  updateApplicationStatus,
  toggleApplicationFavorite,
  deleteApplication,
} from "@/lib/api";

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
}: {
  applications: Application[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("company-asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<Application | null>(null);
  const [heartAnimations, setHeartAnimations] = useState<{
    [key: string]: boolean;
  }>({});
  const [floatingHearts, setFloatingHearts] = useState<{
    [key: string]: boolean;
  }>({});
  const itemsPerPage = 10;

  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    let filtered = [...applications];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (app) =>
          app.company.toLowerCase().includes(query) ||
          app.role.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((app) => app.is_favorite);
    }

    // Sort applications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "company-asc":
          return a.company.localeCompare(b.company);
        case "company-desc":
          return b.company.localeCompare(a.company);
        case "date-desc":
          return (
            new Date(b.applied_date).getTime() -
            new Date(a.applied_date).getTime()
          );
        case "date-asc":
          return (
            new Date(a.applied_date).getTime() -
            new Date(b.applied_date).getTime()
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
    (app: Application) => app.is_favorite
  ).length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFavorite = async (id?: number) => {
    if (!id) return;

    // Trigger heart animation
    setHeartAnimations((prev) => ({ ...prev, [id]: true }));

    // Check if we're adding to favorites to trigger floating hearts
    const app = applications.find((app) => app.id === id);
    if (app && !app.is_favorite) {
      setFloatingHearts((prev) => ({ ...prev, [id]: true }));

      // Remove floating hearts after animation
      setTimeout(() => {
        setFloatingHearts((prev) => ({ ...prev, [id]: false }));
      }, 1000);
    }

    // Remove heart animation after duration
    setTimeout(() => {
      setHeartAnimations((prev) => ({ ...prev, [id]: false }));
    }, 600);

    // TODO: Implement actual favorite toggle logic with server action
    console.log("Toggle favorite for application:", id);
    await toggleApplicationFavorite(id);
  };

  const updateStatus = async (id?: number, newStatus?: string) => {
    if (!id || !newStatus) return;

    await updateApplicationStatus(id, newStatus);
  };

  const deleteApp = async (id?: number) => {
    if (!id) return;

    await deleteApplication(id);
  };

  const handleDeleteClick = (application: Application) => {
    setApplicationToDelete(application);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (applicationToDelete?.id) {
      await deleteApp(applicationToDelete.id);
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setApplicationToDelete(null);
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
      <>
        <style>{`
          @keyframes floatHeart0 {
            0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -80px) rotate(15deg) scale(1); opacity: 0; }
          }
          @keyframes floatHeart1 {
            0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
            100% { transform: translate(-20px, -60px) rotate(-10deg) scale(1); opacity: 0; }
          }
          @keyframes floatHeart2 {
            0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
            100% { transform: translate(-70px, -70px) rotate(25deg) scale(1); opacity: 0; }
          }
          @keyframes floatHeart3 {
            0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
            100% { transform: translate(-30px, -75px) rotate(-20deg) scale(1); opacity: 0; }
          }
          @keyframes floatHeart4 {
            0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
            100% { transform: translate(-60px, -65px) rotate(30deg) scale(1); opacity: 0; }
          }
          @keyframes floatHeart5 {
            0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
            100% { transform: translate(-40px, -85px) rotate(-15deg) scale(1); opacity: 0; }
          }
        `}</style>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Inga ansökningar än</h3>
            <p className="text-muted-foreground text-center">
              Lägg till din första LIA-ansökan för att komma igång!
            </p>
          </CardContent>
        </Card>
      </>
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
    <>
      <style>{`
        @keyframes floatHeart0 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -80px) rotate(15deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart1 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-20px, -60px) rotate(-10deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart2 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-70px, -70px) rotate(25deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart3 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-30px, -75px) rotate(-20deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart4 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-60px, -65px) rotate(30deg) scale(1); opacity: 0; }
        }
        @keyframes floatHeart5 {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translate(-40px, -85px) rotate(-15deg) scale(1); opacity: 0; }
        }
      `}</style>
      <Card className="mb-10">
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

          <div className="overflow-hidden">
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
                      {application.company}
                    </TableCell>
                    <TableCell>{application.role}</TableCell>
                    <TableCell>
                      {new Date(application.applied_date).toLocaleDateString(
                        "sv-SE"
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell className="relative overflow-hidden">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(application.id)}
                          className="p-1 h-8 w-8 relative overflow-visible"
                        >
                          <Heart
                            size={16}
                            className={`transition-all duration-300 ${
                              application.is_favorite
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400 hover:text-red-400"
                            } ${
                              application.id && heartAnimations[application.id]
                                ? "animate-bounce scale-125"
                                : ""
                            }`}
                            style={{
                              filter:
                                application.id &&
                                heartAnimations[application.id]
                                  ? "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))"
                                  : "",
                            }}
                          />

                          {/* Pulse effect on click */}
                          {application.id &&
                            heartAnimations[application.id] && (
                              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                            )}
                        </Button>

                        {/* Floating hearts animation */}
                        {application.id && floatingHearts[application.id] && (
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                                style={{
                                  animation: `floatHeart${i} 1s ease-out forwards`,
                                  animationDelay: `${i * 100}ms`,
                                }}
                              >
                                <Heart
                                  size={12}
                                  className="fill-red-500 text-red-500"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Åtgärder</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          {/* Status ändringar */}
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus(application.id, "skickat")
                            }
                            disabled={application.status === "skickat"}
                            className="flex items-center gap-2"
                          >
                            <Send size={14} className="text-yellow-600" />
                            Markera som skickat
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus(application.id, "besvarat")
                            }
                            disabled={application.status === "besvarat"}
                            className="flex items-center gap-2"
                          >
                            <MessageSquare
                              size={14}
                              className="text-blue-600"
                            />
                            Markera som besvarat
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus(application.id, "antagen")
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
          </div>

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
                  {applicationToDelete?.company}
                </span>{" "}
                för rollen{" "}
                <span className="font-semibold">
                  {applicationToDelete?.role}
                </span>
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
    </>
  );
}
