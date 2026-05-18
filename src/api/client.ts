import type { Cart, Order, Product } from "../types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody && typeof errorBody.message === "string"
        ? errorBody.message
        : "요청을 처리하지 못했습니다.";
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getProducts() {
  return request<Product[]>("/api/products");
}

export function getCart() {
  return request<Cart>("/api/cart");
}

export function addCartItem(productId: string) {
  return request<Cart>("/api/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
}

export function updateCartItem(productId: string, quantity: number) {
  return request<Cart>("/api/cart/items/" + productId, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(productId: string) {
  return request<Cart>("/api/cart/items/" + productId, {
    method: "DELETE",
  });
}

export function createOrder() {
  return request<Order>("/api/orders", {
    method: "POST",
  });
}

