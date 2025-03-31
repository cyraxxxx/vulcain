import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import {useTranslations} from 'next-intl';


const SettingsPageContent = ({ isPro }: { isPro: boolean }) => {
  const t = useTranslations('Settings');
  return <div className="h-full p-4 space-y-2">
  <h3 className="text-lg font-medium">{t('settings')}</h3>
  <div className="text-muted-foreground text-sm">
  {isPro ? t('proPlanStatusDescription') : t('freePlanStatusDescription')}
</div>
  <SubscriptionButton isPro={isPro} />
</div>;
};




const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    

<SettingsPageContent isPro={isPro} />

   );
}
 
export default SettingsPage;
