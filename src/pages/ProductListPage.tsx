import { Link } from "react-router-dom";

export function ProductListPage() {
  return (
    <div className="productList">
      <article className="productCard">
        <Link to="/products/daily-tote" className="productImageLink">
          <img
            src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80"
            alt=""
          />
        </Link>
        <div className="productBody">
          <div className="productTitle">
            <div>
              <span className="badge">BEST</span>
              <h2>데일리 토트백</h2>
            </div>
            <strong>₩32,000</strong>
          </div>
          <p>가벼운 출근과 카페 작업에 맞는 미니멀 토트</p>
          <div className="productFooter">
            <Link to="/products/daily-tote">자세히</Link>
            <button>담기</button>
          </div>
        </div>
      </article>

      <article className="productCard">
        <Link to="/products/linen-cap" className="productImageLink">
          <img
            src="https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80"
            alt=""
          />
        </Link>
        <div className="productBody">
          <div className="productTitle">
            <div>
              <h2>린넨 볼캡</h2>
            </div>
            <strong>₩18,000</strong>
          </div>
          <p>여름 산책용으로 가볍게 쓰기 좋은 린넨 캡</p>
          <div className="productFooter">
            <Link to="/products/linen-cap">자세히</Link>
            <button>담기</button>
          </div>
        </div>
      </article>

      <article className="productCard">
        <Link to="/products/glass-mug" className="productImageLink">
          <img
            src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80"
            alt=""
          />
        </Link>
        <div className="productBody">
          <div className="productTitle">
            <div>
              <span className="badge">LOW STOCK</span>
              <h2>클리어 머그</h2>
            </div>
            <strong>₩15,000</strong>
          </div>
          <p>아이스 커피가 잘 어울리는 투명 유리 머그</p>
          <div className="productFooter">
            <Link to="/products/glass-mug">자세히</Link>
            <button>담기</button>
          </div>
        </div>
      </article>

      <article className="productCard">
        <Link to="/products/desk-tray" className="productImageLink">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
            alt=""
          />
        </Link>
        <div className="productBody">
          <div className="productTitle">
            <div>
              <span className="badge">SOLD OUT</span>
              <h2>데스크 트레이</h2>
            </div>
            <strong>₩24,000</strong>
          </div>
          <p>케이블과 작은 문구류를 정리하는 우드 트레이</p>
          <div className="productFooter">
            <Link to="/products/desk-tray">자세히</Link>
            <button disabled>담기</button>
          </div>
        </div>
      </article>
    </div>
  );
}

