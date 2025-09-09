import { newApplicant } from "../../redux/programs/applySlice";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie";

export const Apply = ({id, program}) => {
  if ( program && program.length !== 0 ){
    const dispatch = useDispatch();
    const programId = program.program_id
    const userId = cookie.get("userId");
    const is_student = cookie.get("isUser")
    const link = program.video_call_link
    const [ applied ] = program.applicants.map(x=>{
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
    const handleApply = (e, programId, userId,link) => {
      e.preventDefault();
      dispatch(newApplicant({ program_id: programId ,user_id: userId })).then(() => {
        window.open( link,'_blank')
      })
        
    };

    return (
      <>

        {(is_student === "true")&&( applied === false || applied === undefined) && (
            <button onClick={(e) => handleApply(e, userId,programId,linkHelp(link))} className="h-[52px] w-[155px] border-0 rounded-md bg-tkh-brand-tangerine-5 
            drop-shadow-btn text-center text-tkh-grayscale-0 font-bold">
              Apply! 
            </button>
        )}{(is_student === "true")&&( applied === true) && (
            <button onClick={(e) => window.open( linkHelp(link),'_blank') } className="h-[52px] w-[155px] border-0 rounded-md bg-tkh-brand-tangerine-5 
            drop-shadow-btn text-center text-tkh-grayscale-0 font-bold">
              Applied
            </button>
        )}{is_student === "false" && (
            <button onClick={ () => window.open( linkHelp(link),'_blank') } className="h-[52px] w-[155px] border-0 rounded-md bg-tkh-brand-tangerine-5 
            drop-shadow-btn text-center text-tkh-grayscale-0 font-bold">
              Apply Link
            </button>
        )}
      </>
    );

  }
};
