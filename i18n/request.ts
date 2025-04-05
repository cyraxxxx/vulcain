/* import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = 'fr';
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
 */


import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers'; // Import cookies from Next.js headers

export default getRequestConfig(async () => {
  const locale = cookies().get('locale')?.value || 'fr'; // Read locale from cookies

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

