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
    <div className={css.header}>
      <h1 className={css.title}>{camper.name}</h1>
        <div className={css.meta}>
          <span>⭐ {camper.rating}</span>
          <span>{camper.location}</span>
        </div>
      

      <div className={css.price}>
        €{camper.price.toFixed(2)}
      </div>

    

  </div>
   {/* Галерея */}
      <div className={css.gallery}>
        {camper.gallery
          .filter((img) => img?.thumb)
          .map((img) => (
            <Image
              key={img.thumb}
              src={img.thumb}
              alt={camper.name}
              width={260}
              height={200}
              className={css.galleryImage}
            />
          ))}
      </div>

      <p className={css.description}>{camper.description}</p>
    

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
    <div className={css.bottomSection}>
      <div className={css.leftColumn}>
    {activeTab === "features" && <FeaturesTab camper={camper} />}
    {activeTab === "reviews" && <ReviewsTab camper={camper} />}
    </div>
    <div className={css.rightColum}>
    <BookingForm/>
    </div>
    </div>

    </div>
);


}
