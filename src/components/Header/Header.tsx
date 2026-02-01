"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import css from "./Header.module.css"

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header_wrapper}>
      <nav className={css.logo}>
        <Link href="/">
          <Image
          src="/logo.svg"
          alt="TravelTrucks"
          width={136}
          height={16}/>
        </Link>

        <div className={css.navigation_header}>
          <Link
            href="/"
            className={`${css.navigation_link} ${
    pathname === "/" ? css.active : ""
  }`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
             className={`${css.navigation_link} ${
    pathname.startsWith("/catalog") ? css.active : ""
  }`}
          >
            Catalog
          </Link>
        </div>
      </nav>
    </header>
  );
}
