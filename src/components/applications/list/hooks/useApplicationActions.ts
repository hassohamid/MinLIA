import { useState } from "react";
import { toast } from "sonner";
import {
  updateApplicationStatus,
  toggleApplicationFavorite,
  deleteApplication,
} from "@/lib/api";
import type { Application } from "@/types";

interface UseApplicationActionsProps {
  applications: Application[];
  onHeartAnimation: (id: number, showFloating?: boolean) => void;
}

export function useApplicationActions({
  applications,
  onHeartAnimation,
}: UseApplicationActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<Application | null>(null);

  const toggleFavorite = async (id: number) => {
    const app = applications.find((app) => app.id === id);
    const isAddingToFavorites = app && !app.is_favorite;

    // Trigger animations
    onHeartAnimation(id, isAddingToFavorites);

    try {
      await toggleApplicationFavorite(id);

      // Show toast notification
      if (isAddingToFavorites) {
        toast.success("Tillagd i favoriter!", {
          description: `${app.company} har lagts till i dina favoriter`,
          icon: "❤️",
          duration: 3000,
        });
      } else {
        toast.info("Borttagen från favoriter", {
          description: `${app?.company} har tagits bort från favoriter`,
          icon: "💔",
          duration: 3000,
        });
      }
    } catch {
      toast.error("Något gick fel", {
        description: "Kunde inte uppdatera favoriter. Försök igen.",
        duration: 4000,
      });
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const app = applications.find((app) => app.id === id);

    try {
      await updateApplicationStatus(id, newStatus);

      // Show status-specific toast
      const statusMessages = {
        skickat: {
          title: "Status uppdaterad!",
          description: `${app?.company} är nu markerad som "Skickat"`,
          icon: "📤",
        },
        besvarat: {
          title: "Företaget har svarat!",
          description: `${app?.company} har besvarat din ansökan`,
          icon: "💬",
        },
        antagen: {
          title: "Grattis! 🎉",
          description: `Du har blivit antagen till ${app?.company}!`,
          icon: "✅",
        },
      };

      const message = statusMessages[newStatus as keyof typeof statusMessages];

      if (message) {
        if (newStatus === "antagen") {
          toast.success(message.title, {
            description: message.description,
            icon: message.icon,
            duration: 6000,
          });
        } else {
          toast.success(message.title, {
            description: message.description,
            icon: message.icon,
            duration: 4000,
          });
        }
      }
    } catch {
      toast.error("Kunde inte uppdatera status", {
        description: "Något gick fel. Försök igen senare.",
        duration: 4000,
      });
    }
  };

  const handleDeleteClick = (application: Application) => {
    setApplicationToDelete(application);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (applicationToDelete?.id) {
      try {
        await deleteApplication(applicationToDelete.id);

        toast.success("Ansökan borttagen", {
          description: `Ansökningen till ${applicationToDelete.company} har tagits bort`,
          icon: "🗑️",
          duration: 4000,
        });

        setDeleteDialogOpen(false);
        setApplicationToDelete(null);
      } catch {
        toast.error("Kunde inte ta bort ansökan", {
          description: "Något gick fel. Försök igen senare.",
          duration: 4000,
        });
      }
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setApplicationToDelete(null);
  };

  return {
    // Delete dialog state
    deleteDialogOpen,
    applicationToDelete,

    // Actions
    toggleFavorite,
    updateStatus,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
  };
}
