import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import EventCard from"./EventCard"
import ProgramCard from "./ProgamCard"

const FeaturedCard = ({ data }) => {

  const navigate = useNavigate();

  console.log("data.data: ", data.data.id)
  if(data && data.data){
  return (

    <>
  	{data?.data?.type === "event" && (
         <EventCard event={data.data} id={data.data.id}/>
     )}
  	{data?.data?.type === "program" && (
      console.log("data.data.id: ", data.data.id),
         <ProgramCard program={data.data} id={data.data.id}/>
     )}
    
    </>

  );
  }
};


export default FeaturedCard;
