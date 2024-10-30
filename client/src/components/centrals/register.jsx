import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  CircularProgress,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPositionsAndDepartments = async () => {
      try {
        const positionsResponse = await axios.get(
          "http://localhost:5000/api/auth/list-positions"
        );
        const departmentsResponse = await axios.get(
          "http://localhost:5000/api/auth/list-departments"
        );
        setPositions(positionsResponse.data.positions);
        setDepartments(departmentsResponse.data.departments);
      } catch {
        setError("Failed to load positions or departments");
      }
    };

    fetchPositionsAndDepartments();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      if (response.status === 201) {
        setMessage("Registration successful!");
        reset();
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

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
          width: { xs: "90%", sm: 600 }, // ปรับให้เข้ากับขนาดหน้าจอที่แตกต่างกัน
          p: 4,
          //bgcolor: "background.paper",
          //boxShadow: 3,
          //borderRadius: 2,
          //zIndex: 10,
        }}
      >
        <Paper elevation={5} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
          <Typography variant="h4" gutterBottom align="center">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {message && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  {...register("fname", { required: "First name is required" })}
                  error={!!errors.fname}
                  helperText={errors.fname?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  {...register("lname", { required: "Last name is required" })}
                  error={!!errors.lname}
                  helperText={errors.lname?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  {...register("pnumber", {
                    required: "Phone number is required",
                  })}
                  error={!!errors.pnumber}
                  helperText={errors.pnumber?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Position"
                  variant="outlined"
                  fullWidth
                  select
                  {...register("position_id", {
                    required: "Position is required",
                  })}
                >
                  <MenuItem value="">
                    <em>Select Position</em>
                  </MenuItem>
                  {positions.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  select
                  {...register("department_id", {
                    required: "Department is required",
                  })}
                >
                  <MenuItem value="">
                    <em>Select Department</em>
                  </MenuItem>
                  {departments.map((department) => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Box>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
