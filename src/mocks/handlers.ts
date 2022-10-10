import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import {
  ADD_CART,
  CartType,
  DELETE_CART,
  GET_CART,
  UPDATE_CART,
} from "../graphql/cart";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";

const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    // id: uuid(),
    id: i + 1 + "",
    imageUrl: `https://placeimg.com/200/150/${i + 1}`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(123456890123 + i * 1000 * 60 * 60 * 10).toString(),
  })))();

let cartData: { [key: string]: CartType } = (() => ({}))();

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find((item) => item.id === req.variables?.id);
    if (found) return res(ctx.data(found));
    return res();
  }),
  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const id = req.variables.id;
    const targetProduct = mockProducts.find((item) => item.id === id);

    if (!targetProduct) throw new Error("상품이 없습니다");

    const newItem = {
      ...targetProduct,
      amount: (newCartData[id]?.amount || 0) + 1,
    };
    newCartData[id] = newItem;

    cartData = newCartData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const { id, amount } = req.variables;
    if (!newCartData[id]) throw new Error("없는 데이터입니다.");

    const newItem = {
      ...newCartData[id],
      amount,
    };
    newCartData[id] = newItem;
    cartData = newCartData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation(DELETE_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const { id } = req.variables;
    if (!newCartData[id]) throw new Error("없는 데이터입니다.");

    delete newCartData[id];
    cartData = newCartData;
    return res(ctx.data(id));
  }),
];
