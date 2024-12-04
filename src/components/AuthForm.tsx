// // src/components/AuthForm.tsx
// import { useForm, SubmitHandler } from "react-hook-form";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

// type AuthFormInputs = {
//   email: string;
//   password: string;
// };

// interface AuthFormProps {
//   isLogin: boolean;
// }

// export default function AuthForm({ isLogin }: AuthFormProps) {
//   const { register, handleSubmit, formState: { errors } } = useForm<AuthFormInputs>();

//   const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, data.email, data.password);
//         alert("Logged in successfully!");
//       } else {
//         await createUserWithEmailAndPassword(auth, data.email, data.password);
//         alert("Account created!");
//       }
//     } catch (error: any) {
//       console.error(error.message);
//       alert("Error: " + error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
//       <input {...register("email", { required: "Email is required" })} placeholder="Email" />
//       {errors.email && <span>{errors.email.message}</span>}

//       <input {...register("password", { required: "Password is required" })} type="password" placeholder="Password" />
//       {errors.password && <span>{errors.password.message}</span>}

//       <button type="submit">{isLogin ? "Login" : "Signup"}</button>
//     </form>
//   );
// }
