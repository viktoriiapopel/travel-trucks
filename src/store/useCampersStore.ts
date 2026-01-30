import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper } from "@/types/camper";
import { fetchCampers } from "@/services/campersApi";

interface Filters {
  location: string;
  form: string;
  AC: boolean;
  kitchen: boolean;
  bathroom: boolean;
}

interface CampersState {
  campers: Camper[];
  favorites: string[];
  filters: Filters;
  page: number;
  hasMore: boolean;
  loading: boolean;

  setFilters: (filters: Partial<Filters>) => void;
  resetCampers: () => void;
  fetchCampersList: () => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavorite: (id: string) => void;
}

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => ({
      campers: [],
      favorites: [],
      filters: {
        location: "",
        form: "",
        AC: false,
        kitchen: false,
        bathroom: false,
      },
      page: 1,
      hasMore: true,
      loading: false,

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetCampers: () =>
        set({
          campers: [],
          page: 1,
          hasMore: true,
        }),

      fetchCampersList: async () => {
        const { filters, page } = get();

        set({ loading: true });

        try {
        const cleanedFilters = Object.fromEntries(
  Object.entries(filters).filter(
    ([, value]) =>  value !== "" && value !== false && value !== undefined
 
  )
);

const data = await fetchCampers({
  page,
  limit: 4,
  ...cleanedFilters,
});

console.log("DATA:", data);

set((state) => ({
  campers: page === 1
    ? data
    : [...state.campers, ...data],
  hasMore: data.length === 4,
}));


        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          set({ loading: false });
        }
      },
      applyFilters: async () => {
        set({
          campers: [],
          page: 1,
          hasMore: true,
        });

        await get().fetchCampersList();
      },

      loadMore: async () => {
        set((state) => ({ page: state.page + 1 }));
        await get().fetchCampersList();
      },

      toggleFavorite: (id) =>
        set((state) => {
          const exists = state.favorites.includes(id);

          return {
            favorites:exists? state.favorites.filter((favID) => favID !== id)
            : [...state.favorites, id],
          };
        }),
      }),
         {
      name: "favorites-storage",
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }

    
  )
); 