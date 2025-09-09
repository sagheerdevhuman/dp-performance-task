import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ft from "format-time";

export const SearchEventCard = ({ event}) => {
  const navigate = useNavigate();
  const link = `url('${event.banner_url}')`
  const shorten = (str,num) => {
      if (str.length<=num){
        return str.replace(/<[^>]+>/g, '')
      }
      return str.replace(/<[>]+>/g, '').slice(3,num) + '...'
  }
  const prev = shorten( event.description,200);
  const markup = { __html: prev };

  return (
    <div
      className="flex flex-col cursor-pointer lg:flex-row justify-center items-center gap-3 lg:gap-20 xl:gap-16 px-7 sm:px-24 lg:px-0 md:pb-10 lg:pb-0 lg:h-[50vh] lg:w-full"
      key={event.event_id}
      onClick={() =>
          navigate(
            `/event_details/${event.event_id}`
          )
        }
    >
    <div className=" drop-shadow-card-2 flex bg-[#ffff] h-[100%] w-[100%] rounded p-3">
      <div className=" h-[50vh]  w-[60%]" style={{"background":link,"backgroundRepeat":"no-repeat","backgroundPosition":"center","backgroundSize":"cover" }} />   
      <div className="flex flex-col gap-[8px] p-5 text-left">
        <h3
          className="text-2xl lg:text-2xl tracking-tight font-semibold leading-tight cursor-pointer text-tkh-grayscale-9"
          onClick={() =>
            navigate(
              `/event_details/${event.event_id}`
            )
          }
        >
          {event.name}
        </h3>
        
        <div className="break-word  lg:text-md font-light tracking-tight  leading-tight text-tkh-grayscale-7" >
          <div className="break-word mb-3" dangerouslySetInnerHTML={markup}/> 
          <a className="link text-sm  mt-2 font-bold underline text-tkh-brand-tangerine-2 hover:text-tkh-brand-tangerine-5 text-underline" onClick={() =>
              navigate(
                `/event_details/${event.event_id} `
              )
            }>
              Learn More
            </a>
        </div>
       
        <hr className="mt-[16px] border-[.5px] border-[#E2E5F1]"/>
        <ol className=" list-none list-inside">
        {event.event_days.map((day, key) => {

          return <li key={key}  className="text-tkh-grayscale-8">
            {moment(day.date).format("MMMM D, YYYY")}{" "}|{" "}
            {ft.getFormattedTime(day.start_time.replace(/(:\d{2}| [AP]M)$/, ""))}{" "}-{" "}
            {ft.getFormattedTime(day.end_time.replace(/(:\d{2}| [AP]M)$/, ""))}
          </li>
    
        })}
      </ol>
      </div>
    </div>
    </div>    
  );
};


