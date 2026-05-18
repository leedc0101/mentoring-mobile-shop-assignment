import { Link } from "react-router-dom";

export function CheckoutPage() {
  return (
    <section className="summary" aria-label="주문 요약">
      <h2>주문 확인</h2>
      <div>
        <span>데일리 토트백 x 1</span>
        <strong>₩32,000</strong>
      </div>
      <div>
        <span>린넨 볼캡 x 1</span>
        <strong>₩18,000</strong>
      </div>
      <div>
        <span>상품 금액</span>
        <strong>₩50,000</strong>
      </div>
      <div>
        <span>배송비</span>
        <strong>₩3,000</strong>
      </div>
      <div className="total">
        <span>결제 예정 금액</span>
        <strong>₩53,000</strong>
      </div>
      <Link className="submit" to="/orders/latest">
        주문 생성
      </Link>
    </section>
  );
}

