
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ partner }) => {
  const navigate = useNavigate();
  const link = `url('${partner?.banner_url}')`
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
      return str.replace(/<[>]+>/g, '').slice(3,num)
  }
  const prev = sliceAtLastWord(shorten(partner?.description,250)) + '...';
  const markup = { __html: prev };
  return (
    <div
      className="flex flex-col text-start drop-shadow bg-[#ffff] rounded items-start h-full  cursor-pointer"
      key={partner.event_id}
      onClick={() =>
          navigate(
            `/partners_page/partnerProfile/${partner?.org_id}`
          )
        }
    >
    <div className=" drop-shadow-card-2 bg-[#ffff] h-[100%] w-[100%] rounded">
      <div className=" h-[240px]  w-full " style={{"background":link,"backgroundRepeat":"no-repeat","backgroundPosition":"center","backgroundSize":"cover" }} />   
      <div className="flex flex-col gap-[2px] p-5">
        <h3
          className="text-2xl lg:text-2xl tracking-tight font-semibold leading-tight cursor-pointer text-tkh-grayscale-9"
          onClick={() =>
            navigate(
              `/partners_page/partnerProfile/${partner?.org_id}`
            )
          }
        >
          {partner.name}
        </h3>
        <div className="break-all lg:text-md font-light tracking-tight  h-[88px] leading-tight text-tkh-grayscale-7" >
          <div className="break-word" dangerouslySetInnerHTML={markup}/> 
          <a className="link text-sm  mt-2 font-bold underline text-tkh-brand-tangerine-2 hover:text-tkh-brand-tangerine-5 text-underline" onClick={() =>
              navigate(
                `/partners_page/partnerProfile/${partner?.org_id} `
              )
            }>
              Learn More
            </a>
        </div>
        <img
          src={partner?.logo_url}
          alt=""
          className=" w-[30%]"
          
        />
      </div>
    </div>
    </div>        
  );
};


export default CompanyCard;
