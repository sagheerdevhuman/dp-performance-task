import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ft from "format-time";

const EventCard = ({ event,id}) => {
  const navigate = useNavigate();
  const link = `url('${event?.banner_url}')`
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
  const prev = sliceAtLastWord(shorten( event?.description,200))+ '...';
  const markup = { __html: prev };



  return (
    <a href={`/event_details/${id?id:event?.event_id}`}>
    <div
      className="flex flex-col text-start drop-shadow bg-[#ffff] rounded items-start h-full  cursor-pointer"
      key={id?id:event.event_id}  
    >
    <div className=" drop-shadow-card-2 bg-[#ffff] h-[100%] w-[100%] rounded">
      <div className=" h-[240px]  w-full " style={{"background":link,"backgroundRepeat":"no-repeat","backgroundPosition":"center","backgroundSize":"cover" }} />   
      <div className="flex flex-col gap-[8px] p-5 ">
        <h3
          className="text-2xl lg:text-2xl tracking-tight font-semibold leading-tight cursor-pointer text-tkh-grayscale-9"
        >
          {event?.name}
        </h3>
        
        <div className="break-word  lg:text-md font-light tracking-tight  min-h-[88px] leading-tight text-tkh-grayscale-7" >
          <div className="break-word" dangerouslySetInnerHTML={markup}/> 
          <a href={`/event_details/${id?id:event?.event_id} `} className="link text-sm  mt-2 font-bold underline text-tkh-brand-tangerine-2 hover:text-tkh-brand-tangerine-5 text-underline" >
              Learn More
            </a>
        </div>
       
        <hr className="mt-[16px] border-[.5px] border-[#E2E5F1]"/>
        <ol className=" list-none list-inside ">
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
    </a>    
  );
};


export default EventCard;
