"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth-actions";
import type { User } from "@supabase/supabase-js";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function NavUser({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-lg px-2 py-6 hover:bg-gray-100"
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage
              src={user?.user_metadata?.avatar_url}
              alt={user?.user_metadata?.name}
            />
            <AvatarFallback className="font-semibold bg-accent">
              {user?.email?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {user?.user_metadata?.name}
            </span>
          </div>
          <IconDotsVertical className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-[14rem] rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={user?.user_metadata?.avatar_url}
                alt={user?.user_metadata?.name}
              />
              <AvatarFallback className="font-semibold bg-accent">
                {user?.email?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user?.user_metadata?.name}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconUserCircle />
            Profil
          </DropdownMenuItem>

          <ModeToggle />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="text-destructive">
          <IconLogout />
          Logga ut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
