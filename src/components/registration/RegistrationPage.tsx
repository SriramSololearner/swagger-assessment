import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Typography,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Banner from "../../assets/Banner.jpeg";
import { Stylesheet } from "../registration/styles";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { signupUrl } from "../../utilities/Constants";

interface Istate {
  formData: {
    name: string;
    email: string;
    password: string;
    mobile: string;
  };
  isShow: boolean;
  role: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Istate["formData"]>({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });
  const [role, setRole] = useState<Istate["role"]>("select Type");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(() => {
      return { ...formData, [name]: value };
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = new FormData();
    form.append("roleId", role);
    form.append("name", formData.name);
    form.append("mobile", formData.mobile);
    form.append("email", formData.email);
    form.append("password", formData.password);

    const response = await fetch(signupUrl + role, {
      method: "POST",
      mode: "cors",
      body: form,
    });

    const res = await response.json();
    try {
      res.data.status && toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      !res.data.status && toast.error(res.data.message);
    } catch {
      toast.error(res.data?.message);
    }
  };
  const handlerRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={Stylesheet.loginPage}>
      <ToastContainer />
      <Box
        component={"img"}
        src={Banner}
        alt="no-img"
        sx={Stylesheet.leftContainer}
      />
      <Box
        sx={Stylesheet.rightContainer}
        component={"form"}
        onSubmit={handlerSubmit}
      >
        <Box sx={Stylesheet.header}>Sign up</Box>
        <Typography component={"p"} sx={Stylesheet.headerContent}>
          if you already have an account{" "}
        </Typography>
        <Typography component={"p"} sx={Stylesheet.headerContent1}>
          You can
          <Box
            component={"span"}
            sx={Stylesheet.spanContent}
            onClick={() => navigate("/")}
          >
            Login here!
          </Box>
        </Typography>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">UserName</InputLabel>
          <Input
            required
            id="input-with-icon-adornment"
            onChange={handleChange}
            name="name"
            value={formData.name}
            sx={Stylesheet.input}
            placeholder="Enter Your UserName"
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Mobile</InputLabel>
          <Input
            required
            onChange={handleChange}
            name="mobile"
            value={formData.mobile}
            sx={Stylesheet.input}
            placeholder="Enter Your mobile"
            startAdornment={
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input
            required
            onChange={handleChange}
            name="email"
            value={formData.email}
            sx={Stylesheet.input}
            placeholder="Enter Your Email Address"
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            sx={Stylesheet.input1}
            onChange={handleChange}
            required
            placeholder="Enter Your password"
            name="password"
            value={formData.password}
            startAdornment={
              <InputAdornment position="start">
                <HttpsIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormControl variant="standard" sx={Stylesheet.roleInput}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={role}
              onChange={handlerRoleChange}
            >
              <MenuItem value="SelectType">
                <em>select Type</em>
              </MenuItem>
              <MenuItem value={1}>user</MenuItem>
              <MenuItem value={2}>seller</MenuItem>
              <MenuItem value={3}>admin</MenuItem>
            </Select>
          </FormControl>
          <Button sx={Stylesheet.button} variant="contained" type="submit">
            Register{" "}
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SignUp;
