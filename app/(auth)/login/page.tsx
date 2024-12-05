"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import LogoHeader from "@/components/LogoHeader";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserLogin = {
  user: string;
  password: string;
  loading: boolean;
};

export default function Login() {
  const router = useRouter();
  const [inputError, setInputError] = useState<{ [key: string]: string }>({});
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<UserLogin>({
    user: "",
    password: "",
    loading: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setInputError({});
  };

  const validateInputs = () => {
    const errors: { [key: string]: string } = {};

    if (!data.user) errors.user = "No Telepon tidak boleh kosong";
    if (!data.password) errors.password = "Password tidak boleh kosong";

    setInputError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;
    setData({ ...data, loading: true });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}dashboard/login`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.responseCode == 2002500) {
        localStorage.setItem("member", response.data.loginData.memberID);
        router.push("/home");
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setData({ ...data, loading: false });
      setData({ user: "", password: "", loading: false });
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        <LogoHeader className="m-20" />

        <div className="flex flex-col w-full px-8">
          {isError && (
            <ErrorMessage message={"No Telepon atau Password Salah"} />
          )}
          <p className="text-sm my-6">Masuk menggunakan kredensial anda</p>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              label="No Telepon"
              name="user"
              value={data.user}
              onChange={handleChange}
              error={inputError.user}
              className="mb-4"
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={inputError.password}
              className="mb-4"
            />

            <p className="text-xs my-6">
              Lupa Password? <Link href="/forgot-password">klik disini</Link>
            </p>

            <Button
              label="MASUK AKUN"
              className="bg-base-accent text-white rounded-full w-full p-2"
              loading={data.loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
