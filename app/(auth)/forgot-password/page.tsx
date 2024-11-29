"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState({
    userAccount: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateInputs = () => {
    const errors: { [key: string]: string } = {};

    if (!data.userAccount) errors.user = "No Telepon tidak boleh kosong";

    setInputError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(inputError).length > 0) {
      const timer = setTimeout(() => setInputError({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [inputError]);

  const handleSendPhone = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);

    const otp = Math.floor(Math.random() * 900000) + 100000;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}dashboard/Verify?userAccount=${data.userAccount}`,
        { randomNumber: otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.responseCode === "2002500") {
        sessionStorage.setItem("phone", data.userAccount);
        sessionStorage.setItem("otp", otp.toString());
        router.push(`/otp`);
      } else {
        console.log("Error processing OTP:", response.data);
        setError(true);
      }
    } catch (error) {
      console.log("Error processing OTP:", error);
    } finally {
      setLoading(false);
      setData({ userAccount: "" });
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        <div className="flex flex-col w-full p-8">
          <h1 className="text-lg font-medium">Atur ulang password</h1>
          {error && <ErrorMessage message="No telepon tidak terdaftar" />}
          <p className="text-xs my-6">
            Masukan email yang terdaftar pada akun anda dan kami akan
            mengirimkan email dengan instruksi untuk mengatur ulang password
          </p>
          <form action="" onSubmit={handleSendPhone}>
            <Input
              label="No Telepon"
              type="text"
              name="userAccount"
              value={data.userAccount}
              onChange={handleChange}
              error={inputError.user}
              className="mb-6"
            />

            <Button
              label="KIRIM PERMINTAAN"
              className="bg-base-accent text-white rounded-full w-full p-2"
              loading={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
