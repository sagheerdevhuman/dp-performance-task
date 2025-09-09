import tempImg from "../../assets/login_image.png";
import contactSvg from "../../assets/noun-contact-1745247.svg";
import websiteSvg from "../../assets/noun-website-3977699.svg";
import locationSvg from "../../assets/noun-location-5676857.svg";
import {Text} from "../utls/text";
import {Email} from "../utls/email";
import {Location} from "../utls/location";
import {Website} from "../utls/website";
import {Logo} from "../utls/logo"
import StaffList from "./OrgPageStaff";


export const OrgHeader = ({ partner, formData, handleSubmit, setFormData, admin, handleStaffFormRendering, staff,showStaff }) => {

    return (
      
      <div className=" grid md:grid-cols-2 grid-cols-1  bg-[#fff]   h-[613px] w-screen overflow-visible">
      <div className=" flex flex-col pl-6 pr-6 h-md pt-6 m-0 md:items-center md:pl-[72px] md:py-[72px] ">
        <div className="flex flex-col gap-[27px]">
          <div className="flex gap-3 items-center">
            {showStaff==true && (
              <StaffList
                handleStaffFormRendering={handleStaffFormRendering}
                staff={staff}
              /> 
            )}
          </div>
            <h1 className="text-[40px] max-w-[550px] tracking-tight cursor-pointer font-[600]  mb-3">
              {partner.name}
            </h1>
            <div className="flex flex-col gap-[27px] h-[155px] overflow-y-auto">
                <Text 
                  text={partner.description} 
                  formData={formData} 
                  handleSubmit={handleSubmit} 
                  setFormData={setFormData} 
                  admin={admin}
                  rich={true}
                  title="Description"
                  type="description"
                />
            </div>
            
            
            
            <div className="flex flex-row gap-[24px] items-center">
              <div className="flex flex-col w-fit h-[48px] gap-[24px]" onClick={() => window.open("https://"+partner.website, '_blank')}>
                <p className="text-[16px] font-[400]">{partner.website}</p>
              <Logo
                image={partner.logo_url} 
                formData={formData} 
                handleSubmit={handleSubmit} 
                setFormData={setFormData} 
                admin={admin}
              />
              </div>
            </div>
            
        </div>
      </div>
      <div className="  overflow-visible items-end md:items-start md:pr-[72px] p-0  md:pt-[72px] md:min-h-[690px]">
        <div className="bg-tkh-brand-tangerine-5 h-[636px] z-[20] w-[100vw] md:w-full md:min-h-[670px] z-10 md:max-w=[636px] md:rounded-[8px] bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/image%402x.png')]"/> 
      </div>
     
    </div>
         
        
    );
}

 {/* <div className="flex flex-col  justify-start lg:justify-evenly  items-top gap-12 lg:gap-0 lg:px-0 h-full lg:w-2/5  w-full">
            <Email
              email={partner.info_email}
              partner={partner} 
              formData={formData} 
              handleSubmit={handleSubmit} 
              setFormData={setFormData} 
              admin={admin}
            />
            <Website
              website={partner.website}
              partner={partner} 
              formData={formData} 
              handleSubmit={handleSubmit} 
              setFormData={setFormData} 
              admin={admin}
            />
            <Location
              location={partner.address + ", " + partner.zipcode}
              partner={partner}
              formData={formData} 
              handleSubmit={handleSubmit} 
              setFormData={setFormData} 
              admin={admin}
            />
          </div> */}