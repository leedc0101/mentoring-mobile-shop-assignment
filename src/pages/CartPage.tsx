import { Link } from "react-router-dom";

export function CartPage() {
  return (
    <div className="cartView">
      <div className="cartItems">
        <article className="cartRow">
          <img
            src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80"
            alt=""
          />
          <div>
            <h3>데일리 토트백</h3>
            <p>₩32,000</p>
            <div className="quantity">
              <button aria-label="수량 줄이기">-</button>
              <span>1</span>
              <button aria-label="수량 늘리기">+</button>
              <button className="remove">삭제</button>
            </div>
          </div>
        </article>

        <article className="cartRow">
          <img
            src="https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80"
            alt=""
          />
          <div>
            <h3>린넨 볼캡</h3>
            <p>₩18,000</p>
            <div className="quantity">
              <button aria-label="수량 줄이기">-</button>
              <span>1</span>
              <button aria-label="수량 늘리기">+</button>
              <button className="remove">삭제</button>
            </div>
          </div>
        </article>
      </div>
      <section className="summary" aria-label="주문 요약">
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
        <Link className="secondaryLink" to="/">
          상품 목록으로
        </Link>
      </section>
    </div>
  );
}
