import { NavLink, Outlet, useNavigate } from "react-router-dom";

export function ShopLayout() {
  const navigate = useNavigate();

  return (
    <main className="page">
      <section className="phone" aria-label="모바일 쇼핑몰 과제 화면">
        <header className="topbar">
          <button className="brandButton" onClick={() => navigate("/")}>
            <span className="eyebrow">MOBILE SHOP</span>
            <strong>오늘의 가게</strong>
          </button>
          <button className="cartButton" onClick={() => navigate("/cart")}>
            장바구니 <span>2</span>
          </button>
        </header>

        <nav className="tabs" aria-label="주요 화면">
          <NavLink to="/" end>
            상품
          </NavLink>
          <NavLink to="/cart">장바구니</NavLink>
          <NavLink to="/checkout">주문 확인</NavLink>
        </nav>

        <div className="content">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
