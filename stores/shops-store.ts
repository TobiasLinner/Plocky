import seedShops, { type LocalShop } from "@/data/localshops";
import { create } from "zustand";

type AddShopInput = Omit<LocalShop, "id" | "image"> & {
  id?: string;
  image?: LocalShop["image"];
  imageUri?: string;
};

type ShopsState = {
  shops: LocalShop[];
  addShop: (input: AddShopInput) => LocalShop;
};

export const useShopsStore = create<ShopsState>()((set, get) => ({
  shops: seedShops,
  addShop: (input) => {
    const id = input.id ?? `user-${Date.now()}`;
    const image =
      input.image ?? (input.imageUri ? { uri: input.imageUri } : require("@/assets/images/icon.png"));
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
}));
