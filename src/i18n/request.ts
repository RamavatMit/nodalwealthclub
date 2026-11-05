import { getRequestConfig } from "next-intl/server";

/**
 * English only for launch. Hindi ("hi") and Gujarati ("gu") are added by
 * dropping messages/hi.json and messages/gu.json in place and switching to
 * locale-prefixed routing (see README "Adding a language").
 */
export const locales = ["en"] as const;
export const defaultLocale = "en";

export default getRequestConfig(async () => {
  const locale = defaultLocale;
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
