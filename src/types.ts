export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  badge?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export type Order = {
  id: string;
  total: number;
  itemCount: number;
  createdAt: string;
};

