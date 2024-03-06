import { Grid, Stack } from "@mui/material";
import Nav from "../../components/landing/Navbar/index";
import { styles } from "../landing/styles";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/landing/Item";

import { useEffect } from "react";
import { productsData } from "../../redux/reducer/productsSlice";
import { Appdispatch, RootState } from "../../redux/Store";

export default function LandingPage() {
  const dispatch = useDispatch<Appdispatch>();
  const { productsList } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(productsData());
    console.log(productsList);
  }, []);

  return (
    <Stack gap={1.5} sx={styles.container}>
      <Nav />
      <Grid container width={"100%"} sx={styles.gridContainer}>
        {productsList.length === 0 ? (
          <>Data not avaialable!!</>
        ) : (
          productsList?.map((item) => <Item key={item.productId} Item={item} />)
        )}
      </Grid>
    </Stack>
  );
}
