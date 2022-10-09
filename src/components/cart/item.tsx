import React from "react";
import { CartType } from "../../graphql/cart";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  return (
    <li>
      <span>id: {id}</span>
      <br />
      <span>img: {imageUrl}</span>
      <br />
      <span>price: {price}</span>
      <br />
      <span>title: {title}</span>
      <br />
      <span>amout: {amount}</span>
    </li>
  );
};

export default CartItem;
