import Footer from "../../components/sharedComponents/Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventsHeader } from "../../components/sharedComponents/EventsHeader";
import { FeaturedEvents } from "../../components/sharedComponents/FeaturedEvents";
import { EventsResults } from "../../components/sharedComponents/EventsResults";
import { EventSearch } from "../../components/sharedComponents/EventSearch";
import { getAllActiveEvents } from "../../redux/events/fetchAllActiveEventsSlice";
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import { getQualifiedEvents } from "../../redux/events/qualifiedEventsSlice";
import { getRecommendedEvents } from "../../redux/events/fetchRecommendedEventsSlice";
import { Hero } from "../../components/sharedComponents/Hero";
import cookie from "js-cookie";
import axios from "axios";



function EventsPage() {
  const dispatch = useDispatch();
  const activeEvents = useSelector((state) => state?.getAllActiveEvents?.event);
  const user_id = cookie.get("userId");
  const qualifiedEvents = useSelector((state) => state?.getQualifiedEvents?.events?.qualified_events);
  const recommendedEvents = useSelector((state) => state?.getRecommendedEvents?.recommendedEvents?.recommended_events);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterdTags, setFilterdTags] = useState([]);
  const tagList = useSelector((state) => state?.getAllTags);
  const logged_in = cookie.get('isLoggedIn')
  
  useEffect(() => {

    dispatch(getAllTags());
    dispatch(getQualifiedEvents({user_id}));
    dispatch(getRecommendedEvents({user_id}));
  }, []);

  useEffect(() => {
    if (tagList?.status == "success") {
      setTags(tagList?.tags?.tags);
    }
  }, [ tagList]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentSearchTerm !== ""|| filterdTags==null) {
      setIsSearchSubmitted(true);
      filterEvents(currentSearchTerm);
    }
    if (currentSearchTerm !== ""&& filterdTags.length > 0) {
      setIsSearchSubmitted(true);
      filterEventsTag(currentSearchTerm);
    }
    if (currentSearchTerm == "" && filterdTags.length > 0) {
      setIsSearchSubmitted(true);
      tagFilter()
    }
  };

  const filterEvents = (searchTerm) => {
    let tempArr = [];
    const events = qualifiedEvents.filter((e) => {
      if (e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempArr.push(e);
      } else if ( e.description.toLowerCase().includes(searchTerm.toLowerCase())){
        tempArr.push(e);
      }
    });
    return setFilteredEvents(tempArr);
  };

  const filterEventsTag= (searchTerm) => {
    let data = filterdTags.map(e=> e.label).toString()
    let tempArr = [];
    const events = qualifiedEvents.filter((e) => {
      if (e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempArr.push(e);
      }else if ( e.description.toLowerCase().includes(searchTerm.toLowerCase())){
        tempArr.push(e);
      }
    });
    const eventBySkill = tempArr
      .filter((event) => !!event.tags
      .map(e => e.name).toString()
      .includes(data)
    )

    return setFilteredEvents(eventBySkill);
  };

  const tagFilter = async () => {
    let tags = filterdTags.map(e=> e.value)
    console.log(tags)
    const res =  await axios({
      method: "POST",
      data: {
        tags:tags,
      },
      url:`${import.meta.env.VITE_BXDP_PROD_SERVER}/events/by_tag`,
    }).then((res) => {
      console.log(res)
      return setFilteredEvents(res.data);
    });
    
  };


  const backgraound = `flex-row  h-full bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/bg/bg_4.png')]`

  return (
    <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-solid-0">
     
      <Hero 
        title="Community Events" 
        text="Discover local events that spark your curiosity, grow your community, and expand your career opportunities."
        img="https://as1.ftcdn.net/v2/jpg/03/01/24/58/1000_F_301245840_zwJpFB1MCmJkTg1tMDK9pFnCwce6dQ1T.jpg"
        page="/user_registration"
        page2="/org_user_registration"
        btn_text="Join as a Member"
        btn_text2="Join as a Organization"
        backgraound={backgraound}
        logged_in={logged_in}
      /> 
      
      <FeaturedEvents activeEvents={recommendedEvents} />
      {/* {isSearchSubmitted ? renderSearchResults() : null} */}
      <EventsHeader
        currentSearchTerm={currentSearchTerm}
        setCurrentSearchTerm={setCurrentSearchTerm}
        handleSubmit={handleSubmit}
        tags={tags}
        setTags={setTags}
        filterdTags={filterdTags}
        setFilterdTags={setFilterdTags}
      />
      
      <EventSearch events={isSearchSubmitted ? filteredEvents : qualifiedEvents}/>
      
      <Footer />
    </div>
  );
}

export default EventsPage;
