import { Link } from "react-router-dom";
import { useShop } from "../features/shop/ShopContext";
import { currency } from "../utils/format";

export function OrderCompletePage() {
  const shop = useShop();

  if (!shop.latestOrder) {
    return (
      <div className="empty">
        <h2>최근 주문이 없어요</h2>
        <p>주문 확인 화면에서 주문을 생성해보세요.</p>
        <Link className="primaryLink" to="/">
          상품 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="successPage">
      <h2>주문이 접수됐어요</h2>
      <p>주문번호 {shop.latestOrder.id}</p>
      <strong>{currency.format(shop.latestOrder.total)}</strong>
      <Link className="checkoutLink" to="/">
        계속 쇼핑하기
      </Link>
    </div>
  );
}

