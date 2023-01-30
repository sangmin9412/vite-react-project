import { useQuery } from "react-query";
import { GET_CART } from "../../graphql/cart";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const CartCount = () => {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
    staleTime: 0,
    cacheTime: 1000,
  });

  const itemLength = Object.values(data || {}).length;

  return (
    <li>
      담긴갯수: {itemLength}
    </li>
  );
};

export default CartCount;