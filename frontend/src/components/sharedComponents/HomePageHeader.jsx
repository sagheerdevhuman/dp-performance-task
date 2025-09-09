import React from "react";

import { useNavigate } from "react-router-dom";


export const HomePageHeader = () => {
  const navigate = useNavigate();

  const handleNavigation = (event,page) => {
    event.preventDefault();
    navigate(page);
  };

  const whatWeDo = [
    { 
      whatWeDoTitle: "WE EDUCATE ",
      whatWeDoSVG:
      <svg width="46" height="51" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.2773 31.5977L23 40.875L13.625 31.5977C6.69141 31.8906 1.125 37.6523 1.125 44.6836V45.5625C1.125 48.1992 3.17578 50.25 5.8125 50.25H40.1875C42.7266 50.25 44.875 48.1992 44.875 45.5625V44.6836C44.875 37.6523 39.2109 31.8906 32.2773 31.5977ZM2.39453 8.0625L3.07812 8.25781V13.9219C2.39453 14.3125 1.90625 15.0938 1.90625 15.875C1.90625 16.7539 2.29688 17.4375 2.98047 17.8281L1.41797 23.8828C1.22266 24.5664 1.61328 25.25 2.19922 25.25H6.20312C6.78906 25.25 7.17969 24.5664 6.98438 23.8828L5.42188 17.8281C6.10547 17.4375 6.59375 16.7539 6.59375 15.875C6.59375 15.0938 6.10547 14.3125 5.42188 13.9219V8.84375L11.8672 10.3086C10.9883 12.0664 10.5 13.9219 10.5 15.875C10.5 22.8086 16.0664 28.375 23 28.375C29.8359 28.375 35.5 22.8086 35.5 15.875C35.5 13.9219 34.9141 12.0664 34.1328 10.3086L43.5078 8.0625C45.2656 7.67188 45.2656 5.42578 43.5078 5.03516L24.8555 0.542969C23.5859 0.25 22.3164 0.25 21.0469 0.542969L2.39453 5.03516C0.636719 5.42578 0.636719 7.67188 2.39453 8.0625Z" fill="#FF7000"/>
      </svg>
      ,
    },
    {
      whatWeDoTitle: "WE EMPOWER",
      whatWeDoSVG:
      <svg width="38" height="51" viewBox="0 0 38 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.1523 15.875V1.8125C25.1523 1.03125 24.4688 0.25 23.5898 0.25H20.4648C19.6836 0.25 18.9023 1.03125 18.9023 1.8125V16.168C19.4883 16.0703 19.9766 15.875 20.4648 15.875H25.1523ZM37.6523 25.25C37.6523 21.832 34.918 19 31.4023 19H20.4648C19.6836 19 18.9023 19.7812 18.9023 20.5625V20.6602C18.9023 23.1992 21.0508 25.25 23.5898 25.25H27.0078C27.9844 25.25 28.2773 25.6406 28.2773 26.0312V27.6914C28.2773 28.082 27.9844 28.375 27.5938 28.4727C23.1992 28.668 21.2461 30.8164 18.2188 35.5039L17.5352 36.4805C17.4375 36.6758 17.1445 36.7734 16.9492 36.7734C16.7539 36.7734 16.5586 36.7734 16.4609 36.6758L15.1914 35.7969C14.9961 35.6992 14.8008 35.4062 14.8008 35.1133C14.8008 35.0156 14.8984 34.8203 14.9961 34.7227L15.582 33.7461C17.1445 31.5 18.5117 29.5469 20.1719 28.082C18.5117 27.5938 17.1445 26.3242 16.3633 24.7617C15.7773 25.0547 14.9961 25.25 14.3125 25.25H11.1875C9.91797 25.25 8.84375 24.8594 8.0625 24.0781C7.18359 24.8594 6.10938 25.25 4.9375 25.25H1.8125C1.22656 25.25 0.738281 25.1523 0.25 25.0547V32.5742C0.25 35.8945 1.51953 39.1172 3.86328 41.4609L6.40234 44V50.25H31.4023V44.0977L34.918 40.582C36.6758 38.8242 37.75 36.4805 37.75 33.9414L37.6523 25.25ZM34.5273 16.4609V4.9375C34.5273 4.15625 33.8438 3.375 32.9648 3.375H29.8398C29.0586 3.375 28.2773 4.15625 28.2773 4.9375V15.875H31.4023C32.5742 15.875 33.5508 16.168 34.5273 16.4609ZM1.8125 22.125H4.9375C5.71875 22.125 6.5 21.4414 6.5 20.5625V8.0625C6.5 7.28125 5.71875 6.5 4.9375 6.5H1.8125C0.933594 6.5 0.25 7.28125 0.25 8.0625V20.5625C0.25 21.4414 0.933594 22.125 1.8125 22.125ZM11.0898 22.125H14.2148C15.0938 22.125 15.7773 21.4414 15.7773 20.5625V4.9375C15.7773 4.15625 15.0938 3.375 14.2148 3.375H11.0898C10.3086 3.375 9.52734 4.15625 9.52734 4.9375V20.5625C9.52734 21.4414 10.3086 22.125 11.0898 22.125Z" fill="#FF7000"/>
      </svg>,
    },
    {
      whatWeDoTitle: "WE SERVE",
      whatWeDoSVG:
      <svg width="59" height="42" viewBox="0 0 59 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.9375 18.4375C12.1504 18.4375 14.8125 15.8672 14.8125 12.5625C14.8125 9.34961 12.1504 6.6875 8.9375 6.6875C5.63281 6.6875 3.0625 9.34961 3.0625 12.5625C3.0625 15.8672 5.63281 18.4375 8.9375 18.4375ZM50.0625 18.4375C53.2754 18.4375 55.9375 15.8672 55.9375 12.5625C55.9375 9.34961 53.2754 6.6875 50.0625 6.6875C46.7578 6.6875 44.1875 9.34961 44.1875 12.5625C44.1875 15.8672 46.7578 18.4375 50.0625 18.4375ZM53 21.375H47.125C45.4727 21.375 44.0039 22.1094 42.9023 23.1191C46.666 25.1387 49.2363 28.8105 49.8789 33.125H55.9375C57.498 33.125 58.875 31.8398 58.875 30.1875V27.25C58.875 24.0371 56.2129 21.375 53 21.375ZM29.5 21.375C35.0996 21.375 39.7812 16.7852 39.7812 11.0938C39.7812 5.49414 35.0996 0.8125 29.5 0.8125C23.8086 0.8125 19.2188 5.49414 19.2188 11.0938C19.2188 16.7852 23.8086 21.375 29.5 21.375ZM36.4766 24.3125H35.7422C33.8145 25.2305 31.7031 25.7812 29.5 25.7812C27.2051 25.7812 25.0938 25.2305 23.166 24.3125H22.4316C16.5566 24.3125 11.875 29.0859 11.875 34.9609V37.5312C11.875 40.0098 13.8027 41.9375 16.2812 41.9375H42.7188C45.1055 41.9375 47.125 40.0098 47.125 37.5312V34.9609C47.125 29.0859 42.3516 24.3125 36.4766 24.3125ZM16.0059 23.1191C14.9043 22.1094 13.4355 21.375 11.875 21.375H6C2.69531 21.375 0.125 24.0371 0.125 27.25V30.1875C0.125 31.8398 1.41016 33.125 3.0625 33.125H9.0293C9.67188 28.8105 12.2422 25.1387 16.0059 23.1191Z" fill="#FF7000"/>
      </svg>,
    },
  ];
  return (
    <div className=" grid md:grid-cols-2 grid-cols-1  bg-[#fff]  h-fit w-screen">
      <div className=" flex flex-col pl-6 pr-6 h-md pt-6 m-0 md:items-center md:pl-[72px] md:py-[72px] ">
        <div className="flex flex-col gap-[27px]  ">
          <h1 className="text-[40px] max-w-[550px] tracking-tight cursor-pointer font-[600]  mb-3">
            Closing the <span className="text-tkh-brand-tangerine-5">Digital Divide</span>, one partner at a time.
            </h1>
            <p className=" text-[18px] max-w-[526px] mb-3">
            The Digital Pipeline is a network of 12 technology training programs, community colleges, universities, and community-based organizations committed to preparing New York job seekers for emerging. The partnership was launched by The Knowledge House in 2018 as the Bronx Digital Pipeline to support Bronx-based technologists.
            </p>
            <button
              className="py-[13px] px-4 mb-3 rounded h-[75px] md:h-[52px] max-w-[388px] drop-shadow-btn font-semibold bg-tkh-brand-tangerine-5 text-tkh-solid-0 hover:bg-tkh-brand-tangerine-2 transition ease-in-out   duration-900"
              onClick={(e) => handleNavigation(e,"/user_registration")}
            >
              Check out the Programs Our Partners Provide
            </button>
            <div className="flex flex-row gap-[24px] mb-[40px]">
                {whatWeDo.map((item, index) => (
                <div className="flex flex-col items-center justify-between gap-[16px] ">
                    <h1 className="text-[16px] font-[700]">{item.whatWeDoTitle}</h1>
                    <div className="flex flex-row">

                        <div key={index}>{item.whatWeDoSVG}</div>
                        
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>
      <div className="   items-end md:items-start md:pr-[72px] p-0  md:pt-[72px] ">
        <div className="bg-tkh-brand-tangerine-5 h-[300px]  w-[100vw] md:w-full md:min-h-[670px]  md:max-w=[636px] md:rounded-[8px] bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/image%20%284%29.png')]"/> 
      </div>
      {/* <div className="flex flex-row bg-tkh-grayscale-11 h-[83px] z-[-1] w-screen"></div> */}
      
    </div>
  );
};
