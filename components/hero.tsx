import React from 'react';
import { Logo } from "@/components/logo";
import {useTranslations} from 'next-intl';



const Hero = () => {
    const t = useTranslations('Auth');
  return (
    <section className="flex flex-col items-center justify-center md:h-screen">
  <div className="container justify-center mx-auto p-4 max-w-md">
    <div className="mx-auto mb-4 w-20 h-20 xs:w-20 xs:h-20 sm:w-20 sm:h-20 md:w-40 md:h-40 lg:w-80 lg:h-80">
      <Logo />
    </div>
    <h1 className="text-4xl font-bold text-center mb-4">{t('vulcain')}</h1>
    <p className="text-lg text-gray-600 text-center">{t('vulcainDescription')}.</p>
  </div>
</section>
  );
};

export default Hero;