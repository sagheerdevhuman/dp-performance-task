import { newRSVP } from "../../redux/events/rsvpSlice";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie";
  
export const RSVP = ({ id, event }) => {
  if ( event && event.length !== 0 ){
    const dispatch = useDispatch();
    const eventId = event.event_id
    const userId = cookie.get("userId");
    const is_student = cookie.get("isUser")
    const link = `https://${event.rsvp_link}`
    const [ attending ] = event.rsvps.map(x=>{
      if(x.user_id == userId)
        return true
      return false
    })
    const linkHelp = (link) => {
      if(link.startsWith("http") ==true ){
        return link
      } else{
        return `https://${link}`
      }

    };

    const handleApproval = (e, userId, eventId ,link) => {
      e.preventDefault();
      dispatch(newRSVP({ event_id: eventId ,user_id: userId })).then(() => {
        window.open( linkHelp(link),'_blank')
      });
    };


    return (
      <>
        {(is_student === "true")&&( attending === false || attending === undefined) && (
          <button onClick={(e) => handleApproval(e, userId,eventId, event.rsvp_link)} className="h-[52px] w-[155px] border-0 rounded-md bg-tkh-brand-tangerine-5 
            drop-shadow-btn text-center text-tkh-grayscale-0 font-bold">
            RSVP!
          </button>
        )}{(is_student === "true")&&( attending === true) && (
          <a >
          <button disabled onClick={ () => window.open( linkHelp(event.rsvp_link),'_blank') }type="button"  className="h-[52px] w-[155px] border-0 rounded-md bg-tkh-brand-tangerine-5 
            drop-shadow-btn text-center text-tkh-grayscale-0 font-bold">
            Attending Event 
          </button>
          </a>
        )}{is_student === "false" && (
    
          <button onClick={ () => window.open( linkHelp(event.rsvp_link),'_blank') } type="button" className="h-[52px] w-[155px] border-0 rounded-md bg-tkh-brand-tangerine-5 
            drop-shadow-btn text-center text-tkh-grayscale-0 font-bold">
            Apply Link
          </button>
        
        )}
      </>
    );
  }
};
