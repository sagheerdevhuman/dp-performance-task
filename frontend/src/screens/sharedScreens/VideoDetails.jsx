import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/FooterAlt";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoById } from "../../redux/videos/fetchVideoByIdSlice";
import { changeVideo } from "../../redux/videos/updateVideoSlice";
import { Hero } from "../../components/sharedComponents/HeroAlt";
import cookie from "js-cookie";
import { getVideoList } from "../../redux/videos/fetchAllVideosSlice";
import  {VideoDetailHeader}  from "../../components/sharedComponents/VideoDetaiHeader";



function VideoDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getVideo = useSelector((state) => state?.getVideoById);
  const [video, setVideo] = useState(null);
  const [admin, setAdmin] = useState();
  const [formData, setFormData] = useState();
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin");
  const isOrgAdmin = cookie.get("isOrgAdmin")
  const isOrgUser = cookie.get("isOrgUser")
  const logged_in = cookie.get("isLoggedIn")
  const orgId = cookie.get("orgId")
  const isUser = cookie.get("isUser")
  const userId = cookie.get("userId");
  const image = video?.image_url? video.image_url:"https://bxtp-static.s3.amazonaws.com/img/bg/bg_1.png"
  console.log(image)




  
  const backgraound = `flex-row  h-full bg-center bg-no-repeat bg-cover bg-[url('${image}')]`
  
  

  useEffect(() => {
    dispatch(getVideoById({ video_id: id }));
    dispatch(getVideoList());
  }, [dispatch, id]);


  console.log(userId)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changeVideo({
          video_id:formData.video_id,
          name: formData.name,
          link: formData.link,
          org_id: formData.org_id,
      })
    ).then((changeVideo)=>{
       window.location.reload(false);
    }) 
  };

  
 

  useEffect(() => {
    if (getVideo?.status == "success" ) {
      setVideo(getVideo?.videos);
      setFormData({
        video_id: getVideo?.videos.video_id,
        name: getVideo?.videos.name,
        link: getVideo?.videos.link,
      })
    }
  }, [getVideo]);

  if( video  && (isMetaAdmin=="true"||isBxdpAdmin=="true")){ return (
       <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1">
       <Hero 
            title="Digital Pipeline "
            title2="Video Library" 
            text="Set your tech career in motion. Let's get started."
            page=""
            page2=""
            btn_text="Register Now"
            btn_text2=""
            backgraound={video.image_url}
            logged_in={logged_in}
            hide_btn={true}
          /> 
          <VideoDetailHeader video={video} setVideo={setVideo} />
        {/*<OrgPrev org={program.organization}/> 
        <MorePrograms data={program} />*/}
        <Footer />
      </div>
    );
  }
  if(video  && (orgId==video.org_id) && (isOrgAdmin=="true" || isOrgUser=="true")){ return (
        <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1">
            
            <Hero 
            title="Digital Pipeline "
            title2="Video Library" 
            text="Set your tech career in motion. Let's get started."
            page="/user_registration"
            page2=""
            btn_text="Register Now"
            btn_text2=""
            backgraound={video.image_url}
            logged_in={logged_in}
            hide_btn={true}
            video={video}
            setText={setVideo}
            handleSubmit={handleSubmit}
            formData={formData} 
            setFormData={setFormData}
            admin={true}
          /> 
           <VideoDetailHeader video={video} setVideo={setVideo} />
        {/*<OrgPrev org={program.organization}/> 
        <MorePrograms data={program} />*/}
        <Footer />
      </div>
    );
  }
  if(video){
    return (
       <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1">
        <Hero 
            title="Digital Pipeline "
            title2="Video Library" 
            text="Set your tech career in motion. Let's get started."
            img={video.image_url?video.image_url:"https://bxtp-static.s3.amazonaws.com/img/bg/bg_1.png"}
            page="/user_registration"
            page2=""
            btn_text="Register Now"
            btn_text2=""
            backgraound={video.image_url}
            logged_in={logged_in}
            hide_btn={true}
          /> 
          <VideoDetailHeader video={video} setVideo={setVideo} />
        {/*<OrgPrev org={video.organization}/> 
        <MorePrograms data={video} />*/}
        <Footer />
      </div>
    );
  }
  
  
}

export default VideoDetails;
