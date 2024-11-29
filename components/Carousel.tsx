"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { getPromo } from "@/redux/thunks/promoThunks";
import { RootState } from "@/redux/store";

const Carousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.promo
  );

  useEffect(() => {
    dispatch(getPromo());
  }, [dispatch]);

  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000, // Delay in milliseconds
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {data &&
          data.promoData.map((item: any) => (
            <SwiperSlide key={item.id}>
              <Image
                src={`https://web.amscorp.id:3060/imagestorage/promo/${item.imageUrl}`}
                alt={`Image ${item.id}`}
                className="w-full h-auto rounded-lg"
                width={500}
                height={500}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Carousel;