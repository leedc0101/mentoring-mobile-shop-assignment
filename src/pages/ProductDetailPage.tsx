import { Link, useParams } from "react-router-dom";
import { useShop } from "../features/shop/ShopContext";
import { currency } from "../utils/format";

export function ProductDetailPage() {
  const { productId } = useParams();
  const shop = useShop();
  const product = shop.products.find((item) => item.id === productId);

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
          onClick={() => shop.addToCart(product.id)}
        >
          장바구니 담기
        </button>
      </div>
    </article>
  );
}

