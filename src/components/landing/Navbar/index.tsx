import {
  AppBar,
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Modal,
  SelectChangeEvent,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { styles } from "./style";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { navItemsData } from "../../../utilities/utils/navdata";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Appdispatch, RootState } from "../../../redux/Store";
import {
  addProduct,
  emptySellerProductMsg,
  productCategory,
  productsData,
} from "../../../redux/reducer/productsSlice";

export default function Nav() {
  const { sellerProductMesage } = useSelector(
    (state: RootState) => state.products
  );
  // eslint-disable-next-line
  const [err, setErr] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  // eslint-disable-next-line
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    productId: 0,
    productName: "",
    desc: "",
    price: 0,
    weight: "",
    quantity: 0,
    date: "",
    category: "",
    categoryId: 135,
    productImage: [] as File[],
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<Appdispatch>();
  const { categoryList } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(productsData());
    dispatch(productCategory());
  }, [dispatch]);

  useEffect(() => {
    if (sellerProductMesage === "products Added Successfully!") {
      dispatch(productsData());
      dispatch(emptySellerProductMsg());
    }
  }, [sellerProductMesage]);

  // eslint-disable-next-line
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const setImageDetails = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      productImage: [...formData.productImage, event?.target.files![0]],
    });
    setImageUrl(URL.createObjectURL(event?.target.files![0]));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlerAddData = (e: FormEvent<HTMLFormElement>) => {
    console.log("add product");
    e.preventDefault();
    const form: any = new FormData();
    form.append("productName", formData.productName);
    form.append("categoryId", formData.categoryId);
    form.append("description", formData.desc);
    form.append("quantity", formData.quantity);
    form.append("price", formData.price);
    form.append("weight", formData.weight);

    for (let image of formData.productImage) {
      form.append("productImage", image);
    }
    dispatch(addProduct(form));
    handleClose();
  };

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.mainInnerContainer}>
        <AppBar position="sticky" color="transparent" elevation={0}>
          <Toolbar variant="dense" sx={styles.toolbar}>
            <Box sx={styles.toolbarInnerContainer}>
              <Grid container width={"100%"} sx={styles.gridContainer}>
                {navItemsData.map((item) => {
                  return (
                    <Grid
                      item
                      xs={item.name === "Name" ? 3 : 1.8}
                      key={item.id}
                      sx={styles.gridItem}
                    >
                      <Box sx={styles.menuContainer}>
                        <Typography sx={styles.name}>{item.name}</Typography>
                        <ImportExportIcon sx={styles.importIcon} />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
              <Button variant="contained" onClick={handleOpen}>
                Add
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box
                  sx={styles.modalContainer}
                  component={"form"}
                  onSubmit={handlerAddData}
                >
                  <Box sx={styles.avatarContainer}>
                    <Stack
                      sx={styles.imageContainer}
                      direction={"row"}
                      gap={3}
                      alignItems={"center"}
                    >
                      <Box
                        component={"input"}
                        type="file"
                        accept="image/*"
                        id="select-image"
                        hidden
                        onChange={setImageDetails}
                      />
                      <InputLabel sx={styles.inputLabel} htmlFor="select-image">
                        {imageUrl ? (
                          <Box sx={styles.bigImageContainer}>
                            <Box
                              component="img"
                              sx={styles.avatar}
                              alt=""
                              src={imageUrl}
                            />
                          </Box>
                        ) : (
                          <ImageIcon sx={styles.imageIcon} />
                        )}
                      </InputLabel>
                      <Typography sx={styles.drop}>
                        Drop your image here, or select{" "}
                        <Box
                          sx={styles.click}
                          component={"label"}
                          htmlFor="select-image"
                        >
                          Click to browse
                        </Box>
                      </Typography>
                    </Stack>
                  </Box>
                  <FormHelperText sx={styles.helperText}>
                    Property Name
                  </FormHelperText>
                  <TextField
                    type="text"
                    id="productName"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    sx={styles.usernameInput}
                    placeholder="Enter Product Name"
                    value={formData.productName}
                    name="productName"
                  />

                  <FormHelperText sx={styles.helperText}>
                    Description
                  </FormHelperText>
                  <TextField
                    type="text"
                    id="desc"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    sx={styles.usernameInput}
                    placeholder="Enter Desc"
                    value={formData.desc}
                    name="desc"
                  />
                  <FormHelperText sx={styles.helperText}>
                    Category
                  </FormHelperText>
                  <TextField
                    sx={styles.passwordInput}
                    id="category"
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Category"
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                  />
                  {/* <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      onChange={handleChangeCategory}
                    >
                      <MenuItem value="">Select</MenuItem>
                      {categoryList.map((item) => (
                        <MenuItem key={item.categoryId} value={item.categoryId}>
                          {item.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <FormHelperText sx={styles.helperText}>
                    quantity
                  </FormHelperText>
                  <TextField
                    type="text"
                    id="desc"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    sx={styles.usernameInput}
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    name="quantity"
                  />

                  <FormHelperText sx={styles.helperText}>Amount</FormHelperText>
                  <TextField
                    sx={styles.passwordInput}
                    id="amount"
                    required
                    autoComplete="off"
                    type="number"
                    placeholder="Enter Amount"
                    value={formData.price}
                    onChange={handleChange}
                    name="price"
                  />

                  <FormHelperText sx={styles.helperText}>Weight</FormHelperText>
                  <TextField
                    sx={styles.passwordInput}
                    id="weight"
                    required
                    autoComplete="off"
                    type="number"
                    placeholder="Enter weight"
                    value={formData.weight}
                    onChange={handleChange}
                    name="weight"
                  />

                  <Stack direction={"row"} gap={2}>
                    <Button
                      variant="outlined"
                      sx={{ ...styles.statusBtn, ...styles.cancelBtn }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={"contained"}
                      sx={{ ...styles.statusBtn, ...styles.soldBtn }}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Stack>
                  {err && <Typography sx={styles.err}>Upload Image</Typography>}
                </Box>
              </Modal>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
