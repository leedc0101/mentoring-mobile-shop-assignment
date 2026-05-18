import { Link } from "react-router-dom";
import type { CartItem } from "../types";
import { currency } from "../utils/format";

const cartItems: CartItem[] = [
  {
    product: {
      id: "daily-tote",
      name: "데일리 토트백",
      description: "가벼운 출근과 카페 작업에 맞는 미니멀 토트",
      price: 32000,
      stock: 4,
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
      badge: "BEST",
    },
    quantity: 1,
  },
  {
    product: {
      id: "linen-cap",
      name: "린넨 볼캡",
      description: "여름 산책용으로 가볍게 쓰기 좋은 린넨 캡",
      price: 18000,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80",
    },
    quantity: 1,
  },
];

export function CartPage() {
  return (
    <div className="cartView">
      <div className="cartItems">
        {cartItems.map((item) => (
          <CartRow item={item} key={item.product.id} />
        ))}
      </div>
      <Link className="checkoutLink" to="/checkout">
        주문 확인으로
      </Link>
    </div>
  );
}

function CartRow({
  item,
}: {
  item: CartItem;
}) {
  return (
    <article className="cartRow">
      <img src={item.product.image} alt="" />
      <div>
        <h3>{item.product.name}</h3>
        <p>{currency.format(item.product.price)}</p>
        <div className="quantity">
          <button aria-label="수량 줄이기">
            -
          </button>
          <span>{item.quantity}</span>
          <button aria-label="수량 늘리기">
            +
          </button>
          <button className="remove">
            삭제
          </button>
        </div>
      </div>
    </article>
  );
}
