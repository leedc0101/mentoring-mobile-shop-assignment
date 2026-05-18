import { useMemo, useState } from "react";
import type { Cart, Order, Product } from "../../types";
import { previewProducts } from "../../mocks/data";

type ShopState = {
  products: Product[];
  cart: Cart;
  isLoading: boolean;
  errorMessage: string | null;
  latestOrder: Order | null;
  addToCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItem: (productId: string) => void;
  submitOrder: () => void;
};

export function useShopState(): ShopState {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "daily-tote": 1,
    "linen-cap": 1,
  });
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  const cart = useMemo<Cart>(() => {
    const items = Object.entries(quantities)
      .map(([productId, quantity]) => {
        const product = previewProducts.find((item) => item.id === productId);
        return product ? { product, quantity } : null;
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const deliveryFee = subtotal > 0 ? 3000 : 0;

    return {
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    };
  }, [quantities]);

  function addToCart(productId: string) {
    setQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  }

  function increaseQuantity(productId: string) {
    addToCart(productId);
  }

  function decreaseQuantity(productId: string) {
    setQuantities((current) => {
      const nextQuantity = (current[productId] ?? 0) - 1;
      if (nextQuantity <= 0) {
        const { [productId]: _, ...rest } = current;
        return rest;
      }
      return { ...current, [productId]: nextQuantity };
    });
  }

  function removeItem(productId: string) {
    setQuantities((current) => {
      const { [productId]: _, ...rest } = current;
      return rest;
    });
  }

  function submitOrder() {
    setLatestOrder({
      id: "preview-order",
      total: cart.total,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      createdAt: new Date().toISOString(),
    });
    setQuantities({});
  }

  return {
    products: previewProducts,
    cart,
    isLoading: false,
    errorMessage: null,
    latestOrder,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    submitOrder,
  };
}

