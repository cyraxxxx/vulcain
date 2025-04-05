/* "use client";

import Link from "next/link";
import {Logo} from "@/components/logo";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import {useTranslations} from 'next-intl';

//const font = Poppins({ weight: "600", subsets: ["latin"] });
const font = Josefin_Sans({ weight: "600", subsets: ["latin"] });

interface NavbarProps {
  isPro: boolean;
}

export const Navbar = ({ isPro }: NavbarProps) => {
  const t = useTranslations('Navbar');
  const proModal = useProModal();



  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} />
        <Link href="/">
        <div className="h-12 w-12 ml-1">
          <Logo />
          </div>
        <div className="flex items-center">
          <div className="h-10 w-10">
          <Logo />
          </div>
        

          <h1
            className={cn(
              "hidden text-sm font-bold text-primary md:block md:text-3xl uppercase",
              font.className,
            )}
          >
            Golf<span className="text-green-500">eree</span>
            <span className="text-orange-500">Vulc</span>ai<span className="text-orange-500">n</span>
          </h1>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button onClick={proModal.onOpen} size="sm" variant="premium">
            {t('upgrade')}
            <Sparkles className="ml-2 h-4 w-4 fill-white text-white" />
          </Button>
        )}
   
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />

        <Button>
          languageSwitcher
        </Button>

      </div>
    </div>
  );
};
 */

"use client";

import Link from "next/link";
import {Logo} from "@/components/logo";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import {useTranslations} from 'next-intl';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';


//const font = Poppins({ weight: "600", subsets: ["latin"] });
const font = Josefin_Sans({ weight: "600", subsets: ["latin"] });

interface NavbarProps {
  isPro: boolean;
}

export const Navbar = ({ isPro }: NavbarProps) => {

  const router = useRouter(); // Move the hook call inside the function component
  const [locale, setLocale] = useState(Cookies.get('locale') || 'fr'); // Default to 'fr'

  const switchLanguage = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    Cookies.set('locale', newLocale, { expires: 365 }); // Persist the locale in cookies
    setLocale(newLocale);
    router.refresh(); // Refresh the page to reload messages
  };

  const t = useTranslations('Navbar');
  const proModal = useProModal();



  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} />
        <Link href="/">
        <div className="h-12 w-12 ml-1">
          <Logo />
          </div>

        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button onClick={proModal.onOpen} size="sm" variant="premium">
            {t('upgrade')}
            <Sparkles className="ml-2 h-4 w-4 fill-white text-white" />
          </Button>
        )}
   
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />

        <Button className="rounded-full" onClick={switchLanguage}>
          {locale === 'fr' ? 'EN' : 'FR'}
        </Button>

      </div>
    </div>
  );
};
