import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useShopState } from "./useShopState";

type ShopContextValue = ReturnType<typeof useShopState>;

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const shop = useShopState();
  return <ShopContext.Provider value={shop}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const shop = useContext(ShopContext);
  if (!shop) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return shop;
}
