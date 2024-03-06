export const Stylesheet = {
    loginPage: {
        width: "100%",
        display: { xs: "flex", sm: "flex", md: "flex" },
        justifyContent: "center",
        alignItems: "center"
    },
    leftContainer: {
        width: "60%",
        height: "100vh",
        display: { xs: "none", sm: "none", md: "flex" },
    },
    rightContainer: {
        width: { lg: "40%", md: "100%" },
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        justifyContent: "center",
        alignItems: "flex-start",
        ml: "50px"
    },
    header: {
        fontSize: "28px",
        mr: "150px"
    },
    headerContent: {
        mb: "-22px",
        fontSize: "12px",
        fontFamily: "Poppins"
    },
    headerContent1: {
        mb: "0px",
        fontSize: "12px", fontFamily: "Poppins"
    },

    spanContent: {
        color: "#FF432A",
        fontFamily: "Poppins",
        mx: "10px",
        cursor: "pointer",
        '&:hover': {
            color: "#ff432a"
        }
    },
    input1: {
        width: { xs: "90%", lg: "98%" },
        fontSize: "15px",
        '&::placeholder': {
            fontSize: "1px",
            color: "white"
        }
    },
    input: {
        width: { xs: "90%", lg: "100%" }, mr: "40px",
        fontSize: "15px",
        '&::placeholder': {
            fontSize: "1px"
        }
    },
    roleInput: {
        pt: 3, width: {
            xs: "90%", lg: "98%",
            "& .MuiSelect-standard MuiInputBase-input ": {
            },
           
        }
    },

    button: {
        width: { lg: "100%", xs: "90%" },
        mt: "16px",
        textTransform: "capitalize",
        background: "#FF432A",
        color: "white",
        borderRadius: 5,
        "&:hover": {
            background: "#FF432A",
            color: "white",
            opacity: 0.9
        },
    },
    icons: {
        display: "flex",
        gap: "5px"
    },

    buttonsContainer: {
        width: { lg: "60%", xs: "100%" },
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", lg: "center" },
    },
    continueWith: {
        color: "#5555",
        textAlign: "center",
    },
    googleSign: {
        my: "20px",
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
    }
}