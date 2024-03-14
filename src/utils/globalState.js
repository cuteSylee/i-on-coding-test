import { create } from "zustand";
import data from "../data/meta.json";

export const useCartStore = create((set) => ({
  defaultPrice: [],
  cartItem: [],
  setDefaultPrice: (item) => set({ defaultPrice: item }),
  setCartItem: (item) => set({ cartItem: item }),
}));

export const useFavoriteStore = create((set) => ({
  favoriteItem: [],
  setFavoriteItem: (item) => set({ favoriteItem: item }),
  isFavoriteClicked: new Array(data.productList.length).fill(false),
  setIsFavoriteClicked: (item) => set({ isFavoriteClicked: item }),
}));
