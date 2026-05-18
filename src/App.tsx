import { useState } from "react";
import type { Cart, CartItem, Product } from "./types";
import { useShopState } from "./features/shop/useShopState";

const currency = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

export default function App() {
  const shop = useShopState();
  const [activeTab, setActiveTab] = useState<"shop" | "cart">("shop");
  const cartCount = shop.cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="page">
      <section className="phone" aria-label="모바일 쇼핑몰 과제 화면">
        <header className="topbar">
          <div>
            <p className="eyebrow">MOBILE SHOP</p>
            <h1>오늘의 가게</h1>
          </div>
          <button className="cartButton" onClick={() => setActiveTab("cart")}>
            장바구니 <span>{cartCount}</span>
          </button>
        </header>

        {shop.errorMessage ? (
          <div className="banner" role="alert">
            {shop.errorMessage}
          </div>
        ) : null}

        {shop.latestOrder ? (
          <div className="success" role="status">
            주문이 접수됐어요. 총 {currency.format(shop.latestOrder.total)}
          </div>
        ) : null}

        <div className="tabs" role="tablist" aria-label="화면 선택">
          <button
            className={activeTab === "shop" ? "active" : ""}
            onClick={() => setActiveTab("shop")}
          >
            상품
          </button>
          <button
            className={activeTab === "cart" ? "active" : ""}
            onClick={() => setActiveTab("cart")}
          >
            장바구니
          </button>
        </div>

        <div className="content">
          {shop.isLoading ? <Skeleton /> : null}
          {!shop.isLoading && activeTab === "shop" ? (
            <ProductList products={shop.products} onAdd={shop.addToCart} />
          ) : null}
          {!shop.isLoading && activeTab === "cart" ? (
            <CartView
              cart={shop.cart}
              onIncrease={shop.increaseQuantity}
              onDecrease={shop.decreaseQuantity}
              onRemove={shop.removeItem}
              onSubmit={shop.submitOrder}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}

function ProductList({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (productId: string) => void;
}) {
  return (
    <div className="productList">
      {products.map((product) => (
        <article className="productCard" key={product.id}>
          <img src={product.image} alt="" />
          <div className="productBody">
            <div className="productTitle">
              <div>
                {product.badge ? <span className="badge">{product.badge}</span> : null}
                <h2>{product.name}</h2>
              </div>
              <strong>{currency.format(product.price)}</strong>
            </div>
            <p>{product.description}</p>
            <div className="productFooter">
              <span>재고 {product.stock}개</span>
              <button disabled={product.stock === 0} onClick={() => onAdd(product.id)}>
                담기
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function CartView({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onSubmit,
}: {
  cart: Cart;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onSubmit: () => void;
}) {
  if (cart.items.length === 0) {
    return (
      <div className="empty">
        <h2>장바구니가 비어 있어요</h2>
        <p>상품을 하나 담으면 주문 확인 영역이 나타납니다.</p>
      </div>
    );
  }

  return (
    <div className="cartView">
      <div className="cartItems">
        {cart.items.map((item) => (
          <CartRow
            item={item}
            key={item.product.id}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>
      <section className="summary" aria-label="주문 요약">
        <div>
          <span>상품 금액</span>
          <strong>{currency.format(cart.subtotal)}</strong>
        </div>
        <div>
          <span>배송비</span>
          <strong>{currency.format(cart.deliveryFee)}</strong>
        </div>
        <div className="total">
          <span>결제 예정 금액</span>
          <strong>{currency.format(cart.total)}</strong>
        </div>
        <button className="submit" onClick={onSubmit}>
          주문 확인
        </button>
      </section>
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

function Skeleton() {
  return (
    <div className="skeleton" aria-label="로딩 중">
      <div />
      <div />
      <div />
    </div>
  );
}

