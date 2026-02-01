"use client";

import { useEffect } from "react";
import { useCampersStore } from "@/store/useCampersStore";
import { useState } from "react";
import CamperCard from "@/components/CamperCard/CamperCard";
import { Loader } from "@/components/Loader/Loader";
import css from "@/app/catalog/Catalog.module.css"




export default function CatalogPage() {
    const [locationInput, setLocationInput] = useState("");

const setFilters = useCampersStore((state) => state.setFilters);
const resetCampers = useCampersStore((state) => state.resetCampers);

  const campers = useCampersStore((state) => state.campers);
  const fetchCampersList = useCampersStore(
    (state) => state.fetchCampersList
  );
  const loading = useCampersStore((state) => state.loading);
  const hasMore = useCampersStore((state) => state.hasMore);
  const loadMore = useCampersStore((state) => state.loadMore);

  const filters = useCampersStore((state) => state.filters);

  const handleResetFilters = () => {
  resetCampers();

  setFilters({
    location: "",
    form: "",
    AC: false,
    kitchen: false,
    bathroom: false,
    TV: false,
    automatic: false,
  });

  setLocationInput("");
};
const isDefaultFilters =
  !filters.location &&
  !filters.form &&
  !filters.AC &&
  !filters.kitchen &&
  !filters.bathroom &&
  !filters.TV &&
  !filters.automatic;


useEffect(() => {
  fetchCampersList();
}, [filters, fetchCampersList]);




  return (
    <div className={css.catalog_wrapper}>
      <aside className={css.filters}>    
      <div>
        <p className={css.text}>Location</p>
  <input
  className={css.location_input}
    type="text"
    placeholder="Kyiv, Ukraine"
    value={locationInput}
    onChange={(e) => setLocationInput(e.target.value)}
  />


</div>
<p className={css.text}>Filters</p>
{/* equipment */}
<h3 className={css.text_h3}>Vehicle equipment</h3>
<div className={css.divider}></div>
<div className={css.eqipment_list} >
  

  <label className={`${css.filter_button} ${filters.AC ? css.active : ""}`}>
  <input
    type="checkbox"
    checked={filters.AC}
    onChange={(e) => {
      resetCampers();
      setFilters({ AC: e.target.checked });
    }}
  />
  
  <svg width="24" height="24">
    <use href="/icons.svg#wind" />
  </svg>

  AC
</label>

<label className={`${css.filter_button} ${filters.automatic ? css.active : ""}`}>
  <input
    type="checkbox"
    checked={filters.automatic}
    onChange={(e) => {
      resetCampers();
      setFilters({ automatic: e.target.checked });
    }}
  />
  
  <svg width="24" height="24">
    <use href="/icons.svg#diagram" />
  </svg>

  Automatic
</label>

<label className={`${css.filter_button} ${filters.kitchen ? css.active : ""}`}>
  <input
    type="checkbox"
    checked={filters.kitchen}
    onChange={(e) => {
      resetCampers();
      setFilters({ kitchen: e.target.checked });
    }}
  />
  
  <svg width="24" height="24">
    <use href="/icons.svg#cup-hot" />
  </svg>

  Kitchen
</label>

<label className={`${css.filter_button} ${filters.TV ? css.active : ""}`}>
  <input
    type="checkbox"
    checked={filters.TV}
    onChange={(e) => {
      resetCampers();
      setFilters({ TV: e.target.checked });
    }}
  />
  
  <svg width="24" height="24">
    <use href="/icons.svg#tv" />
  </svg>

  TV
</label>
<label className={`${css.filter_button} ${filters.bathroom ? css.active : ""}`}>
  <input
    type="checkbox"
    checked={filters.bathroom}
    onChange={(e) => {
      resetCampers();
      setFilters({ bathroom: e.target.checked });
    }}
  />
  
  <svg width="24" height="24">
    <use href="#ph_shower" />
  </svg>
 <svg width="24" height="24">
  <use href="#ph_shower-small" />
</svg>



  Bathroom
</label>
</div>
<h3 className={css.text_h3}>Vehicle type</h3>
<div className={css.divider}></div>
 {/* vehicle type */}
          <div className={css.vehicle_type}>
 

<label
  className={`${css.filter_button} ${
    filters.form === "van" ? css.active : ""
  }`}
>
  <input
    type="radio"
    name="form"
    value="van"
    checked={filters.form === "van"}
    onChange={() => {
      resetCampers();
      setFilters({ form: "van" });
    }}
  />

  <svg width="24" height="24">
    <use href="/icons.svg#icon-panelTruck" />
  </svg>

  Van
</label>

<label
  className={`${css.filter_button} ${
    filters.form === "fullyIntegrated" ? css.active : ""
  }`}
>
  <input
    type="radio"
    name="form"
    value="fullyIntegrated"
    checked={filters.form === "fullyIntegrated"}
    onChange={() => {
      resetCampers();
      setFilters({ form: "fullyIntegrated" });
    }}
  />

  <svg width="24" height="24">
    <use href="/icons.svg#icon-panelTruck" />
  </svg>

  Fully Integrated
</label>

<label
  className={`${css.filter_button} ${
    filters.form === "alcove" ? css.active : ""
  }`}
>
  <input
    type="radio"
    name="form"
    value="alcove"
    checked={filters.form === "alcove"}
    onChange={() => {
      resetCampers();
      setFilters({ form: "alcove" });
    }}
  />

  <svg width="24" height="24">
    <use href="/icons.svg#icon-panelTruck" />
  </svg>

  Alcove
</label>


</div>
 
<button
className={css.button}
    onClick={() => {
  resetCampers();
  setFilters({ location: locationInput });
}}
  >
    Search
  </button>
</aside>

<section className={css.results}>{loading && <Loader variant="inline" />}

      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper}/>
      ))}

      {hasMore && (
  <button  className={css.button_load} onClick={loadMore} disabled={loading}>
    {loading ? <Loader variant="inline" /> : "Load More"}
  </button>
)}
</section>


    </div>
  );
}
