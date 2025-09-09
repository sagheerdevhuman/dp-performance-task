import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Confirm} from "../utls/confirm";
import { removeVideo } from "../../redux/videos/deleteVideoSlice";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

import cookie from "js-cookie";



function RequestedVideosList({approved,rejected,videos,setVideos,meta,reload,archived, handleRejectFormRendering, setRejectData, rejectData, handleEditVideoFormRendering } ) {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const org_id = cookie.get("orgId");
  const [modalRendered, setModalRendered] = useState(false);
  const [data, setData] = useState(null);

  const handleConfirmRendering = (e,video) => {
    e.preventDefault();
    setData(video)
    modalRendered? setModalRendered(false) : setModalRendered(true)
  };
  const title ="Delete Video"
  const text =`Are You sure you want to delete This video. You cannot be undo this Action`
  const btn_text = "Confirm"


  const navigate = useNavigate();
  const handleNavigation = (event,id) => {
    event.preventDefault();
    const link = `/video_details/${id}`
    navigate(link)
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeVideo({ video_id: data.video_id })).then(() => {
      window.location.reload()
    });
  };
  
  return(
    <>
    <Confirm modalRendered={modalRendered} handleAction={handleDelete} handleConfirmRendering={handleConfirmRendering} title={title} text={text} btn_text={btn_text}  data={data}/>
    
    <tbody className="">
      {videos.length <= 0 &&(
        <>
        <p className="p-5">no videos</p>
        </>
      )}
      {videos.map((video) => (
        <tr
          key={video.id}
          className="
            cursor-pointer 
            transition ease-in-out 
            p-6
            duration-900
            border-y
            border-tkh-grayscale-3
            rounded-md text-tkh-grayscale-10 
            hover:bg-tkh-brand-tangerine-1 
          "
        >
          <td>
            <img src={video.image_url} alt="video" className="w-10 h-10 rounded-md" />
          </td>
          <td onClick={(e) => handleNavigation(e,video.video_id)} className="whitespace-nowrap h-8 px-3 py-3  text-sm font-light text-tkh-grayscale-10">
            {video.name}
          </td>
          <td onClick={(e) => handleNavigation(e,video.video_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(video.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          {/* <td onClick={(e) => handleNavigation(e,video.video_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
           <p className="text-tkh-grayscale-0 bg-tkh-brand-tangerine-5 rounded-md px-[10px] font-[400] text-[14px]">online</p>
          </td> */}
          <td onClick={(e) => handleNavigation(e,video.video_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {video.organization.name}
          </td>
          <td onClick={(e) => handleEditVideoFormRendering(e,video)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            <a className="hover:underline hover:text-tkh-brand-tangerine-5">Edit</a> / <a className="hover:underline hover:text-tkh-brand-tangerine-5" onClick={(e) =>handleConfirmRendering(e,video)}>Delete</a>
          </td>
          {/* <td>
            <TableButton data={video} archived={archived} active={false} approved={approved} meta={meta} handleFeature={handleFeature}/>
          </td>
          <td>
            <TableButton data={video} archived={archived} active={true} approved={approved} meta={meta} handleActivate={handleActivate}/>
          </td> */}
        </tr>
      ))}
    </tbody>
    </>
  )
  
}
export default RequestedVideosList;        
