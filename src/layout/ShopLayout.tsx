import { Outlet, useNavigate } from "react-router-dom";

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

        <div className="content">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
