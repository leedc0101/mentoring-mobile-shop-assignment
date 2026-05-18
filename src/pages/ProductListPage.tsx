import { Link } from "react-router-dom";
import { useShop } from "../features/shop/ShopContext";
import type { Product } from "../types";
import { currency } from "../utils/format";

export function ProductListPage() {
  const shop = useShop();

  return (
    <div className="productList">
      {shop.products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onAdd={() => shop.addToCart(product.id)}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
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
          <button disabled={product.stock === 0} onClick={onAdd}>
            담기
          </button>
        </div>
      </div>
    </article>
  );
}

