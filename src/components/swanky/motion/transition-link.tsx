"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "./transition-provider";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** next/link that plays the carousel transition for client-side navigations. */
export function TransitionLink({ href, onNavigate, ...props }: Props) {
  const { navigate } = usePageTransition();
  return (
    <Link
      href={href}
      onNavigate={(event) => {
        onNavigate?.(event);
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
}
