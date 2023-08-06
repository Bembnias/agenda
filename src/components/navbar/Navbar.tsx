"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import { articleCategories } from "./Navbar.content";

export function Navbar() {
  const { formatMessage } = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState<boolean>(false);

  return (
    <NavigationMenu className="sticky top-0 bg-white py-2">
      <div className="mx-auto flex w-11/12 flex-row items-center justify-between md:w-3/4">
        <NavigationMenuList className="flex flex-row flex-wrap items-center">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="mr-8 px-4 py-2 text-2xl text-black">
                Agenda
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <Link href="/about-us" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {formatMessage({ id: "navbar.aboutUs" })}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>
              {formatMessage({ id: "navbar.articles" })}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[1000px] lg:grid-cols-4">
                {articleCategories.map((component) => (
                  <ListItem
                    key={component.title}
                    title={formatMessage({ id: component.title })}
                    href={component.href}
                  >
                    {formatMessage({ id: component.description })}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {formatMessage({ id: "navbar.pricing" })}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <Button className="hidden md:block">Subscribe</Button>
        <Button
          className="md:hidden"
          variant={"ghost"}
          size={"icon"}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <i className="bx bx-menu text-3xl"></i>
        </Button>
        <section
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } absolute left-0 top-0 min-h-screen min-w-full flex-row bg-white`}
        >
          <ul className="flex w-full flex-col gap-3 p-4">
            {articleCategories.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
              >
                {component.description}
              </ListItem>
            ))}
          </ul>
          <Button
            className="mt-2 md:hidden"
            variant={"ghost"}
            size={"icon"}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="bx bx-x text-3xl"></i>
          </Button>
        </section>
      </div>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
