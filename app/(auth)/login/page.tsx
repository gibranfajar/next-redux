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
  const [showPass, setShowPass] = useState(false);
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
        localStorage.setItem("token", response.data.loginData.token);
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
              type="tel"
              label="No Telepon"
              name="user"
              value={data.user}
              onChange={handleChange}
              error={inputError.user}
              className="mb-4"
            />

            <div className="mb-2 relative">
              <Input
                type={showPass ? "text" : "password"}
                label="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={inputError.password}
                className="mb-4"
              />

              <span
                className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </span>
            </div>

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
