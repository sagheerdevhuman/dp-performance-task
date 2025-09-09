import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffects } from "react";
import { useParallax } from 'react-scroll-parallax';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

export const Hero = ({title,text,img,page,page2,btn_text,btn_text2,backgraound,logged_in,title2,hide_btn}) => {
  const navigate = useNavigate();

  const handleNavigation = (event,page) => {
    event.preventDefault();
    navigate(page);
  };
  const { ref } = useParallax({ speed: 10 });

  const social_media = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/tkh.org",
      icon: "https://d1yh21d3dzz97r.cloudfront.net/bxl-facebook-square.png"
    },  
    {
      name: "Twitter",
      url: "https://www.twitter.com/tkh.org",
      icon: "https://d1yh21d3dzz97r.cloudfront.net/X_logo_2023_%28white%29%201.png"
    },      
    {
      name: "Instagram",
      url: "https://www.instagram.com/tkh.org",
      icon: "https://d1yh21d3dzz97r.cloudfront.net/bxl-instagram.png"
    },            
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/tkh.org",
      icon: "https://d1yh21d3dzz97r.cloudfront.net/bxl-linkedin.png"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/tkh.org",
      icon: "https://d1yh21d3dzz97r.cloudfront.net/bxl-youtube.png"
    },
  ]
  

  return (
    



    <div className="flex flex-col h-[80vh] ">
      <Navbar />
        <div className={backgraound} >
          <div className=" h-full bg-gradient-to-r from-tkh-bg-0/[.55] to-tkh-bg-0/[.75]">
            <div ref={ref} className="flex flex-col justify-center items-center h-full text-center text-tkh-grayscale-0"> 
              <div className="flex flex-col justify-center items-center mb-[10vh]">           
                <img className="mb-4 md:max-w-[338px] max-h-[12vh] md:max-h-[15vh] max-w-[70vw] " src="https://dz55dwgyhzv2a.cloudfront.net/DP%20Digital%20Pipeline%20white.png" />
                <p className="text-4xl md:text-[72px] leading-tight mb-3 font-extrabold max-w-[70vw] ">{title}<br/>{title2}</p>
                <p className="mb-[36px] text-[20px] font-light md:w-[856px] max-w-[70vw]" >{text}</p>
                
                {logged_in !== "true"  && (

                  <div className="flex flex-col md:flex-row justify-center gap-5 md:max-w-[856px] max-w-[70vw]">
                    <button
                      className="py-2 w-[200px] px-4 rounded-md  drop-shadow-btn font-semibold border hover:bg-tkh-brand-tangerine-2 border-solid border-[#FF7000] hover:border-tkh-brand-tangerine-2"
                      onClick={(e) => handleNavigation(e,page)}
                    >
                      {btn_text}
                    </button>
                     <button
                      className="py-2 px-4 rounded-md  drop-shadow-card font-semibold bg-tkh-brand-tangerine-5 hover:bg-tkh-brand-tangerine-2 text-tkh-solid-0"
                      onClick={(e) => handleNavigation(e,page2)}
                    >
                      {btn_text2}
                    </button>
                  </div>

                )}
                {logged_in == "true" && hide_btn && (

                  <>      </>

                )}
                {logged_in == "true" && !hide_btn && (

                  <div className="flex flex-col md:flex-row justify-center gap-5 md:max-w-[856px] max-w-[70vw]">
                    <button
                      className="py-2 w-[200px] px-4 rounded-md drop-shadow-btn font-semibold border border-solid border-[#FF7000] hover:bg-tkh-brand-tangerine-2 hover:border-tkh-brand-tangerine-2 transition ease-in-out duration-900"
                      onClick={(e) => handleNavigation(e,"/programs")}
                    >
                      View Programs
                    </button>
                     <button
                      className="py-2 w-[200px] px-4 rounded-md  drop-shadow-card font-semibold bg-tkh-brand-tangerine-5 text-tkh-solid-0 hover:bg-tkh-brand-tangerine-2 transition ease-in-out duration-900"
                      onClick={(e) => handleNavigation(e,"/events")}
                    >
                      View Events
                    </button>
                  </div>

                )}

                
              </div>
              <div className="flex flex-row w-4/5 justify-between">
                <div className="flex flex-row justify-self-start gap-[8px]">
                  {social_media.map((item) => (
                    <div className={`flex justify-center items-center rounded-full p-2 h-[44px] w-[44px] hover:scale-110 transition ease-in-out duration-900 ${item.name === "YouTube" ? "bg-[#FFFF]" : "bg-[#FFFF]/[.05]"}`}>
                      <a href={item.url} key={item.name}>
                        <img src={item.icon} alt={item.name} />
                      </a>
                    </div>
                  ))}
                </div>  
                <div className="flex flex-row gap-[8px]">
                 
                    <div className="flex justify-center items-center ">
                      <a href="/programs"  className="flex flex-row gap-[8px] hover:text-tkh-brand-tangerine-2 hover:fill-tkh-brand-tangerine-2 text-tkh-grayscale-0 transition ease-in-out duration-900 fill-tkh-grayscale-0">
                        Training Programs
                        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                          <g opacity="0.85">
                          <path d="M13.9987 2.3252C7.5657 2.32636 2.33203 7.56003 2.33203 13.993C2.33203 20.426 7.5657 25.6597 13.9999 25.6597C20.4317 25.6597 25.6654 20.426 25.6665 13.993C25.6665 7.56003 20.4329 2.32636 13.9987 2.3252ZM13.9999 23.3264C8.85253 23.3264 4.66536 19.1392 4.66536 13.993C4.66536 8.84686 8.85253 4.6597 13.9987 4.65853C19.146 4.6597 23.3332 8.84686 23.3332 13.993C23.332 19.1392 19.1449 23.3264 13.9999 23.3264Z" />
                          <path d="M13.9987 12.8267H9.33203V15.1601H13.9987V18.6671L18.6712 13.9946L13.9987 9.32324V12.8267Z" />
                          </g>
                        </svg>

                      </a>
                    </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
    </div>
   
  );
}

