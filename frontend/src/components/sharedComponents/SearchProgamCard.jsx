import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ft from "format-time";

export const SearchProgamCard = ({ program }) => {
  const navigate = useNavigate();
  const link = `url('${program.banner_url}')`
  const shorten = (str,num) => {
      if (str.length<=num){
        return str.replace(/<[^>]+>/g, '')
      }
      return str.replace(/<[^>]+>/g, '').slice(3,num) + '...'
  }
  const prev = shorten(program.description,200);
const markup = { __html: prev };

  return (
    <div
      key={program.program_id}
      className=" cursor-pointer flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-20 xl:gap-16 px-7 sm:px-24 lg:px-0 md:pb-10 lg:pb-0 lg:w-full"
      onClick={() =>
          navigate(
            `/program_details/${program.program_id}`
          )
        }
    >
      <div className=" drop-shadow-card-2  flex bg-[#ffff] h-[100%] w-[100%] rounded p-3">
        <div className=" h-[50vh]  w-[50vw] " style={{"background":link,"backgroundRepeat":"no-repeat","backgroundPosition":"center","backgroundSize":"cover" }} />   
        <div className="flex flex-col gap-[8px] p-5 text-left">
          <h3
            className="text-2xl lg:text-2xl tracking-tight font-semibold leading-tight cursor-pointer text-tkh-grayscale-9"
            onClick={() =>
              navigate(
                `/program_details/${program.program_id}`
              )
            }
          >
            {program.name}
          </h3>
          
          <div className=" break-word lg:text-md font-light tracking-tight leading-tight text-tkh-grayscale-7">
            <div className="break-word mb-3" dangerouslySetInnerHTML={markup}/> 
            <a className="link text-sm  mt-2 font-bold underline text-tkh-brand-tangerine-2 hover:text-tkh-brand-tangerine-5 text-underline" onClick={() =>
              navigate(
                `/program_details/${program.program_id}`
              )
            }>
              Learn More
            </a>
          </div>
          
          <ol className=" list-none list-inside text-tkh-grayscale-9">
            
            <li>{moment(program.start_date).format("MMM D, YYYY")}{""} - {moment(program.end_date).format("MMM D, YYYY")}{""}</li>
            <li>{ft.getFormattedTime(program.start_time.replace(/(:\d{2}| [AP]M)$/, ""))} - {ft.getFormattedTime(program.end_time.replace(/(:\d{2}| [AP]M)$/, ""))}</li> 
            <li>{program.week_days[0]}{" "}{program.week_days[1]}{" "}{program.week_days[2]}{" "}{program.week_days[3]}{" "}{program.week_days[4]}{" "}{program.week_days[5]}{" "}{program.week_days[6]}</li>
          </ol>
        </div>
      </div>
    </div>     
  );
};

