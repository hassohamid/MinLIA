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
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import SearchBar from "./search-bar";

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
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Sortering */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-muted-foreground" />
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sortera efter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company-asc">Företag A-Ö</SelectItem>
                  <SelectItem value="company-desc">Företag Ö-A</SelectItem>
                  <SelectItem value="date-desc">Senaste datum</SelectItem>
                  <SelectItem value="date-asc">Äldsta datum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filtrera status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Status</SelectItem>
                  <SelectItem value="skickat">Skickat</SelectItem>
                  <SelectItem value="antagen">Antagen</SelectItem>
                  <SelectItem value="besvarat">Besvarat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Favoriter knapp */}
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              onClick={() => handleFavoriteFilter(!showFavoritesOnly)}
              className="flex items-center gap-2"
            >
              <Heart
                size={16}
                className={
                  showFavoritesOnly ? "fill-white text-white" : "text-red-500"
                }
              />
              Favoriter
              {favoriteCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {favoriteCount}
                </Badge>
              )}
            </Button>

            {/* Reset filters */}
            {(statusFilter !== "all" ||
              showFavoritesOnly ||
              searchQuery.trim()) && (
              <Button
                variant="ghost"
                onClick={() => {
                  handleStatusFilter("all");
                  handleFavoriteFilter(false);
                  handleSearchChange("");
                }}
                className="text-muted-foreground"
              >
                Rensa filter
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Sök efter företag eller roll..."
            />
          </div>

          <Separator className="mb-6" />

          <div className="flex flex-col items-center justify-center py-12">
            <Filter size={48} className="text-muted-foreground mb-4" />
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
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Sortering */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-muted-foreground" />
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sortera efter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company-asc">Företag A-Ö</SelectItem>
                <SelectItem value="company-desc">Företag Ö-A</SelectItem>
                <SelectItem value="date-desc">Senaste datum</SelectItem>
                <SelectItem value="date-asc">Äldsta datum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filtrera status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                <SelectItem value="skickat">Skickat</SelectItem>
                <SelectItem value="antagen">Antagen</SelectItem>
                <SelectItem value="besvarat">Besvarat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Favoriter knapp */}
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => handleFavoriteFilter(!showFavoritesOnly)}
            className="flex items-center gap-2"
          >
            <Heart
              size={16}
              className={
                showFavoritesOnly ? "fill-white text-white" : "text-red-500"
              }
            />
            Favoriter
            {favoriteCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {favoriteCount}
              </Badge>
            )}
          </Button>

          {/* Reset filters */}
          {(statusFilter !== "all" ||
            showFavoritesOnly ||
            searchQuery.trim()) && (
            <Button
              variant="ghost"
              onClick={() => {
                handleStatusFilter("all");
                handleFavoriteFilter(false);
                handleSearchChange("");
              }}
              className="text-muted-foreground"
            >
              Rensa filter
            </Button>
          )}
        </div>

        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Sök efter företag eller roll..."
          />
        </div>

        <Separator className="mb-6" />

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
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} />
                  </Button>
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
    </Card>
  );
}
