"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { GeneralCompanion } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chat-message";

import { useTranslations } from 'next-intl';

interface ChatMessagesProps {
  generalMessages: ChatMessageProps[];
  isLoading: boolean;
  generalCompanion: GeneralCompanion;
}

export const ChatMessages = ({
  generalMessages = [],
  isLoading,
  generalCompanion,
}: ChatMessagesProps) => {

//
const t = useTranslations('chat');
//

  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    generalMessages.length === 0 ? true : false,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [generalMessages]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={generalCompanion.src}
        role="system"
        content={`${t('hi')} ${generalCompanion.name}, ${generalCompanion.description}. ${t('howCanIHelp')}?`}
        //content={`${t('hi')} ${generalCompanion.name}, ${generalCompanion.description}. ${t('howCanIHelpGolf')}?`}
        /* content={`Bonjour, je suis ${generalCompanion.name}, ${generalCompanion.description}. Mon rôle est d'assurer le bon réroulement d'une partie, prendre des décisions sur des situations complexes et gérer les désaccords entre joueurs en appliquant les règles du R&A et de l'USGA avec précision. Comment puis-je vous aider? `} */
      />
      {generalMessages.map((generalMessage) => (
        <ChatMessage
          key={generalMessage.id}
          src={generalCompanion.src}
          content={generalMessage.content}
          role={generalMessage.role}
          isLoading={generalMessage.isLoading}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};
