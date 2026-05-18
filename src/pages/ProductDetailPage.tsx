import { Link, useParams } from "react-router-dom";
import type { Product } from "../types";
import { currency } from "../utils/format";

const products: Product[] = [
  {
    id: "daily-tote",
    name: "데일리 토트백",
    description: "가벼운 출근과 카페 작업에 맞는 미니멀 토트",
    price: 32000,
    stock: 4,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
    badge: "BEST",
  },
  {
    id: "linen-cap",
    name: "린넨 볼캡",
    description: "여름 산책용으로 가볍게 쓰기 좋은 린넨 캡",
    price: 18000,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80",
  },
];

export function ProductDetailPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId) ?? products[0];

  if (!product) {
    return (
      <div className="empty">
        <h2>상품을 찾을 수 없어요</h2>
        <p>목록으로 돌아가 다시 선택해주세요.</p>
        <Link className="primaryLink" to="/">
          상품 목록으로
        </Link>
      </div>
    );
  }

  return (
    <article className="detailPage">
      <img src={product.image} alt="" />
      <div className="detailBody">
        {product.badge ? <span className="badge">{product.badge}</span> : null}
        <h2>{product.name}</h2>
        <strong>{currency.format(product.price)}</strong>
        <p>{product.description}</p>
        <dl>
          <div>
            <dt>남은 재고</dt>
            <dd>{product.stock}개</dd>
          </div>
          <div>
            <dt>배송</dt>
            <dd>오늘 출발 준비</dd>
          </div>
        </dl>
        <button
          className="submit"
          disabled={product.stock === 0}
        >
          장바구니 담기
        </button>
      </div>
    </article>
  );
}
