import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../features/shop/ShopContext";
import { currency } from "../utils/format";

export function CheckoutPage() {
  const shop = useShop();
  const navigate = useNavigate();

  if (shop.cart.items.length === 0) {
    return (
      <div className="empty">
        <h2>주문할 상품이 없어요</h2>
        <p>상품을 담은 뒤 주문 확인을 진행해주세요.</p>
        <Link className="primaryLink" to="/">
          상품 목록으로
        </Link>
      </div>
    );
  }

  function submitOrder() {
    shop.submitOrder();
    navigate("/orders/latest");
  }

  return (
    <section className="summary" aria-label="주문 요약">
      <h2>주문 확인</h2>
      {shop.cart.items.map((item) => (
        <div key={item.product.id}>
          <span>
            {item.product.name} x {item.quantity}
          </span>
          <strong>{currency.format(item.product.price * item.quantity)}</strong>
        </div>
      ))}
      <div>
        <span>상품 금액</span>
        <strong>{currency.format(shop.cart.subtotal)}</strong>
      </div>
      <div>
        <span>배송비</span>
        <strong>{currency.format(shop.cart.deliveryFee)}</strong>
      </div>
      <div className="total">
        <span>결제 예정 금액</span>
        <strong>{currency.format(shop.cart.total)}</strong>
      </div>
      <button className="submit" onClick={submitOrder}>
        주문 생성
      </button>
    </section>
  );
}

