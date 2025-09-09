import React from "react";
import {CarouselCustomNavigation} from"./Carousel"

export const WhatDoes = () => {

  return (
    <div className="flex flex-wrap flex-col justify-center items-center md:px-[72px] px-5 py-[75px]">
      {/*<div className="bg-[#ffff] h-[100%] z-10 w-[100vw] md:w-full md:h-[670px]  md:max-w=[636px] md:rounded bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/895687a5abb188c5b04c1d52c8ec731f.png')]"/> */}
      {/*<img className=" w-[80vw] h-auto mb-[140px]" src="https://d1yh21d3dzz97r.cloudfront.net/Bronx%20Digital%20Pipeline%202.png"/>*/}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-[24px] max-w-[1296px]">
        <div className="flex justify-center items-center  bg-[#FF7000] p-0 rounded-md h-[445px] drop-shadow">
          <div className="flex justify-center items-center  h-[100%] w-[100%] drop-shadow-card-2 text-[#fff]">
            <div className="w-[70%]">
              <h2 className="font-bold text-4xl mb-3">What Does this Lead to?</h2>
              <p>
                Utilizing a collective impact model focused on supporting youth pathways 
                into technology can lead to a number of important outcomes that might otherwise 
                be difficult to achieve:
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 bg-[#fff]  drop-shadow rounded-md xl:h-[445px] h-fit">
          <div className="h-[100%] w-[100%] drop-shadow-card-2">
            <CarouselCustomNavigation/>
          </div>
        </div>
      </div>
    </div>
  );
};