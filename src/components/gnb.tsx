import { Link, useLocation } from "react-router-dom";
import CartCount from "./cart/count";

const Gnb = () => {
  const location = useLocation();
  
  return (
    <nav className="gnb">
      <ul>
        <li>
          <Link to={`/`}>홈</Link>
        </li>
        <li>
          <Link to={`/products`}>상품목록</Link>
        </li>
        <li>
          <Link to={`/cart`}>장바구니</Link>
        </li>
        {
          location.pathname === "/cart" ? <CartCount /> : null
        }
      </ul>
    </nav>
  );
};

export default Gnb;
