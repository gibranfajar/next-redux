import Image from "next/image";
import React from "react";

export default function AllBrands() {
  return (
    <div className="flex justify-center items-center gap-4 my-14">
      <Image
        src="/images/brands/celcius.svg"
        width={150}
        height={150}
        alt="celcius"
      />
      <Image
        src="/images/brands/celcius-woman.svg"
        width={150}
        height={150}
        alt="celcius-woman"
      />
      <Image
        src="/images/brands/mississippi.svg"
        width={150}
        height={150}
        alt="mississippi"
      />
      <Image
        src="/images/brands/queensland.svg"
        width={150}
        height={150}
        alt="queensland"
      />
    </div>
  );
}
