export function ProductDetailPage() {
  return (
    <article className="detailPage">
      <img
        src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80"
        alt=""
      />
      <div className="detailBody">
        <span className="badge">BEST</span>
        <h2>데일리 토트백</h2>
        <strong>₩32,000</strong>
        <p>가벼운 출근과 카페 작업에 맞는 미니멀 토트</p>
        <dl>
          <div>
            <dt>남은 재고</dt>
            <dd>4개</dd>
          </div>
          <div>
            <dt>배송</dt>
            <dd>오늘 출발 준비</dd>
          </div>
        </dl>
        <button className="submit">장바구니 담기</button>
      </div>
    </article>
  );
}

