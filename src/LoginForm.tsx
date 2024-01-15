import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Simulating form submission using Axios
      const response = await axios.post("api/login", data);
      console.log("Submitted data:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Required field",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Required field",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Log In
        </Button>
      </form>
    </Container>
  );
}
