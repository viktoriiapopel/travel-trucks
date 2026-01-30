"use client";

import Link from "next/link";
import { Camper } from "@/types/camper";
import { useCampersStore } from "@/store/useCampersStore";
import Image from "next/image";

interface Props {
  camper: Camper;
}

export default function CamperCard({ camper }: Props) {
  const { favorites, toggleFavorite } = useCampersStore();

  const isFavorite = favorites.includes(camper.id);

  return (
    <div>
      <h3>{camper.name}</h3>
      <p>{camper.location}</p>
      <p>{camper.price.toFixed(2)}</p>
      <div>{camper.gallery?.length > 0 && (
  <Image
    src={camper.gallery[0].thumb}
    alt={camper.name}
    width={300}
    height={200}
  />
)}</div>
      <button onClick={() => toggleFavorite(camper.id)}>
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <Link href={`/catalog/${camper.id}`}>
        <button>Show more</button>
      </Link>
    </div>
  );
}
