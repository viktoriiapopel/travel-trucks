"use client";

import Link from "next/link";
import { Camper } from "@/types/camper";
import { useCampersStore } from "@/store/useCampersStore";
import Image from "next/image";
import css from "./CamperCard.module.css"

interface Props {
  camper: Camper;
}

export default function CamperCard({ camper }: Props) {
  const { favorites, toggleFavorite } = useCampersStore();

  const isFavorite = favorites.includes(camper.id);

  return (
    <div className={css.card}>
      {camper.gallery?.length > 0 && (
        <Image
          src={camper.gallery[0].thumb}
          alt={camper.name}
          width={240}
          height={180}
          className={css.image}
        />
      )}

      <div className={css.content}>
        <div className={css.top}>
          <div>
            <h3 className={css.title}>{camper.name}</h3>

            <div className={css.meta}>
             <span className={css.rating}>
                ⭐ {camper.rating} ({camper.reviews?.length || 0} reviews)
              </span> 
              <span> {camper.location}</span>
            </div>
           <p className={css.description}>
      {camper.description}
    </p> 
          </div>


          <div className={css.price}>
            €{camper.price.toFixed(2)}
          </div>
          
        </div>

        <div className={css.actions}>
          <button
            onClick={() => toggleFavorite(camper.id)}
            className={css.favorite}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>

          <Link href={`/catalog/${camper.id}`}>
            <button className={css.button}>Show more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
