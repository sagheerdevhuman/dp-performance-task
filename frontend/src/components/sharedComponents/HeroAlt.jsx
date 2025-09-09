import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useParallax } from 'react-scroll-parallax';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import {Title} from "../utls/title";
import {Banner} from "../utls/banner"

export const Hero = ({title,backgraound,formData,handleSubmit,setFormData,admin}) => {
  const [image, setImage] = useState(backgraound);
  const [preview, setPreview] = useState(false);

  return (
      
    <div className="flex flex-col  md:max-h-[25vh] md:min-h-[500px]">
      <Navbar />

        <ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
          {preview == true &&(
            <ParallaxBannerLayer image={image} speed={-30} />
          )}
          {preview == false &&(
            <ParallaxBannerLayer image={backgraound} speed={-30} />
          )}

          
          <ParallaxBannerLayer >

          <div className=" h-full bg-gradient-to-r from-tkh-bg-0/[.55] to-tkh-bg-0/[.75] ">
            <div className="flex flex-col justify-center items-center h-full text-center text-tkh-grayscale-0"> 
              <div className="flex flex-col justify-center items-center p-5"> 
                <Title 
                  text={title}
                  formData={formData} 
                  handleSubmit={handleSubmit} 
                  setFormData={setFormData} 
                  admin={admin}
                />          
              </div>
              <div className="absolute bottom-5 right-5" >
                
                { admin == true &&(
                  <Banner handleSubmit={handleSubmit} image={image} formData={formData} setFormData={setFormData} setImage={setImage} setPreview={setPreview}/>
                )}
              </div>
            </div>
          </div>
          </ParallaxBannerLayer>
        </ParallaxBanner>
    </div>
   
  );
}

