import { Link } from "react-router-dom";
import { Product } from "../../graphql/products";
import { cartItemSelector } from "../../recoils/cart";
import { useRecoilState } from "recoil";

const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
}: Product) => {
  const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
  const addToCart = () => setCartAmount((cartAmount || 0) + 1);
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        <img className="product-item__image" src={imageUrl} />
        <p className="product-item__price">${price}</p>
      </Link>
      <button className="product-item__add-cart" onClick={addToCart}>
        담기
      </button>
      <span>{cartAmount || 0}</span>
    </li>
  );
};

export default ProductItem;
