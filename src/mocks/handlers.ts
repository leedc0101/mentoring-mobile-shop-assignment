import { http, HttpResponse } from "msw";
import type { Cart, CartItem } from "../types";
import { previewProducts } from "./data";

let cartQuantities: Record<string, number> = {};

function buildCart(): Cart {
  const items: CartItem[] = Object.entries(cartQuantities)
    .map(([productId, quantity]) => {
      const product = previewProducts.find((item) => item.id === productId);
      return product ? { product, quantity } : null;
    })
    .filter((item): item is CartItem => Boolean(item));

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
}

function ensureProduct(productId: string) {
  const product = previewProducts.find((item) => item.id === productId);
  if (!product) {
    return HttpResponse.json(
      { message: "상품을 찾을 수 없습니다." },
      { status: 404 },
    );
  }
  return product;
}

export const handlers = [
  http.get("/api/products", async () => {
    await delay(350);
    return HttpResponse.json(previewProducts);
  }),

  http.get("/api/cart", async () => {
    await delay(250);
    return HttpResponse.json(buildCart());
  }),

  http.post("/api/cart/items", async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as { productId?: string };
    const productOrResponse = ensureProduct(body.productId ?? "");
    if (productOrResponse instanceof HttpResponse) return productOrResponse;

    const product = productOrResponse;
    const nextQuantity = (cartQuantities[product.id] ?? 0) + 1;
    if (nextQuantity > product.stock) {
      return HttpResponse.json(
        { message: "남은 재고보다 많이 담을 수 없습니다." },
        { status: 409 },
      );
    }

    cartQuantities = { ...cartQuantities, [product.id]: nextQuantity };
    return HttpResponse.json(buildCart());
  }),

  http.patch("/api/cart/items/:productId", async ({ params, request }) => {
    await delay(300);
    const productId = String(params.productId);
    const productOrResponse = ensureProduct(productId);
    if (productOrResponse instanceof HttpResponse) return productOrResponse;

    const product = productOrResponse;
    const body = (await request.json()) as { quantity?: number };
    const quantity = Number(body.quantity);

    if (!Number.isInteger(quantity) || quantity < 0) {
      return HttpResponse.json(
        { message: "수량 값이 올바르지 않습니다." },
        { status: 400 },
      );
    }

    if (quantity > product.stock) {
      return HttpResponse.json(
        { message: "남은 재고보다 많이 담을 수 없습니다." },
        { status: 409 },
      );
    }

    if (quantity === 0) {
      const { [productId]: _, ...rest } = cartQuantities;
      cartQuantities = rest;
    } else {
      cartQuantities = { ...cartQuantities, [productId]: quantity };
    }

    return HttpResponse.json(buildCart());
  }),

  http.delete("/api/cart/items/:productId", async ({ params }) => {
    await delay(250);
    const productId = String(params.productId);
    const { [productId]: _, ...rest } = cartQuantities;
    cartQuantities = rest;
    return HttpResponse.json(buildCart());
  }),

  http.post("/api/orders", async () => {
    await delay(500);
    const cart = buildCart();
    if (cart.items.length === 0) {
      return HttpResponse.json(
        { message: "장바구니가 비어 있습니다." },
        { status: 400 },
      );
    }

    cartQuantities = {};
    return HttpResponse.json({
      id: crypto.randomUUID(),
      total: cart.total,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      createdAt: new Date().toISOString(),
    });
  }),
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

