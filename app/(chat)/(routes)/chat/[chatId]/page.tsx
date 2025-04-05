import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { ChatClient } from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const generalCompanion = await prismadb.generalCompanion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      generalMessages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
    },
  });

  if (!generalCompanion) {
    return redirect("/");
  }

  return <ChatClient generalCompanion={generalCompanion} />;
};

export default ChatIdPage;
