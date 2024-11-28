"use client";

import { useAppDispatch } from "@/redux/hooks";
import { clearUser } from "@/redux/slices/usersSlice";
import { RootState } from "@/redux/store";
import { getUsers } from "@/redux/thunks/usersThunks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Mengambil data dari slice `users`
  const { loading, error, user } = useSelector(
    (state: RootState) => state.users
  );

  // Memuat data user saat komponen dirender
  useEffect(() => {
    const member = localStorage.getItem("memberID");
    if (member) {
      dispatch(getUsers());
    } else {
      router.push("/"); // Redirect ke halaman login
    }
  }, [dispatch, router]);

  // Handle logout
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("memberID"); // Hapus ID member dari localStorage
    router.push("/"); // Redirect ke halaman login
  };

  // Render loading atau error
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render konten jika user ditemukan
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg">
        <h1 className="text-2xl">Welcome, {user?.memberInfoData.fullName}</h1>
        <span>Tier anda : {user?.memberInfoData.tierInfo.tier_name}</span>
        <span>Poin anda : {user?.memberInfoData.points}</span>
        <button
          className="mt-4 bg-blue-950 text-white py-2 px-4 w-full rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
