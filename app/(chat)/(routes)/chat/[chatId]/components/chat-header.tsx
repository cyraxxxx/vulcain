"use client";

import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { GeneralCompanion, GeneralMessage } from "@prisma/client";
import axios from "axios";
import {
  ChevronLeft,
  Edit,
  History,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useTranslations } from 'next-intl';

interface ChatHeaderProps {
  generalCompanion: GeneralCompanion & {
    generalMessages: GeneralMessage[];
  };
}

export const ChatHeader = ({ generalCompanion }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const t = useTranslations('chat');

  const onDelete = async () => {
    try {
      await axios.delete(`/api/companion/${generalCompanion.id}`);

      toast({ description: "Success." });

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const onClearMessageHistory = async () => {
    try {
      await axios.delete(`/api/companion/${generalCompanion.id}/history`);

      toast({ description: "Success." });

      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b border-primary/10 pb-4">
      <div className="flex items-center gap-x-2">
        <Button size="icon" variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={generalCompanion.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{generalCompanion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="mr-1 h-3 w-3" />
              {generalCompanion.generalMessages.length}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
          {t('createdBy')} {generalCompanion.userName}
            {/* Created by {companion.userName} */}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-4 outline-none">
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onClearMessageHistory}>
            <History className="mr-2 h-4 w-4" />
            {t('clearHistory')}
            {/* Clear Message History */}
          </DropdownMenuItem>
          {user?.id === generalCompanion.userId && (
            <>
              <DropdownMenuItem
                onClick={() => router.push(`/companion/${generalCompanion.id}`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                {t('edit')}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={onDelete}>
                <Trash className="mr-2 h-4 w-4" />
                {t('delete')}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
