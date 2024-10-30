/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      const userRole = response.data.role;

      setMessage("Login successful!");
      console.log(response.data);
      setLoading(false);

      setTimeout(() => {
        if (userRole === 1) {
          navigate("/admin_dashboard");
        } else if (userRole === null || userRole === 2) {
          navigate("/user_dashboard");
        } else {
          navigate("/404");
        }
      }, 2000);
    } catch (error) {
      setMessage(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
      setLoading(false);
    }
  };

  // Inline styles for the animated background
  const backgroundStyle = {
    backgroundImage:
      'url("https://images.pexels.com/photos/1292998/pexels-photo-1292998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    animation: "moveBackground 30s linear infinite",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
      style={backgroundStyle}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          zIndex: 10,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {message && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Link
              href="/forgot_password"
              underline="none"
              color="text.secondary"
            >
              Forgot Password
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Link href="/register" underline="hover">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
