import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VideoResults } from "../../components/sharedComponents/VideoResults";
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import { Hero } from "../../components/sharedComponents/Hero";
import { getVideoList } from "../../redux/videos/fetchAllVideosSlice";
import cookie from "js-cookie";
import { VideosHeader } from "../../components/sharedComponents/VideosHeader";
import { VideoSearch } from "../../components/sharedComponents/VideoSearch";
import axios from "axios";

function VideosPage() {
  const dispatch = useDispatch();
  const videosList = useSelector((state) => state?.getAllVideos.userList);
  const userToken = cookie.get("userToken");
  const user_id = cookie.get("userId");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState(videosList);
  const [tags, setTags] = useState([]);
  const [filterdTags, setFilterdTags] = useState([]);
  const tagList = useSelector((state) => state?.getAllTags);
  const logged_in = cookie.get('isLoggedIn')
  

  useEffect(() => {
    dispatch(getVideoList({ userToken }));
    dispatch(getAllTags());
  }, []);
  console.log(videosList)

  useEffect(() => {
    if (tagList?.status == "success") {
      setTags(tagList?.tags?.tags);
    }
  }, [ tagList]);

  const renderSearchResults = () => {
    return (
      <VideoResults
        filteredVideos={filteredVideos}
        currentSearchTerm={currentSearchTerm}
        setCurrentSearchTerm={setCurrentSearchTerm}
      />
    );
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSearchTerm !== ""|| filterdTags==null) {
      setIsSearchSubmitted(true);
      filterVideos(currentSearchTerm);
    }
    if (currentSearchTerm !== ""&& filterdTags.length > 0) {
      setIsSearchSubmitted(true);
      filterVideosTag(currentSearchTerm);
    }
    if (currentSearchTerm == "" && filterdTags.length > 0) {
      setIsSearchSubmitted(true);
      tagFilter()
    }
  };

  const filterVideos = (searchTerm) => {
    let tempArr = [];
    const videos = videosList?.filter((e) => {
      if (e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempArr.push(e);
      } else if (e.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempArr.push(e);
      }
    });

    return setFilteredVideos(tempArr);
  };

  const filterVideosTag= (searchTerm) => {
    let data = filterdTags.map(e=> e.label).toString()
    let tempArr = [];
    const videos = videosList.filter((e) => {
      if (e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempArr.push(e);
      } else if (e.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempArr.push(e);
      }
    });
    const videoBySkill = tempArr
      .filter((video) => !!video.tags
      .map(e => e.name).toString()
      .includes(data)
    )

    return setFilteredVideos(videoBySkill);
  };      

  const tagFilter = async () => {
    let tags = filterdTags.map(e=> e.value)
    const res =  await axios({
      method: "POST",
      data: {
        tags:tags,
      },
      url:`${import.meta.env.VITE_BXDP_PROD_SERVER}/videos/by_tag`,
    }).then((res) => {
      return setFilteredVideos(res.data);
    });
    
  };

  const backgraound = `flex-row  h-full bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/bg/bg_5.png')]`
  
  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Hero 
        title="Videos" 
        text="Browse educational videos across our partnerships"
        img="https://as1.ftcdn.net/v2/jpg/03/01/24/58/1000_F_301245840_zwJpFB1MCmJkTg1tMDK9pFnCwce6dQ1T.jpg"
        page="/user_registration"
        page2="/org_user_registration"
        btn_text="Join as a Member"
        btn_text2="Join as a Organization"
        backgraound={backgraound}
        logged_in={logged_in}
      /> 
      
     {/* <FeaturedVideos activeVideos={qualifiedVideos} /> */}
     <VideosHeader
        currentSearchTerm={currentSearchTerm}
        setCurrentSearchTerm={setCurrentSearchTerm}
        handleSubmit={handleSubmit}
        tags={tags}
        setTags={setTags}
        filterdTags={filterdTags}
        setFilterdTags={setFilterdTags}
      />
      <VideoSearch videos={isSearchSubmitted ? filteredVideos : videosList}/>
      
      {/* <Footer /> the footer has to be added in global main layout  */}
    </div>
  );
}

export default VideosPage;
