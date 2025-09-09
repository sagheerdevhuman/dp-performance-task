import React from "react";

export const TheRole = () => {

  return (
    <div className="flex flex-col justify-center items-center px-5 py-[75px]">
      <div className="max-w-[856px] flex flex-col justify-center gap-[24px] mb-[62px] items-center">
        <h1>The Role of Media and Technology</h1>
        <p className="text-[#9397AD] md:text-center">
          Technology can play multiple roles in a collective impact effort.
           In some cases, it is the centerpiece of program design. In others,
            it plays a critical part in coordinating the efforts of
             the entire ecosystem. For example:
        </p>
      </div>
     
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[16px]">
        <div className=" bg-[#FFFF] p-0 rounded-md xl:h-[345px] min-h-[310px] h-fit drop-shadow">
          <div className="flex justify-center items-top p-[40px] rounded-md h-[100%] w-[100%] drop-shadow-card-2 text-[#fff]">
            <div className="w-full md:max-w-[252px] max-w-[100%]">
              <p className="text-[#585C7B]">
                Data infrastructure can support tracking of student participation across organizations, as well as profiles of students with relevant information about their skills, interests, and life circumstances that may impact their participation.
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-[#FF7000] p-0 rounded-md xl:h-[345px]  min-h-[310px] h-fit drop-shadow">
          <div className="flex justify-center items-top p-[40px] rounded-md h-[100%] w-[100%] drop-shadow-card-2 text-[#fff]">
            <div className="w-full md:max-w-[252px] max-w-[100%]">
              <p className="text-[#FFFF]">
                Data dashboards can provide snapshots of programs associated with particular organizations in the DigitalPipline.
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-[#FFFF] p-0 rounded-md xl:h-[345px]  min-h-[310px] h-fit  drop-shadow">
          <div className="flex justify-center items-top p-[40px] rounded-md h-[100%] w-[100%] drop-shadow-card-2 text-[#fff]">
            <div className="w-full md:max-w-[252px] max-w-[100%]">
              <p className="text-[#585C7B]">
                TKH utilizes a technology supported ‘leaderboard’ system both within individual programs as well as across them where students gain points for areas such as program attendance, project completion, and attendance at supplemental events (e.g. hackathons and job fairs).              
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-[#FF7000] p-0 rounded-md xl:h-[345px]  min-h-[310px] h-fit drop-shadow">
          <div className="flex justify-center items-top p-[40px] rounded-md h-[100%] w-[100%] drop-shadow-card-2 text-[#fff]">
            <div className="w-full md:max-w-[252px] max-w-[100%]">
              <p className="text-[#FFFF]">
                TKH is aiming to develop an integrated job board system where industry partners that are part of DigitalPipline can circulate postings for job descriptions.he system would also automatically pull relevant postings from major job sites like Monster and Indeed.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};