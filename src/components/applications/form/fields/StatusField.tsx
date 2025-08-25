import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle2,
  Send,
  MessageSquare,
  Info,
  UserRoundCheck,
} from "lucide-react";

export function StatusField() {
  return (
    <div className="space-y-3 group">
      <Label
        htmlFor="status"
        className="flex items-center gap-2 text-sm font-medium"
      >
        <CheckCircle2 size={16} className="text-yellow-300" />
        Status
        <div className="hidden sm:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="ml-2 w-5 h-5 rounded-md bg-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center cursor-help">
                  <Info
                    size={12}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="p-0 border-0 bg-transparent shadow-none"
                sideOffset={8}
              >
                <div className="bg-muted border rounded-lg shadow-2xl p-4 min-w-[280px] max-w-[320px]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center">
                        <Send size={15} className="text-yellow-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-primary">
                          Skickat
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Ansökan är skickad
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 py-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center">
                        <MessageSquare size={15} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-primary text-sm font-medium">
                          Besvarat
                        </div>
                        <div className="text-gray-400 text-xs">
                          Företaget har svarat
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 py-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center">
                        <UserRoundCheck size={15} className="text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-primary text-sm font-medium">
                          Antagen
                        </div>
                        <div className="text-gray-400 text-xs">
                          Du har fått platsen
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Label>
      <Select name="status" required>
        <SelectTrigger className="h-11 border-muted-foreground/20 bg-background/50">
          <SelectValue placeholder="Välj status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="skickat">
            <div className="flex items-center gap-2">
              <Send size={14} className="text-yellow-300" />
              Skickat
            </div>
          </SelectItem>
          <SelectItem value="besvarat">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-blue-600" />
              Besvarat
            </div>
          </SelectItem>
          <SelectItem value="antagen">
            <div className="flex items-center gap-2">
              <UserRoundCheck size={14} className="text-green-600" />
              Antagen
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
