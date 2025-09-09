import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ft from "format-time";

const ProgramCard = ({ program,id }) => {

  const navigate = useNavigate();
  const link = `url('${program?.banner_url}')`
  const shorten = (str,num) => {
      if (str.length<=num){
        return str.replace(/<[^>]+>/g, '')
      }
      return str.slice(0,num) + '...'
  }
  const prev = shorten(program?.description,150);
  const markup = { __html: prev };

  return (
    <a href={`/program_details/${id?id:program?.program_id}`}>
    <div
      className="flex flex-col text-start  drop-shadow bg-[#ffff] rounded items-start h-full  cursor-pointer"
      key={id?id:program?.program_id}
    >
      <div className=" drop-shadow-card-2 bg-[#ffff] h-[100%] w-[100%] rounded">
        <div className=" h-[240px]  w-full " style={{"background":link,"backgroundRepeat":"no-repeat","backgroundPosition":"center","backgroundSize":"cover" }} />   
        <div className="flex flex-col gap-[8px] p-5 ">
          <h3
            className="text-2xl lg:text-2xl tracking-tight font-semibold leading-tight cursor-pointer text-tkh-grayscale-9"
          >
            {program?.name}
          </h3>
          
          <div className=" break-word lg:text-md font-light tracking-tight  h-[88px] leading-tight text-tkh-grayscale-7">
            <div className="break-word" dangerouslySetInnerHTML={markup}/> 
            <a href={`/program_details/${id?id:program?.program_id}`} className="link text-sm  mt-2 font-bold underline text-tkh-brand-tangerine-2 hover:text-tkh-brand-tangerine-5 text-underline">
              Learn More
            </a>
          </div>
          
          <ol className=" list-none list-inside text-tkh-grayscale-9">
            <hr className="mt-[16px] mb-2 border-[.5px] border-[#E2E5F1] text-tkh-grayscale-9"/>
            <li>{moment(program?.start_date).format("MMM Do YYYY")}{""} - {moment(program?.end_date).format("MMM Do YYYY")}{""}</li>
            <li>{ft.getFormattedTime(program?.start_time.replace(/(:\d{2}| [AP]M)$/, ""))} - {ft.getFormattedTime(program?.end_time.replace(/(:\d{2}| [AP]M)$/, ""))}</li> 
            <li>{program?.week_days[0]} {program?.week_days[1]} {program?.week_days[2]} {program?.week_days[3]} {program?.week_days[4]} {program?.week_days[5]} {program?.week_days[6]}</li>
          </ol>
        </div>
      </div>
    </div> 
    </a>    

  );
};

export default ProgramCard;
