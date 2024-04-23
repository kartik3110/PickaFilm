import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import Error from "../../components/Error";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { isPasswordValid } from "../../utils/clientSideValidation";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Signup() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleCloseError = () => {
    setError(null);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const userDetails = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    const passwordError = isPasswordValid(data.get("password"));
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      await authCtx.signupUser(userDetails);
      navigate("/");
      toast.success("Welcome to Pickafilm!");
    } catch (error) {
      setError(error.message);
      console.log("adsfsdf", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Error
            error={error}
            handleCloseError={handleCloseError}
            message={error}
          />
          <Avatar sx={{ m: 1, bgcolor: "transparent" }}>
            <LockOutlinedIcon sx={{ color: "white" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
            />
            <TextField
              margin="normal"
              required
              variant="filled"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              variant="filled"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <MuiLink component={Link} to="/signin" variant="body2">
              {"Have an account? Sign In"}
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
