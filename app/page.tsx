"use client";

import { RootState } from "@/redux/store";
import { loginUser } from "@/redux/thunks/authThunks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [data, setData] = useState<{ user: string; password: string }>({
    user: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user?.responseCode == 2002500) {
      localStorage.setItem("memberID", user.loginData.memberID);
      router.push("/home");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          name="user"
          value={data.user}
          onChange={handleChange}
          placeholder="Enter your user"
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className={`p-2 ${
            loading ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
