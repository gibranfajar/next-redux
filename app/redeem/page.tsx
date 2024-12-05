"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FadeLoader } from "react-spinners";
import formatToIDR from "@/utils/formatTime";
import { getUsers } from "@/redux/thunks/usersThunks";
import Barcode from "react-barcode";

export default function Redeem() {
  const dispatch = useAppDispatch();
  const { error, user } = useSelector((state: RootState) => state.users);

  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const voucher = [
    {
      id: 1,
      name: "Voucher Belanja 50.000",
      code: "KMZWAYA",
      nominal: 50000,
      daysLeft: 30,
    },
    {
      id: 2,
      name: "Voucher Belanja 100.000",
      code: "KMZWAYI",
      nominal: 100000,
      daysLeft: 25,
    },
    {
      id: 3,
      name: "Voucher Belanja 200.000",
      code: "KMZWAYZ",
      nominal: 200000,
      daysLeft: 20,
    },
    {
      id: 4,
      name: "Voucher Belanja 500.000",
      code: "KMZWAYK",
      nominal: 500000,
      daysLeft: 15,
    },
  ];

  const handleSelectVoucher = (id: number) => {
    setSelectedVoucher(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVoucher !== null) {
      const selectedVoucherData = voucher.find(
        (item) => item.id === selectedVoucher
      );
      if (selectedVoucherData) {
        console.log(`Berhasil memilih voucher:`, selectedVoucherData);
        setIsModalVisible(true);
      }
    } else {
      console.log("Tidak ada voucher yang dipilih");
    }
  };

  if (user == null) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <Image src="/images/logo.svg" width={150} height={150} alt="logo" />
        <FadeLoader color="#101E2B" width={5} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const selectedVoucherData = voucher.find(
    (item) => item.id === selectedVoucher
  );

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        <div className="flex flex-col m-8 w-full">
          <div className="flex flex-col px-8">
            {/* Header */}
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
                <span className="font-medium">Tukar Poin</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center items-center mt-8">
              <span className="text-sm mt-10">
                Tukarkan point menjadi voucher belanja
              </span>

              <div className="flex flex-col justify-center items-center mt-10">
                <span className="text-sm">POIN TERKINI</span>
                <span className="text-lg font-medium">
                  Rp {formatToIDR(user.memberInfoData.points || 0)}
                </span>
              </div>

              <div className="flex self-start mt-10 mb-4">
                <span className="text-sm">Nominal point yang akan ditukar</span>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                {/* Voucher Options */}
                <div className="grid grid-cols-3 md:grid-cols-3 gap-4 max-w-md">
                  {voucher.map((item) => (
                    <div
                      key={item.id}
                      className={`px-4 py-2 border cursor-pointer flex items-center justify-center ${
                        selectedVoucher === item.id
                          ? "border-gray-900 bg-gray-300"
                          : "border-gray-900"
                      }`}
                      onClick={() => handleSelectVoucher(item.id)}
                    >
                      <span className="text-[10px]">
                        Rp {formatToIDR(item.nominal)}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  label="Tukar Point"
                  type="submit"
                  className="bg-base-accent text-white rounded-full w-full p-2 mt-8"
                />
              </form>
            </div>
          </div>

          {/* Modal */}
          {isModalVisible && selectedVoucherData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
              <div className="bg-white w-full max-w-md shadow-lg rounded-lg">
                <div className="flex justify-end items-center p-4">
                  <button
                    onClick={() => setIsModalVisible(false)}
                    className="text-black"
                  >
                    &#10005;
                  </button>
                </div>

                <div className="flex flex-col justify-center items-center w-full">
                  <span className="text-xs text-center px-4">
                    Berhasil menukar poin dengan voucher senilai Rp{" "}
                    {formatToIDR(selectedVoucherData.nominal)}
                  </span>

                  <div className="w-full p-4">
                    <div className="bg-[#E0DDD4] w-full max-w-md rounded-lg border border-gray-300 p-6 flex flex-col justify-between space-y-4 shadow-md mb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {selectedVoucherData.name}
                          </span>
                          <div className="">
                            <span className="text-sm text-gray-600">
                              Code :{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              {selectedVoucherData.code}
                            </span>
                          </div>
                        </div>
                        <Image
                          src="/images/logo.svg"
                          width={50}
                          height={50}
                          alt="logo"
                        />
                      </div>

                      <div className="flex justify-end">
                        <h1 className="text-xl font-bold text-gray-800">
                          Rp {formatToIDR(selectedVoucherData.nominal)}
                        </h1>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          {selectedVoucherData.daysLeft} days left
                        </span>
                        <Barcode
                          value={selectedVoucherData.code}
                          displayValue={false}
                          height={20}
                          margin={0}
                          width={1}
                          background="transparent"
                        />
                      </div>
                    </div>

                    <Button
                      label="OK"
                      onClick={() => setIsModalVisible(false)}
                      className="bg-base-accent text-white rounded-full w-full p-2 my-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
