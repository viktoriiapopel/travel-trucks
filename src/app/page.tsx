import Link from "next/link";
import css from "./Home.module.css";

export default function HomePage() {
  return (
    <main className={css.hero}>
      <div className={css.overlay}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.subtitle}>
          You can find everything you want in our catalog
        </p>

        <Link href="/catalog">
          <button className={css.button}>
            View Now
          </button>
        </Link>
      </div>
    </main>
  );
}
