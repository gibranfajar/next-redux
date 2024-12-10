"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { FadeLoader } from "react-spinners";
import Barcode from "react-barcode";
import Button from "@/components/Button";
import Countdown from "@/components/Countdown";
import formatToIDR from "@/utils/formatToIDR";
import { getUsers } from "@/redux/thunks/usersThunks";
import { getVoucher } from "@/redux/thunks/voucherThunks";
import axios from "axios";

interface Voucher {
  id: number;
  voucherCode: string;
  nominal: number;
  toDate: string;
}

interface VoucherRedeem {
  voucherCode: string;
  nominal: number;
  endDate: string;
}

interface Redeem {
  memberID: string;
  voucher_code: string;
  ip_address: string;
}

export default function Redeem() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, error } = useSelector((state: RootState) => state.users);
  const { data } = useSelector((state: RootState) => state.voucher);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [voucherRedeem, setVoucherRedeem] = useState<VoucherRedeem | null>(
    null
  );

  const [redeem, setRedeem] = useState<Redeem>({
    memberID: "",
    voucher_code: "",
    ip_address: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const member = localStorage.getItem("member");

      setRedeem((prev) => ({
        ...prev,
        memberID: member || "",
        ip_address: "-",
      }));
      dispatch(getUsers());
      dispatch(getVoucher());
    }
  }, [dispatch]);

  const handleSelectVoucher = (voucherCode: string) => {
    setSelectedVoucher(voucherCode);
    setRedeem((prev) => ({ ...prev, voucher_code: voucherCode }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVoucher === null)
      return alert("Pilih voucher terlebih dahulu.");

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}voucher/redeem`,
        {
          memberID: redeem.memberID,
          voucher_code: redeem.voucher_code,
          ip_address: redeem.ip_address,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.responseCode === "2002500") {
        setVoucherRedeem(response.data.voucherData);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !data) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <Image src="/images/logo.svg" width={150} height={150} alt="logo" />
        <FadeLoader color="#101E2B" width={5} />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

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

              <form onSubmit={handleSubmit} className="w-full mt-10">
                {/* Voucher Options */}
                <div className="grid grid-cols-3 gap-4">
                  {data.voucherData.map((voucher: Voucher) => (
                    <div
                      key={voucher.id}
                      className={`px-4 py-2 border cursor-pointer text-center ${
                        selectedVoucher === voucher.voucherCode
                          ? "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSelectVoucher(voucher.voucherCode)}
                    >
                      Rp {formatToIDR(voucher.nominal)}
                    </div>
                  ))}
                </div>

                <Button
                  label="Tukar Point"
                  type="submit"
                  className="bg-base-accent text-white rounded-full w-full mt-8 p-2"
                  loading={isLoading}
                />
              </form>
            </div>
          </div>

          {/* Modal */}
          {isModalVisible && voucherRedeem && (
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
                    {formatToIDR(voucherRedeem.nominal)}
                  </span>

                  <div className="w-full p-4">
                    <div className="bg-[#E0DDD4] w-full max-w-md rounded-lg border border-gray-300 p-6 flex flex-col justify-between space-y-4 shadow-md mb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {/* {voucherRedeem.name} */}
                            Voucher Belanja
                          </span>
                          <div className="">
                            <span className="text-sm text-gray-600">
                              Code :{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              {voucherRedeem.voucherCode}
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
                          Rp {formatToIDR(voucherRedeem.nominal)}
                        </h1>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          <Countdown targetDate={voucherRedeem.endDate} />
                        </span>
                        <Barcode
                          value={"AMS123123"}
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
                      onClick={() => (
                        setIsModalVisible(false),
                        setVoucherRedeem(null),
                        router.push("/voucher")
                      )}
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
