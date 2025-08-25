import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import type { Application } from "@/types";

interface DeleteDialogProps {
  isOpen: boolean;
  application: Application | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({
  isOpen,
  application,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 size={20} className="text-red-500" />
            Ta bort ansökan
          </DialogTitle>
          <DialogDescription>
            Är du säker på att du vill ta bort ansökningen till{" "}
            <span className="font-semibold">{application?.company}</span> för
            rollen <span className="font-semibold">{application?.role}</span>?
            <br />
            <br />
            <span className="text-red-600 text-sm">
              Denna åtgärd kan inte ångras.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Avbryt
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="w-full sm:w-auto"
          >
            <Trash2 size={16} className="mr-2" />
            Ta bort
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
