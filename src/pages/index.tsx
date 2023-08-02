import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "./providers/LocaleProvider";
import Image from "next/image";

export default function Home() {
  const changeLanguage = useLanguage();
  const { formatMessage } = useTranslations();
  const articles = api.articles.getAllArticles.useQuery();

  return (
    <>
      <Head>
        <title>Agenda | Your daily portion of news</title>
        <meta
          name="description"
          content="Explore breaking news, in-depth reporting, and thought-provoking editorials from around the world with our leading newspaper agency. Stay informed and engaged with daily updates on politics, business, sports, culture, and more."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <h1>The latest</h1>
        {/* Database && seeder test */}
        <div>
          {articles.data?.map((article) => (
            <div className="mb-4 rounded-md border border-gray-600 p-6">
              <Image
                src={article.thumbnailUrl}
                alt={article.title}
                width={280}
                height={195}
              />
              <ul>
                <li>{article.author.name}</li>
                <li>{article.category}</li>
                <li>{article.title}</li>
              </ul>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && (
          <span>
            Logged in as {sessionData.user?.name} | {sessionData.user.email}
          </span>
        )}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <img
        className=" rounded-full border border-[hsl(280,100%,70%)]"
        src={
          sessionData?.user.image ??
          "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
        }
        alt="user img"
      />
      <Button variant={"secondary"} type="button">
        You going down
      </Button>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
