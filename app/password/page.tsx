"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import SuccessMessage from "@/components/SuccessMessage";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

// interface for password
interface Password {
  memberID: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string[];
}

// interface for pin
interface Pin {
  memberID: string;
  pin: string;
  confirmPin: string;
  loading: boolean;
  error: string[];
}

export default function Profile() {
  const [errorMessagePassword, setErrorMessagePassword] =
    useState<boolean>(false);
  const [successMessagePassword, setSuccessMessagePassword] =
    useState<boolean>(false);
  const [errorMessagePin, setErrorMessagePin] = useState<boolean>(false);
  const [successMessagePin, setSuccessMessagePin] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const member = localStorage.getItem("member");

      setPassword((prevPassword) => ({
        ...prevPassword,
        memberID: member || "",
      }));

      setPin((prevPin) => ({
        ...prevPin,
        memberID: member || "",
      }));
    }
  }, []);

  // state for password
  const [password, setPassword] = useState<Password>({
    memberID: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
    loading: false,
    error: [],
  });

  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [pinMatch, setPinMatch] = useState<boolean | null>(null);

  // state for pin
  const [pin, setPin] = useState<Pin>({
    memberID: "",
    pin: "",
    confirmPin: "",
    loading: false,
    error: [],
  });

  // change state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Check if the input is related to password
    setPassword((prevPassword) => {
      const updatedPassword = { ...prevPassword, [name]: value };
      setPassword((prevPassword) => ({
        ...prevPassword,
        error: [],
      }));

      // Check if password and confirmPassword match
      if (name === "password" || name === "confirmPassword") {
        setPasswordMatch(
          updatedPassword.password === updatedPassword.confirmPassword
        );
      }

      return updatedPassword;
    });

    // Check if the input is related to pin
    setPin((prevPin) => {
      const updatedPin = { ...prevPin, [name]: value };
      setPin((prevPin) => ({
        ...prevPin,
        error: [],
      }));

      // Check if pin and confirmPin match
      if (name === "pin" || name === "confirmPin") {
        setPinMatch(updatedPin.pin === updatedPin.confirmPin);
      }

      return updatedPin;
    });
  };

  // submit password
  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set loading
    setPassword((prevPassword) => ({ ...prevPassword, loading: true }));

    const errors: string[] = [];
    if (!password.currentPassword) errors.push("Password lama harus diisi");
    if (!password.password) errors.push("Password baru harus diisi");
    if (!password.confirmPassword)
      errors.push("Konfirmasi password baru harus diisi");

    if (errors.length > 0) {
      setPassword((prevPassword) => ({
        ...prevPassword,
        loading: false,
        error: errors,
      }));
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}profile/auth/2`,
        password,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // check response status
      if (response.data.responseCode === "2002500") {
        // show success message
        setSuccessMessagePassword(true);
        // remove message after 3 seconds
        setTimeout(() => setSuccessMessagePassword(false), 3000);
      } else if (response.data.responseCode === "4002500") {
        // show error message
        setErrorMessagePassword(true);
        // remove message after 3 seconds
        setTimeout(() => setErrorMessagePassword(false), 3000);
      } else {
        console.error("Terjadi kesalahan pada server");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      // loading false
      setPassword((prevPassword) => ({ ...prevPassword, loading: false }));
      // clear password fields
      setPassword((prevPassword) => ({
        ...prevPassword,
        currentPassword: "",
        password: "",
        confirmPassword: "",
        loading: false,
      }));
    }
  };

  // submit pin
  const handleSubmitPin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set loading
    setPin((prevPin) => ({ ...prevPin, loading: true }));

    // validasi
    const errors: string[] = [];
    if (!pin.pin) errors.push("PIN harus diisi");
    if (!pin.confirmPin) errors.push("PIN konfirmasi harus diisi");

    if (errors.length > 0) {
      setPin((prevPin) => ({
        ...prevPin,
        loading: false,
        error: errors,
      }));
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}profile/auth/1`,
        pin,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // check response status
      if (response.data.responseCode === "2002500") {
        // show success message
        setSuccessMessagePin(true);
        // remove message after 3 seconds
        setTimeout(() => setSuccessMessagePin(false), 3000);
      } else if (response.data.responseCode === "4002500") {
        // show error message
        setErrorMessagePin(true);
        // remove message after 3 seconds
        setTimeout(() => setErrorMessagePin(false), 3000);
      } else {
        console.error("Terjadi kesalahan pada server");
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      // loading false
      setPin((prevPin) => ({ ...prevPin, loading: false }));
      // clear pin fields
      setPin((prevPin) => ({
        ...prevPin,
        pin: "",
        confirmPin: "",
        loading: false,
      }));
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        <div className="flex flex-col m-8 w-full">
          <div className="flex flex-col px-8">
            <div className="flex items-center">
              <Image
                src="/images/arrow-left.svg"
                width={30}
                height={30}
                alt="arrow-left"
                className="w-auto h-auto cursor-pointer"
                onClick={() => window.history.back()}
              />
              <div className="flex-grow flex justify-center">
                <span className="font-medium">Pengaturan Password & PIN</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs my-4">
                Digunakan untuk masuk akun member AMSCORP
              </p>
              <form onSubmit={handleSubmitPassword}>
                <Input
                  label="Password Terkini"
                  type="password"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handleChange}
                  className="mb-4"
                  error={password.error[0]}
                />
                <Input
                  label="Password Baru"
                  type="password"
                  name="password"
                  value={password.password}
                  onChange={handleChange}
                  className="mb-4"
                  error={password.error[1]}
                />
                <Input
                  label="Konfirmasi Password Baru"
                  type="password"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handleChange}
                  error={password.error[2]}
                />

                {passwordMatch === false && (
                  <p className="text-red-500 text-xs mt-1">
                    Password tidak cocok.
                  </p>
                )}
                {passwordMatch && password.password && (
                  <p className="text-green-500 text-xs mt-1">Password cocok.</p>
                )}

                <Button
                  label="SIMPAN PASSWORD"
                  className="bg-base-accent text-white rounded-full w-full p-2 my-6"
                  loading={password.loading}
                />
              </form>

              {errorMessagePassword && (
                <ErrorMessage message={"Password Salah"} />
              )}
              {successMessagePassword && (
                <SuccessMessage message={"Password Berhasil Diubah"} />
              )}
            </div>
            <hr className="my-2 h-0.5 border-t-0 bg-neutral-200" />
            <div className="">
              <p className="text-xs my-4">
                Digunakan untuk redeem saat transaksi
              </p>
              <form onSubmit={handleSubmitPin}>
                <Input
                  label="PIN Baru"
                  type="password"
                  name="pin"
                  value={pin.pin}
                  onChange={handleChange}
                  className="mb-4"
                  error={pin.error[0]}
                />
                <Input
                  label="Konfirmasi PIN Baru"
                  type="password"
                  name="confirmPin"
                  value={pin.confirmPin}
                  onChange={handleChange}
                  error={pin.error[1]}
                />

                {pinMatch === false && (
                  <p className="text-red-500 text-xs mt-1">PIN tidak cocok.</p>
                )}
                {pinMatch && pin.pin && (
                  <p className="text-green-500 text-xs mt-1">PIN cocok.</p>
                )}

                <Button
                  label="SIMPAN PIN"
                  className="bg-base-accent text-white rounded-full w-full p-2 my-6"
                  loading={pin.loading}
                />
              </form>

              {errorMessagePin && <ErrorMessage message={"PIN Salah"} />}
              {successMessagePin && (
                <SuccessMessage message={"PIN Berhasil Diubah"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
