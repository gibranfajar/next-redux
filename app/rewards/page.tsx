"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Rewards() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        <div className="bg-base-accent w-full min-h-screen">
          <div className="flex flex-col bg-white rounded-b-3xl p-8">
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
                <span className="font-medium">Rewards</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-8">
              <span className="text-xs font-medium cursor-pointer underline">
                All Rewards
              </span>
              <span className="text-xs font-medium cursor-pointer">
                Special Offers
              </span>
              <span className="text-xs font-medium cursor-pointer">
                Birthday
              </span>
            </div>
          </div>

          {/* card */}
          <div className="p-4">
            <div
              className="bg-white w-full rounded-lg border border-gray-300 flex flex-col items-center justify-between mb-4 cursor-pointer"
              onClick={showModal}
            >
              <Image
                src={
                  "https://web.amscorp.id:3060/imagestorage/promo/cpWURUAFH0y8Eqos5Tbf2QpromoPROMO%20MSP-01.png"
                }
                alt="reward"
                width={1240}
                height={1240}
                className="w-auto h-auto rounded-t-lg"
              />
              <div className="flex justify-between items-center w-full p-4 rounded-b-lg">
                <span className="text-xs">10 hari lagi</span>
                <span className="text-xs">GUNAKAN</span>
              </div>
            </div>
            <div
              className="bg-white w-full rounded-lg border border-gray-300 flex flex-col items-center justify-between mb-4 cursor-pointer"
              onClick={showModal}
            >
              <Image
                src={
                  "https://web.amscorp.id:3060/imagestorage/promo/cpWURUAFH0y8Eqos5Tbf2QpromoPROMO%20MSP-01.png"
                }
                alt="reward"
                width={1240}
                height={1240}
                className="w-auto h-auto rounded-t-lg"
              />
              <div className="flex justify-between items-center w-full p-4 rounded-b-lg">
                <span className="text-xs">10 hari lagi</span>
                <span className="text-xs">GUNAKAN</span>
              </div>
            </div>
          </div>

          {/* open modal */}
          {isModalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
              <div className="bg-white w-full max-w-md min-h-screen shadow-lg">
                <div className="flex justify-between items-center p-6">
                  <span className="text-xs">REWARD KAMU</span>
                  <button onClick={closeModal} className="text-black">
                    &#10005;
                  </button>
                </div>

                <Image
                  src={
                    "https://web.amscorp.id:3060/imagestorage/promo/cpWURUAFH0y8Eqos5Tbf2QpromoPROMO%20MSP-01.png"
                  }
                  alt="reward"
                  width={1240}
                  height={1240}
                  className="logo"
                />

                <div className="p-4">
                  <h2 className="font-bold text-center my-3">
                    Special Voucher Discount 50K
                  </h2>

                  {/* Daftar produk */}
                  <div className="my-6">
                    <div className="border border-gray-300 p-4 rounded-lg mb-4">
                      <div className="flex flex-col mb-4">
                        <span className="text-xs text-zinc-400">
                          Voucher Code
                        </span>
                        <span className="text-sm">KMZWAY87AA</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Voucher can be use at:</span>
                        <span className="text-xs">Semua brand</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        Terms & Condition
                      </span>
                      <ol className="text-xs my-2">
                        <li>Lorem ipsum dolloret sit amet bla bla..</li>
                        <li>
                          Voucher discount hanya dapat digunakan satu kali
                        </li>
                        <li>
                          Voucher discount hanya dapat digunakan satu kali
                        </li>
                        <li>
                          Voucher discount hanya dapat digunakan satu kali
                        </li>
                        <li>
                          Voucher discount hanya dapat digunakan satu kali
                        </li>
                      </ol>
                    </div>
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
