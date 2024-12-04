// src/app/auth/login.tsx
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log("User logged in with:", data);
    // Authentication logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
        className="p-2 border rounded mb-2"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
        className="p-2 border rounded mb-2"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Login</button>
    </form>
  );
}
