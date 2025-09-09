import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";

const PartnerCard = ({ partner }) => {
  const navigate = useNavigate();
  const link = `url('${program.banner_url}')`
  const sliceAtLastWord = (str) => {
    if (!str || str.trim() === "") {
      return "";
    }

    const lastSpaceIndex = str.lastIndexOf(" ");

    if (lastSpaceIndex === -1) {
      return str;
    }

    return str.slice(0, lastSpaceIndex);
  }

  const shorten = (str,num) => {
      if (str.length<=num){
        return str.replace(/<[^>]+>/g, '')
      }
      return str.replace(/<[^>]+>/g, '').slice(3,num) 
  }
  const prev = sliceAtLastWord(shorten(partner.description,200))+ '...' ;


 
  return (
    <div
      className="flex flex-row gap-[24px] items-start cursor-pointer"
      key={partner.event_id}
      onClick={() =>
          navigate(
            `/partners_page/partnerProfile/${partner.org_id}`
          )
        }
    >
      <div className="flex flex-col drop-shadow-card-2 bg-[#ffff] h-[500px] w-[30vw] rounded bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/image+(4).png')]">
        
      </div>


      <div className=" drop-shadow-card-2 bg-[#ffff]  h-[500px] rounded">  
        <div className="flex flex-col gap-2 p-5 ">
          <h3
            className="text-2xl lg:text-2xl tracking-tight font-semibold leading-tight cursor-pointer text-tkh-grayscale-9"
            onClick={() =>
              navigate(
                `/partners_page/partnerProfile/${partner.org_id}`
              )
            }
          >
            {partner.name}
          </h3>
          <p className=" break-word lg:text-md font-light tracking-tight  h-[88px] leading-tight text-tkh-grayscale-7">
            {prev}
          </p>
          <img
            src={partner.logo_url}
            alt=""
            className=" max-w-[30%] max-h-[30px]"
            
          />  
        </div>
      </div>
    </div>        
  );
};


export default PartnerCard;
