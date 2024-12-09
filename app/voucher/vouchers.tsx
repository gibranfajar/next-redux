import Countdown from "@/components/Countdown";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getVoucherList } from "@/redux/thunks/voucherListThunk";
import formatToIDR from "@/utils/formatToIDR";
import Image from "next/image";
import React, { useEffect } from "react";
import Barcode from "react-barcode";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";

interface Voucher {
  noVoucher: string;
  nominal: number;
  pointVoucher: number;
  tanggalExpired: string;
  statusPenggunaan: string;
}

export default function Vouchers() {
  const dispatch = useAppDispatch();
  const { error, data } = useSelector((state: RootState) => state.voucherList);

  useEffect(() => {
    dispatch(getVoucherList());
  }, [dispatch]);

  if (data == null) {
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

  return (
    <>
      {/* Card */}
      {data && data.voucherData ? (
        data.voucherData.length > 0 &&
        data.voucherData.map((item: Voucher) => (
          <div
            className="bg-[#E0DDD4] w-full max-w-md rounded-lg border border-gray-300 p-6 flex flex-col justify-between space-y-4 shadow-md mb-3"
            key={item.noVoucher}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Voucher Belanja</span>
                <div className="">
                  <span className="text-sm text-gray-600">Code : </span>
                  <span className="text-sm font-semibold">
                    {item.noVoucher}
                  </span>
                </div>
              </div>
              <Image src="/images/logo.svg" width={50} height={50} alt="logo" />
            </div>

            <div className="flex justify-end">
              <h1 className="text-xl font-bold text-gray-800">
                Rp {formatToIDR(item.nominal)}
              </h1>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">
                <Countdown targetDate={item.tanggalExpired} />
              </span>
              <Barcode
                value={item.noVoucher}
                displayValue={false}
                height={20}
                margin={0}
                width={1}
                background="transparent"
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Tidak ada data voucher.</p>
      )}
    </>
  );
}
