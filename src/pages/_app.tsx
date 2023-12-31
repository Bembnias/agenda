import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import LocaleProvider from "./providers/LocaleProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LocaleProvider>
        <Component {...pageProps} />
      </LocaleProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
