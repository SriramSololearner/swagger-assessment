import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Styles } from "./style";
import { styles } from "../../landing/Navbar/style";
import { useDispatch, useSelector } from "react-redux";
import { Appdispatch, RootState } from "../../../redux/Store";
import { Props } from "../../../utilities/utils/types";
import {
  deleteProduct,
  editProduct,
  emptySellerProductMsg,
  handleOptions,
  productsData,
  token,
} from "../../../redux/reducer/productsSlice";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { editUrl } from "../../../utilities/Constants";

export default function Item({ Item }: Readonly<Props>) {
  const { categoryList, sellerProductMesage } = useSelector(
    (state: RootState) => state.products
  );
  const [err, setErr] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [category, setCategory] = useState("");
  const [state, setState] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    productId: 0,
    productName: "",
    desc: "",
    price: 0,
    weight: "",
    quantity: 0,
    date: "",
    category: "",
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<Appdispatch>();
  const handleOpen = (Item: any) => {
    setOpen(true);
    setFormData({
      ...formData,
      productName: Item.productName,
      desc: Item.description,
      price: Item.price,
      weight: Item.weight,
      date: Item.productCreatedAt,
      category: Item.categoryName,
      productId: Item.productId,
    });
    setSelectedImage(Item.imageURL);
  };

  useEffect(() => {
    dispatch(productsData());
  }, []);

  const handleEdit = (item: any) => {
    handleOpen(item);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  if (sellerProductMesage === "products deleted Successfully!") {
    dispatch(productsData());
    dispatch(emptySellerProductMsg());
  }

  const showOptions = (id: number) => {
    dispatch(handleOptions(id));
  };

  const setImageDetails = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedImage(files?.[0]);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    console.log("edit product");
    evt.preventDefault();

    const form = new FormData();
    form.append("productName", formData.productName);
    form.append("productId", formData.productId + "");
    form.append("description", formData.desc);
    form.append("productUpdatedAt", formData.date);
    form.append("weight", formData.weight);

    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    };
    const response = await fetch(
      editUrl + formData.productId.toString(),
      options
    );
    const res = await response.json();
    handleClose();
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
    if (sellerProductMesage === "productsupdated Successfully ") {
      dispatch(productsData());
      dispatch(emptySellerProductMsg());
    }
  }, [selectedImage, sellerProductMesage]);

  return (
    <Grid
      item
      width={"100%"}
      container
      sx={Styles.gridItemContainer}
      rowGap={{ xs: 1.5, sm: 0 }}
    >
      <Grid item xs={12} sm={3} sx={Styles.gridItem}>
        <Box sx={Styles.menuContainer}>
          <Stack direction={"row"} gap={1.8} alignItems={"center"}>
            <Box sx={Styles.bigImgContainer}>
              <Box
                component={"img"}
                sx={Styles.img}
                alt="img"
                src={Item.categoryImage}
              />
            </Box>
            <Stack>
              <Typography sx={Styles.name}>{Item.productName}</Typography>
              <Typography sx={Styles.address}>
                {Item.description === null
                  ? "desc not avaialable"
                  : Item.description}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={Styles.dateContainer}>
            <MoreVertIcon />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1.8} sx={Styles.gridItem}>
        <Box sx={Styles.menuContainer}>
          <Stack sx={Styles.dateContainer}>
            <Typography sx={Styles.date}>Date</Typography>
          </Stack>
          <Stack>
            <Typography sx={Styles.name}>
              {Item.productCreatedAt?.slice(0, 10)}
            </Typography>
            <Typography sx={Styles.time}>
              At {Item.productCreatedAt?.slice(11, 16)}
            </Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1.8} sx={Styles.gridItem}>
        <Box sx={Styles.menuContainer}>
          <Stack sx={Styles.dateContainer}>
            <Typography sx={Styles.date}>payment</Typography>
          </Stack>
          <Stack>
            <Typography sx={Styles.name}>{Item.categoryName}</Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1.8} sx={Styles.gridItem}>
        <Box sx={Styles.menuContainer}>
          <Stack sx={Styles.dateContainer}>
            <Typography sx={Styles.date}>Amount</Typography>
          </Stack>
          <Stack> ₹{Item.price}</Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1.8} sx={Styles.gridItem}>
        <Box sx={Styles.menuContainer}>
          <Stack sx={Styles.dateContainer}>
            <Typography sx={Styles.date}>Status</Typography>
          </Stack>
          <Stack>{Item.weight ? Item.weight + "" : "no data"}</Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1.8} sx={Styles.gridItem}>
        <Box sx={Styles.menuContainer}>
          <Stack>
            <Button
              variant="contained"
              onClick={() => showOptions(Item.productId)}
              sx={Styles.moreBtn}
            >
              <MoreHorizIcon />
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={styles.modalContainer}
                component={"form"}
                onSubmit={(evt) => handleSubmit(evt)}
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
                      onChange={(e) => setImageDetails(e)}
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
                  defaultValue={Item.productName}
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
                  defaultValue={Item.description}
                  value={formData.desc}
                  name="desc"
                />
                <FormHelperText sx={styles.helperText}>Category</FormHelperText>
                <TextField
                  sx={styles.passwordInput}
                  id="category"
                  required
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Category"
                  value={formData.category}
                  defaultValue={Item.categoryName}
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
                    {categoryList.map((item) => (
                      <MenuItem key={item.categoryId} value={item.categoryId}>
                        {item.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                <FormHelperText sx={styles.helperText}>Weight</FormHelperText>
                <TextField
                  sx={styles.passwordInput}
                  id="weight"
                  required
                  autoComplete="off"
                  type="number"
                  placeholder="Enter weight"
                  value={formData.weight}
                  defaultValue={Item.weight}
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
          </Stack>
          {Item.active && (
            <Card sx={Styles.editContainer}>
              <Stack direction={"row"} gap={1}>
                <BorderColorOutlinedIcon />
                <Typography onClick={() => handleEdit(Item)}>Edit</Typography>
              </Stack>
              <Stack
                direction={"row"}
                gap={1}
                onClick={() => handleDelete(Item.productId)}
              >
                <DeleteOutlineOutlinedIcon />
                <Typography>Delete</Typography>
              </Stack>
            </Card>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
