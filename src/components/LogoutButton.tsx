import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("isLoggedIn");
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="py-3 px-5 bg-gray-400 text-white rounded-xl hover:bg-gray-900 hover:border hover:border-white"
    >
      Logout
    </button>
  );
}
