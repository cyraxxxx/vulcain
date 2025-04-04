"use client";

import { useCompletion } from "ai/react";
import { FormEvent, useEffect, useState } from "react";
import { GeneralCompanion, GeneralMessage } from "@prisma/client";
import { useRouter } from "next/navigation";

import { ChatForm } from "./chat-form";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatMessageProps } from "./chat-message";
import { useToast } from "@/components/ui/use-toast";

import {useTranslations} from 'next-intl';



interface ChatClientProps {
  generalCompanion: GeneralCompanion & {
    generalMessages: GeneralMessage[];
  };
}

export const ChatClient = ({ generalCompanion }: ChatClientProps) => {
//
  if (!generalCompanion) {
    throw new Error("Companion is required");
  }
//
  const router = useRouter();
  const { toast } = useToast();
  const [generalMessages, setMessages] = useState<ChatMessageProps[]>(
    generalCompanion.generalMessages,
  );

  useEffect(() => {
    setMessages(generalCompanion.generalMessages);
  }, [generalCompanion, setMessages]);

  const t = useTranslations('statusMessage');

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${generalCompanion.id}`,
      onFinish(prompt, completion) {
        setInput("");

        router.refresh();
      },
      onError(e) {
        
        setMessages(generalCompanion.generalMessages);

        if (e.message == "Premium subscription is required") {
          toast({
            description:
            t('reachLimit'),
            variant: "destructive",
          });
        } else {
          toast({
            description: t('somethingWrong'),
            variant: "destructive",
          });
        }
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
      id: "user" + new Date().toISOString(),
    };
    const systemMessage: ChatMessageProps = {
      role: "system",
      isLoading: true,
      id: "system" + new Date().toISOString(),
    };
    setMessages((current) => [...current, userMessage, systemMessage]);

    handleSubmit(e);
  };



  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader generalCompanion={generalCompanion} />
      <ChatMessages
        generalCompanion={generalCompanion}
        isLoading={isLoading}
        generalMessages={generalMessages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};






/* "use client";

import { useCompletion } from "ai/react";
import { FormEvent, useEffect, useState } from "react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";

import { ChatForm } from "./chat-form";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatMessageProps } from "./chat-message";
import { useToast } from "@/components/ui/use-toast";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
  };
}

export const ChatClient = ({ companion }: ChatClientProps) => {

  if (!companion) {
    throw new Error("Companion is required");
  }

  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages,
  );

  useEffect(() => {
    setMessages(companion.messages);
  }, [companion, setMessages]);



  ///
  console.log("Before useCompletion hook called"); 
///


  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      
      onFinish(prompt, completion) {
      //onFinish(prompt, completion) {
        
        console.log("onFinish called!");
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => {
          console.log("Updated messages:", [...current, systemMessage]);
          return [...current, systemMessage];
        });
        setInput("");
      
        router.refresh();
      },
      onError(e) {
//////////////////////
//on retravaille ca ici
setInput("");
//wait 5 secondes
setTimeout(() => {
  router.refresh();
}, 5000);
/////////////////////

      },
    });

const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
      id: "user" + new Date().toISOString(),
    };
    const systemMessage: ChatMessageProps = {
      role: "system",
      isLoading: true,
      id: "system" + new Date().toISOString(),
    };
    setMessages((current) => [...current, userMessage, systemMessage]);

    handleSubmit(e);
  };
  


  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

 */
