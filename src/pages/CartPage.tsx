import { Link } from "react-router-dom";
import { useShop } from "../features/shop/ShopContext";
import type { CartItem } from "../types";
import { currency } from "../utils/format";

export function CartPage() {
  const shop = useShop();

  if (shop.cart.items.length === 0) {
    return (
      <div className="empty">
        <h2>장바구니가 비어 있어요</h2>
        <p>상품을 하나 담으면 주문 확인 영역이 나타납니다.</p>
        <Link className="primaryLink" to="/">
          상품 보러가기
        </Link>
      </div>
    );
  }

  return (
    <div className="cartView">
      <div className="cartItems">
        {shop.cart.items.map((item) => (
          <CartRow
            item={item}
            key={item.product.id}
            onIncrease={shop.increaseQuantity}
            onDecrease={shop.decreaseQuantity}
            onRemove={shop.removeItem}
          />
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
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}) {
  return (
    <article className="cartRow">
      <img src={item.product.image} alt="" />
      <div>
        <h3>{item.product.name}</h3>
        <p>{currency.format(item.product.price)}</p>
        <div className="quantity">
          <button aria-label="수량 줄이기" onClick={() => onDecrease(item.product.id)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button aria-label="수량 늘리기" onClick={() => onIncrease(item.product.id)}>
            +
          </button>
          <button className="remove" onClick={() => onRemove(item.product.id)}>
            삭제
          </button>
        </div>
      </div>
    </article>
  );
}

