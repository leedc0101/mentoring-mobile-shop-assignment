import { Navigate, Route, Routes } from "react-router-dom";
import { ShopProvider } from "./features/shop/ShopContext";
import { ShopLayout } from "./layout/ShopLayout";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderCompletePage } from "./pages/OrderCompletePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProductListPage } from "./pages/ProductListPage";

export default function App() {
  return (
    <ShopProvider>
      <Routes>
        <Route element={<ShopLayout />}>
          <Route index element={<ProductListPage />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders/latest" element={<OrderCompletePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ShopProvider>
  );
}

