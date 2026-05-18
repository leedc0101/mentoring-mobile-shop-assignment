import { Link } from "react-router-dom";
import { currency } from "../utils/format";

export function OrderCompletePage() {
  return (
    <div className="successPage">
      <h2>주문이 접수됐어요</h2>
      <p>주문번호 preview-order-001</p>
      <strong>{currency.format(53000)}</strong>
      <Link className="checkoutLink" to="/">
        계속 쇼핑하기
      </Link>
    </div>
  );
}
