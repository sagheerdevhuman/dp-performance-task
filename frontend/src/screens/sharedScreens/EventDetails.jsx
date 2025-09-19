import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/FooterAlt";
import { EventDetailHeader } from "../../components/sharedComponents/EventDetailHeader";
import { EventDetailBody } from "../../components/sharedComponents/EventDetailBody";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "../../redux/events/fetchEventByIdSlice";
import { changeEvent } from "../../redux/events/updateEventSlice";
import { Hero } from "../../components/sharedComponents/HeroAlt";
import { useNavigate } from "react-router-dom";
import { OrgPrev} from "../../components/sharedComponents/Org_prev"
import cookie from "js-cookie";
import { getAllActiveEvents } from "../../redux/events/fetchAllActiveEventsSlice";
import { MoreEvents } from '../../components/sharedComponents/MoreEvents'
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import { createTag } from "../../redux/events/newTagSlice";
import { AddTagModal } from "../../components/orgComponents/AddTagModal";

  

function EventDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getEvent = useSelector((state) => state?.getEventById);
  const activeEvents = useSelector((state) => state?.getAllActiveEvents?.event);
  const [event, setEvent] = useState();
  const [admin, setAdmin] = useState();
  const [days, setDays] = useState();
  const [formData, setFormData] = useState();
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin");
  const isOrgAdmin = cookie.get("isOrgAdmin")
  const isOrgUser = cookie.get("isOrgUser")
  const orgId = cookie.get("orgId")
  const isUser = cookie.get("isUser")
  const userId = cookie.get("userId");
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tag2, setTag2] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const tagList = useSelector((state) => state?.getAllTags);
  const [list, setList] = useState([]);
  const [modalTagRendered, isModalTagRendered] = useState(false);

  useEffect(() => {
    dispatch(getEventById({ event_id: id}));
    dispatch(getAllActiveEvents());
  }, []);
  


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changeEvent({
          event_id: formData.event_id,
          org_id: formData.org_id,
          name: formData.name,
          days:days,
          description: formData.description,
          location: formData.location,
          rsvp_link: formData.rsvp_link,
          is_virtual:formData.is_virtual,
          banner_url: formData.banner_url,
          user_id: userId,
      })
    ).then((changeEvent)=>{
       window.location.reload(false);
    })
  };
  


  useEffect(() => {
    if (getEvent?.status == "success" ) {
      setEvent(getEvent?.event);
      setDays(getEvent?.event.event_days);
      setFormData({
        event_id: getEvent?.event.event_id ,
        name: getEvent?.event.name,
        description: getEvent?.event.description,
        location: getEvent?.event.location,
        rsvp_link: getEvent?.event.rsvp_link,
        is_virtual: getEvent?.event.is_virtual,
        banner_url: getEvent?.event.banner_url,
        org_id: getEvent?.event.org_id
      })
    }
  }, [getEvent]);

  useEffect(() => {
    if (tagList?.status == "success") {
      getAllTags(tagList?.tags?.tags);
      setList(setOptions(tagList?.tags?.tags))


    }
  }, [tagList]);

  const setOptions = (allTags) => {
    return allTags.map((tag) => ({
      value: tag.tag_id,
      label: tag.name,
    }));
  };
  
  
 const [tagFormData, setTagFormData] = useState({
    name: "",
  });

  function handleTagFormRendering(event) {
    event.preventDefault();
    modalTagRendered ? isModalTagRendered(false) : isModalTagRendered(true);
  }

  function handleTagFormSubmit(event) {
    event.preventDefault();
    dispatch(
      createTag({
        name: tagFormData.name,
      })
    ).then((data) => {
      let arr = []
      allTags.map((x)=>{
        arr.push(x)
      })
      arr.push(data.payload.tag)
      // // const new_list = arr.push(data.payload.skill)
      setTagFormData({
        ...tagFormData,
        name: "",

      });
      setList(setOptions(arr))
      handleTagFormRendering(event)
    });
  }


    
    
  if(!event){
    return <></>
  }


  if(event && (isMetaAdmin=="true"||isBxdpAdmin=="true")){ return (
       <div className="flex flex-col justify-between  max-w-full w-full">
        <Hero 
          title={event.name}
          backgraound={event.banner_url}
          event={event} 
          admin={true}
          setText={setEvent} 
          handleSubmit={handleSubmit} 
          formData={formData}
          setFormData={setFormData}
 
        /> 
        <AddTagModal
          tagFormData={tagFormData}
          setTagFormData={setTagFormData}
          handleTagFormSubmit={handleTagFormSubmit}
          handleTagFormRendering={handleTagFormRendering}
          modalTagRendered={modalTagRendered}
          isModalTagRendered={isModalTagRendered}
        />   
        < EventDetailHeader 
          event={event} 
          setEvent={setEvent} 
          admin={true} 
          handleSubmit={handleSubmit} 
          days={days} 
          setDays={setDays}
          formData={formData}
          setFormData={setFormData}
          handleTagFormRendering={handleTagFormRendering}
          list={list}
          setList={setList}
          setOptions={setOptions} 
        />
          < OrgPrev org={event.organization}/> 
          <MoreEvents data={event}/>
        {/* <Footer /> the footer has to be added in global main layout  */}
      </div>
    );
  }
  if(event && (orgId==event.org_id) && (isOrgAdmin=="true"||isOrgUser=="true")){ return (
       <div className="flex flex-col justify-between  max-w-full w-full">
        <Hero 
          title={event.name}
          backgraound={event.banner_url}
          event={event} 
          setText={setEvent} 
          admin={true} 
          handleSubmit={handleSubmit} 
          formData={formData}
          setFormData={setFormData}
        />    
        <EventDetailHeader 
          event={event} 
          setEvent={setEvent} 
          admin={true} 
          handleSubmit={handleSubmit} 
          days={days} 
          setDays={setDays}
          formData={formData}
          setFormData={setFormData}
          handleTagFormRendering={handleTagFormRendering}
          list={list}
          setList={setList}
          setOptions={setOptions} 
        />
          <OrgPrev org={event.organization}/>   
          <MoreEvents data={event}/>
        {/* <Footer /> the footer has to be added in global main layout  */}
      </div>
    );
  }
  if(event){
    return (
       <div className="flex flex-col justify-between  max-w-full w-[100vw]">
        <Hero 
          title={event.name}
          backgraound={event.banner_url}
          event={event} 
          setText={setEvent} 
          handleSubmit={handleSubmit} 
          formData={formData}
          admin={false} 
          setFormData={setFormData}
        />    
        <EventDetailHeader 
          event={event} 
          setEvent={setEvent} 
          admin={false} 
          handleSubmit={handleSubmit} 
          days={days} 
          setDays={setDays}
          formData={formData}
          setFormData={setFormData}
          handleTagFormRendering={handleTagFormRendering}
          list={list}
          setList={setList}
          setOptions={setOptions} 
        />
        <OrgPrev org={event.organization}/> 
        
        <MoreEvents data={event}/>
        {/* <Footer /> the footer has to be added in global main layout  */}
      </div>
    );
  }
  
}

export default EventDetailPage;
