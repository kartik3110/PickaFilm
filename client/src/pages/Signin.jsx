import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Error from "../components/Error";
import TextField from "@mui/material/TextField";
import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignIn() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleCloseError = () => {
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      await authCtx.loginUser(userDetails);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div>
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
              error={error ? true : false}
              handleCloseError={handleCloseError}
              message={error}
            />
            <Avatar sx={{ m: 1, bgcolor: "transparent" }}>
              <LoginIcon sx={{ color: "white" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              // noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                variant="filled"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                variant="filled"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <MuiLink component={Link} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
