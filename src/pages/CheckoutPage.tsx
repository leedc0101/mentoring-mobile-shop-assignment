import { Link } from "react-router-dom";
import { currency } from "../utils/format";

const orderItems = [
  { id: "daily-tote", name: "데일리 토트백", price: 32000, quantity: 1 },
  { id: "linen-cap", name: "린넨 볼캡", price: 18000, quantity: 1 },
];

const subtotal = orderItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);
const deliveryFee = 3000;
const total = subtotal + deliveryFee;

export function CheckoutPage() {
  return (
    <section className="summary" aria-label="주문 요약">
      <h2>주문 확인</h2>
      {orderItems.map((item) => (
        <div key={item.id}>
          <span>
            {item.name} x {item.quantity}
          </span>
          <strong>{currency.format(item.price * item.quantity)}</strong>
        </div>
      ))}
      <div>
        <span>상품 금액</span>
        <strong>{currency.format(subtotal)}</strong>
      </div>
      <div>
        <span>배송비</span>
        <strong>{currency.format(deliveryFee)}</strong>
      </div>
      <div className="total">
        <span>결제 예정 금액</span>
        <strong>{currency.format(total)}</strong>
      </div>
      <Link className="submit" to="/orders/latest">
        주문 생성
      </Link>
    </section>
  );
}
