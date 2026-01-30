"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCamperById } from "@/services/campersApi";
import { Camper } from "@/types/camper";
import Image from "next/image";
import css from "@/app/catalog/[id]/detailspage.module.css"
import FeaturesTab from "@/components/FeaturesTab";
import ReviewsTab from "@/components/ReviewsTab";
import BookingForm from "@/components/BookingForm";
import { Loader } from "@/components/Loader/Loader";





export default function CamperDetailsPage() {
  const { id } = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');


  useEffect(() => {
    const getCamper = async () => {
      try {
        const data = await fetchCamperById(id as string);
        setCamper(data);
      } catch (error) {
        console.error("Error fetching camper:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCamper();
    }
  }, [id]);

  if (loading) return <Loader variant="fullscreen" />;
  if (!camper) return <p>Camper not found</p>;
  console.log("GALLERY:", camper.gallery);


  return (
  <div className={css.wrapper}>
    <div style={{ padding: "20px" }}>
      <h1>{camper.name}</h1>

      <p>
        ⭐ {camper.rating} | {camper.location}
      </p>

      <h2>{camper.price.toFixed(2)}</h2>

      {/* Галерея */}
      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        {camper.gallery
          .filter((img) => img?.thumb)
          .map((img) => (
            <Image
              key={img.thumb}
              src={img.thumb}
              alt={camper.name}
              width={200}
              height={150}
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
          ))}
      </div>

      <p>{camper.description}</p>
    

    {/* Tabs */}
    <div className={css.tabs}>
      <button
        className={activeTab === "features" ? css.active : ""}
        onClick={() => setActiveTab("features")}
      >
        Features
      </button>

      <button
        className={activeTab === "reviews" ? css.active : ""}
        onClick={() => setActiveTab("reviews")}
      >
        Reviews
      </button>
    </div>
    {activeTab === "features" && <FeaturesTab camper={camper} />}
    {activeTab === "reviews" && <ReviewsTab camper={camper} />}
  </div>

  <div className={css.rightColum}>
    <BookingForm/>
    </div>
    </div>
);


}
