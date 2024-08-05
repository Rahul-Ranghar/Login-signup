"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
    <div className=" flex justify-between gap-9 px-5 py-8  bg-blue-300 ">
      <h1 className="text-[black] font-bold">AUTH</h1>
      <h2 className="text-[black] font-bold">Welcome back</h2>
      <button
        onClick={logoutHandler}
        className="bg-green-500 space-y-20 text-[black] px-2 py-1 rounded-full"
      >
        Logout
      </button>
    </div>
    <div className="min-h-screen bg-pink-300 flex justify-center py-9">
      <h1 className="text-black font-bold text-5xl ">Thank You for visit</h1>
    </div>
  </>
  );
}
