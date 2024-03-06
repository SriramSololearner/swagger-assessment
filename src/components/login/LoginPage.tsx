import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Banner from "../../assets/Banner.jpeg";
import { Stylesheet } from "../login/Styles";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import google from "../../assets/google.png";
import fb from "../../assets/Facebook.png";
import apple from "../../assets/apple.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { signinUrl } from "../../utilities/Constants";

interface Istate {
  formData: {
    email: string;
    password: string;
  };
  isShow: boolean;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Istate["formData"]>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(() => {
      return { ...formData, [name]: value };
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData.password.length > 0 || formData.email.length > 0) {
      const response = await axios.post(signinUrl, formData);

      if (response.data.status) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/landing");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("cannot be empty!");
    }
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
        <Box sx={Stylesheet.header}>Sign in</Box>
        <Typography component={"p"} sx={Stylesheet.headerContent}>
          if you don't have an account{" "}
        </Typography>
        <Typography component={"p"} sx={Stylesheet.headerContent1}>
          You can{" "}
          <Box
            component={"span"}
            sx={Stylesheet.spanContent}
            onClick={() => navigate("/register")}
          >
            Register here!
          </Box>
        </Typography>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input
            id="input-with-icon-adornment"
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
            id="input-with-icon-adornment"
            type={showPassword ? "text" : "password"}
            sx={Stylesheet.input1}
            onChange={handleChange}
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
          <Button sx={Stylesheet.button} type="submit" variant="contained">
            Login{" "}
          </Button>
        </FormControl>
        <Box sx={Stylesheet.buttonsContainer}>
          <Typography sx={Stylesheet.continueWith}>or continue with</Typography>

          <Box sx={Stylesheet.googleSign}>
            <Box component={"img"} src={fb} />
            <Box component={"img"} src={apple} />
            <Box component={"img"} src={google} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
