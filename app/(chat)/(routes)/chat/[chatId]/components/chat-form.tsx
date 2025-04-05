/* "use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAX_CHAT_MESSAGE_LENGTH } from "@/constants";
import { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";

import { useTranslations } from 'next-intl';

interface ChatFormProps {
  isLoading: boolean;
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
}

export const ChatForm = ({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}: ChatFormProps) => {

  const t = useTranslations('chat');

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-x-2 border-t border-primary/10 py-4"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder={t('typeMessage')}
        maxLength={MAX_CHAT_MESSAGE_LENGTH}
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
};
 */












//reconnaissance vocale
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAX_CHAT_MESSAGE_LENGTH } from "@/constants";
import { ChatRequestOptions } from "ai";
import { SendHorizonal, Mic, MicOff } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { useTranslations } from 'next-intl';

interface ChatFormProps {
  isLoading: boolean;
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
}

/* const SpeechRecognition = 
  typeof window !== "undefined" && 
  (window as any).SpeechRecognition || 
  (window as any).webkitSpeechRecognition;
 */
  

export const ChatForm = ({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}: ChatFormProps) => {

  const t = useTranslations('chat');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    if (typeof window === "undefined") return;
  
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      console.error("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }
  
    const recognition = new SpeechRecognition() as typeof SpeechRecognition & {
      onresult: (event: any) => void;
    };
  
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = false;
  
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleInputChange({
        target: { value: input + " " + transcript },
      } as ChangeEvent<HTMLInputElement>);
    };
  
    recognition.start();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-x-2 border-t border-primary/10 py-4"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder={t('typeMessage')}
        maxLength={MAX_CHAT_MESSAGE_LENGTH}
        className="rounded-lg bg-primary/10"
      />
      <Button 
        disabled={isLoading} 
        variant="ghost" 
        onClick={handleVoiceInput}
        className="relative"
      >
        {isListening ? (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500 opacity-50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        ) : null}
        {isListening ? <MicOff className="h-6 w-6 text-red-500 relative" /> : <Mic className="h-6 w-6 text-green-500" />}
      </Button>
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
};
 