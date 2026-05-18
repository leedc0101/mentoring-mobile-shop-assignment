import { Navigate, Route, Routes } from "react-router-dom";
import { ShopLayout } from "./layout/ShopLayout";
import { CartPage } from "./pages/CartPage";
import { OrderCompletePage } from "./pages/OrderCompletePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProductListPage } from "./pages/ProductListPage";

export default function App() {
  return (
    <Routes>
      <Route element={<ShopLayout />}>
        <Route index element={<ProductListPage />} />
        <Route path="products/:productId" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="orders/latest" element={<OrderCompletePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
