import { useQuery } from "@tanstack/react-query";
import React, { FC, memo } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Loading } from "src/components/Loader";
import { RenderProduct } from "src/components/RenderProduct";
import { api } from "src/services/api";
import { Product } from "src/types/Product";
interface Props {
  categoryName: string;
}
const ProductList: FC<Props> = ({ categoryName }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["allProduct", categoryName],
    queryFn: async () => await (await api.getAllProducts(categoryName)).data,
  });

  const renderProduct: ListRenderItem<Product> = ({ item }) => {
    return <RenderProduct item={item} />;
  };
  return (
    <>
      <FlatList
        className="grow-1 pt-2"
        data={data || []}
        renderItem={renderProduct}
        numColumns={2}
      />
      <Loading loading={isLoading} />
    </>
  );
};

export default memo(ProductList);
