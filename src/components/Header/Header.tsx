"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <Link href="/">
          <strong>TravelTrucks</strong>
        </Link>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link
            href="/"
            style={{
              fontWeight: pathname === "/" ? "bold" : "normal",
            }}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            style={{
              fontWeight: pathname.startsWith("/catalog")
                ? "bold"
                : "normal",
            }}
          >
            Catalog
          </Link>
        </div>
      </nav>
    </header>
  );
}
