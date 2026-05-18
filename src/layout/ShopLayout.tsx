import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useShop } from "../features/shop/ShopContext";

export function ShopLayout() {
  const shop = useShop();
  const navigate = useNavigate();
  const cartCount = shop.cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="page">
      <section className="phone" aria-label="모바일 쇼핑몰 과제 화면">
        <header className="topbar">
          <button className="brandButton" onClick={() => navigate("/")}>
            <span className="eyebrow">MOBILE SHOP</span>
            <strong>오늘의 가게</strong>
          </button>
          <button className="cartButton" onClick={() => navigate("/cart")}>
            장바구니 <span>{cartCount}</span>
          </button>
        </header>

        {shop.errorMessage ? (
          <div className="banner" role="alert">
            {shop.errorMessage}
          </div>
        ) : null}

        <nav className="tabs" aria-label="주요 화면">
          <NavLink to="/" end>
            상품
          </NavLink>
          <NavLink to="/cart">장바구니</NavLink>
          <NavLink to="/checkout">주문 확인</NavLink>
        </nav>

        <div className="content">
          {shop.isLoading ? <Skeleton /> : <Outlet />}
        </div>
      </section>
    </main>
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

