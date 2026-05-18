import { Link } from "react-router-dom";
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
  {
    id: "glass-mug",
    name: "클리어 머그",
    description: "아이스 커피가 잘 어울리는 투명 유리 머그",
    price: 15000,
    stock: 2,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    badge: "LOW STOCK",
  },
  {
    id: "desk-tray",
    name: "데스크 트레이",
    description: "케이블과 작은 문구류를 정리하는 우드 트레이",
    price: 24000,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    badge: "SOLD OUT",
  },
];

export function ProductListPage() {
  return (
    <div className="productList">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="productCard">
      <Link to={"/products/" + product.id} className="productImageLink">
        <img src={product.image} alt="" />
      </Link>
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
          <Link to={"/products/" + product.id}>자세히</Link>
          <button disabled={product.stock === 0}>
            담기
          </button>
        </div>
      </div>
    </article>
  );
}
