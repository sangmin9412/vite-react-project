import { Product } from "../../graphql/products";

const ProductDetail = ({
  item: { title, imageUrl, description, price, createdAt },
}: {
  item: Product;
}) => {
  return (
    <div className="product-detail">
      <p className="product-detail__title">{title}</p>
      <img className="product-detail__image" src={imageUrl} />
      <p className="product_detail__description">{description}</p>
      <p className="product-detail__price">${price}</p>
      <p className="product-detail__create">{createdAt}</p>
    </div>
  );
};

export default ProductDetail;
