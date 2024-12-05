"use client";

import Image from "next/image";
import React, { useState } from "react";
import Rewards from "./rewards";
import Vouchers from "./vouchers";

export default function Page() {
  const [menu, setMenu] = useState<"voucher" | "rewards">("rewards");

  const renderMenuContent = () => {
    if (menu === "voucher") return <Vouchers />;
    if (menu === "rewards") return <Rewards />;
    return null;
  };

  const handleMenuChange = (selectedMenu: "voucher" | "rewards") => {
    setMenu(selectedMenu);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        <div className="bg-base-accent w-full min-h-screen">
          <div className="flex flex-col bg-white rounded-b-3xl p-8">
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
                <span className="font-medium">Voucher</span>
              </div>
            </div>

            {/* Menu */}
            <div className="flex justify-evenly items-center mt-8">
              <span
                className={`text-xs font-medium cursor-pointer ${
                  menu === "voucher" ? "underline" : ""
                }`}
                onClick={() => handleMenuChange("voucher")}
              >
                Voucher Belanja
              </span>
              <span
                className={`text-xs font-medium cursor-pointer ${
                  menu === "rewards" ? "underline" : ""
                }`}
                onClick={() => handleMenuChange("rewards")}
              >
                Voucher Rewards
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">{renderMenuContent()}</div>
        </div>
      </div>
    </div>
  );
}
