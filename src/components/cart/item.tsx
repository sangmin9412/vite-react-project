import React, { ForwardedRef, forwardRef, SyntheticEvent } from "react";
import { Query, useMutation } from "react-query";
import { CartType, DELETE_CART, UPDATE_CART } from "../../graphql/cart";
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";

const CartItem = (
  { id, imageUrl, price, title, amount }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        // 서버로 부터 결과를 받아오기 전 화면 먼저 업데이트 진행 (낙관적 업데이트)
        await queryClient.cancelQueries(QueryKeys.CART);
        const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>(
          QueryKeys.CART
        );
        if (!prevCart?.[id]) return prevCart;
        const newCart = {
          ...(prevCart || {}),
          [id]: {
            ...prevCart[id],
            amount,
          },
        };
        queryClient.setQueriesData(QueryKeys.CART, newCart);
        return prevCart;
      },
      onSuccess: (newValue, variables) => {
        // 서버로 부터 받아온 결괏값으로 업데이트 진행
        const prevCart = queryClient.getQueryData<{
          [key: string]: CartType;
        }>(QueryKeys.CART);
        const newCart = { ...(prevCart || {}), [id]: newValue };
        queryClient.setQueriesData(QueryKeys.CART, newCart);
      },
    }
  );

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    // {
    //   onMutate: async ({ id }) => {
    //     await queryClient.cancelQueries(QueryKeys.CART);
    //     const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>(
    //       QueryKeys.CART
    //     );
    //     if (!prevCart?.[id]) return prevCart;
    //     delete prevCart[id];
    //     const newCart = prevCart;
    //     queryClient.setQueriesData(QueryKeys.CART, newCart);
    //     return prevCart;
    //   },
    //   onSuccess: (newValue) => {
    //     const prevCart = queryClient.getQueryData<{
    //       [key: string]: CartType;
    //     }>(QueryKeys.CART);
    //     if (!prevCart?.[newValue]) return;
    //     delete prevCart[newValue];
    //     const newCart = { ...(prevCart || {}) };
    //     queryClient.setQueriesData(QueryKeys.CART, newCart);
    //   },
    // }
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART);
      },
    }
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    updateCart({ id, amount });
  };

  const handleDeleteItem = () => {
    deleteCart({ id });
  };

  return (
    <li className="cart-item">
      <input
        className="cart-item__checkbox"
        type="checkbox"
        name={`select-item`}
        ref={ref}
      />
      <br />
      <img src={imageUrl} alt="" />
      <br />
      <span>price: {price}</span>
      <br />
      <span>title: {title}</span>
      <br />
      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        min={1}
        onChange={handleUpdateAmount}
      />
      <br />
      <button
        className="cart-item__button"
        type="button"
        onClick={handleDeleteItem}
      >
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
