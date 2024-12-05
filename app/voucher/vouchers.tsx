import formatToIDR from "@/utils/formatTime";
import Image from "next/image";
import React from "react";
import Barcode from "react-barcode";

export default function Vouchers() {
  const data = [
    {
      id: 1,
      title: "Voucher Belanja",
      code: "KMZWAYA",
      amount: 20000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      daysLeft: "10 Days left",
    },
    {
      id: 2,
      title: "Voucher Belanja",
      code: "KMZWAYI",
      amount: 50000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      daysLeft: "20 Days left",
    },
    {
      id: 3,
      title: "Voucher Belanja",
      code: "KMZWAYZ",
      amount: 100000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      daysLeft: "30 Days left",
    },
  ];

  return (
    <>
      {/* Card */}
      {data.map((item) => (
        <div
          className="bg-[#E0DDD4] w-full max-w-md rounded-lg border border-gray-300 p-6 flex flex-col justify-between space-y-4 shadow-md mb-3"
          key={item.id}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Voucher Belanja</span>
              <div className="">
                <span className="text-sm text-gray-600">Code : </span>
                <span className="text-sm font-semibold">{item.code}</span>
              </div>
            </div>
            <Image src="/images/logo.svg" width={50} height={50} alt="logo" />
          </div>

          <div className="flex justify-end">
            <h1 className="text-xl font-bold text-gray-800">
              Rp {formatToIDR(item.amount)}
            </h1>
          </div>

          <p className="text-xs text-gray-600">{item.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">{item.daysLeft}</span>
            <Barcode
              value="KMZWAY"
              displayValue={false}
              height={20}
              margin={0}
              width={1}
              background="transparent"
            />
          </div>
        </div>
      ))}
    </>
  );
}
