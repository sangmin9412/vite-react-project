import { Product } from "../../types";

const ProductItem = ({
  category,
  id,
  image,
  price,
  rating,
  title,
}: Product) => (
  <li className="product-item">
    <p className="product-item__category">{category}</p>
    <p className="product-item__title">{title}</p>
    <img className="product-item__image" src={image} />
    <p className="product-item__price">${price}</p>
    <p className="product-item__rating">{rating.rate}</p>
  </li>
);

export default ProductItem;
