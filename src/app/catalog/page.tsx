"use client";

import { useEffect } from "react";
import { useCampersStore } from "@/store/useCampersStore";
import { useState } from "react";


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
  });

  setLocationInput("");
};
const isDefaultFilters =
  !filters.location &&
  !filters.form &&
  !filters.AC &&
  !filters.kitchen &&
  !filters.bathroom;



useEffect(() => {
  fetchCampersList();
}, [filters, fetchCampersList]);


//   useEffect(() => {
//     fetchCampersList();
//   }, [fetchCampersList]);

  return (
    <div>
      <h1>Catalog</h1>
      <div style={{ marginBottom: "20px" }}>
  <input
    type="text"
    placeholder="Search by location"
    value={locationInput}
    onChange={(e) => setLocationInput(e.target.value)}
  />

  <button
    // onClick={async () => {
    //   resetCampers();
    //   setFilters({ location: locationInput });
    //   await fetchCampersList();
    // }}
    onClick={() => {
  resetCampers();
  setFilters({ location: locationInput });
}}

  >
    Search
  </button>
</div>


          <div style={{ marginBottom: "20px" }}>
  <p>Vehicle type:</p>

  <label>
    <input
      type="radio"
      name="form"
      value=""
      checked={filters.form === ""}
      onChange={() => {resetCampers();setFilters({ form: "" })}}
    />
    All
  </label>

  <label>
    <input
      type="radio"
      name="form"
      value="panelTruck"
      checked={filters.form === "panelTruck"}
            onChange={() => {resetCampers();setFilters({ form: "panelTruck" })}}
    />
    Panel Truck
  </label>

  <label>
    <input
      type="radio"
      name="form"
      value="fullyIntegrated"
      checked={filters.form === "fullyIntegrated"}
      onChange={() => {resetCampers();setFilters({ form: "fullyIntegrated" })}}
    />
    Fully Integrated
  </label>

  <label>
    <input
      type="radio"
      name="form"
      value="alcove"
      checked={filters.form === "alcove"}
      onChange={() => {resetCampers();setFilters({ form: "alcove" })}}
    />
    Alcove
  </label>
</div>
<div style={{ marginBottom: "20px" }}>
  <p>Equipment:</p>

  <label>
    <input
      type="checkbox"
      checked={filters.AC}
      onChange={(e) =>
        {resetCampers();setFilters({ AC: e.target.checked })}
      }
    />
    AC
  </label>

  <label>
    <input
      type="checkbox"
      checked={filters.kitchen}
      onChange={(e) =>
        {resetCampers();setFilters({ kitchen: e.target.checked })}
      }
    />
    Kitchen
  </label>

  <label>
    <input
      type="checkbox"
      checked={filters.bathroom}
      onChange={(e) =>
        {resetCampers();setFilters({ bathroom: e.target.checked })}
      }
    />
    Bathroom
  </label>
</div>

<button onClick={handleResetFilters} disabled={isDefaultFilters}>
  Reset Filters
</button>

{loading && <p>Loading...</p>}

      {campers.map((camper) => (
        <div key={camper.id}>
          <h3>{camper.name}</h3>
          <p>{camper.location}</p>

          <p>{camper.price.toFixed(2)}</p>
        </div>
      ))}

      {hasMore && !loading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}
