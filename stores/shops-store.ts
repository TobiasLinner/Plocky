import seedShops, { type LocalShop } from "@/data/localshops";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

let AsyncStorage: any | null = null;
try {
  AsyncStorage = require("@react-native-async-storage/async-storage");
} catch (e) {
  AsyncStorage = null;
}

type AddShopInput = Omit<LocalShop, "id" | "image"> & {
  id?: string;
  image?: LocalShop["image"];
};

type ShopsState = {
  shops: LocalShop[];
  addShop: (input: AddShopInput) => LocalShop;
};

export const useShopsStore = create<ShopsState>()(
  persist(
    (set, get) => ({
      shops: seedShops,
      addShop: (input) => {
        const id = input.id ?? `user-${Date.now()}`;
        const image = input.image ?? require("@/assets/images/icon.png");
        const newShop: LocalShop = {
          id,
          name: input.name,
          category: input.category,
          address: input.address,
          city: input.city,
          postalCode: input.postalCode,
          lat: input.lat,
          lng: input.lng,
          phone: input.phone,
          hours: input.hours,
          description: input.description,
          image,
        };
        set((state) => ({ shops: [newShop, ...state.shops] }));
        return newShop;
      },
    }),
    {
      name: "shops",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
