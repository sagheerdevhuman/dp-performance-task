import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../../redux/events/fetchAllTagsSlice";
import { createEventTag } from "../../../redux/events/newEventTagSlice";

export const Edit = ({ handleClick, event_id,edit, list, setList ,setOptions,handleTagFormRendering }) => {
  const [tags, setTags] = useState();
  const [allTags, setAllTags] = useState([]);
  const tagList = useSelector((state) => state?.getAllTags);
  const [eventTags, setEventTags] = useState([]);
  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem("userToken");

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  useEffect(() => {
    if (tagList?.status == "success") {
      setAllTags(tagList?.tags?.tags);
      setList(setOptions(allTags))
    }
  }, [tagList]);

  const formatTags = (tags) => {
    if (tags != null) {
      return tags.map((tag) => ({
        tag_id: tag.value,
        name: tag.name,
      }));
    }
  };
  const blag = formatTags(allTags)
  console.log(blag)
  
  function handleTagFormSubmit(event) {
    event.preventDefault();
    dispatch(
      createEventTag({
        event_id: event_id,
        tags: eventTags
      })
    ).then((data) => {
      window.location.reload(false);
    });
  }

  const handleChange = (value) => {
    try {
      setTags(value);
      setEventTags(formatTags(value));
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
 

  

  if (edit == true){
    return(
      <label className="flex flex-col mb-3">
        Add Tags *
        <div className="flex items-center gap-3">
          <Select
            primaryColor={"indigo"}
            className="rounded text-tkh-grayscale-10 min-w-[200px] bg-tkh-brand-tangerine-5"
            value={tags}
            onChange={handleChange}
            options={list}
            isMultiple={true}
            isClearable={true}
            isSearchable={true}
            classNames={{
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500 pl-3 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-[#fff] hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,

              tagItem: ({ isDisabled }) =>
                `flex text-gray-500  text-sm p-2  border tag-item rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-tkh-brand-tangerine-4 hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,
              menu: "seclect-menu  absolute z-10 w-fit bg-[#fff] shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
              listItem: ({ isSelected }) =>
                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                  isSelected
                    ? `text-[#fff] bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100 hover:text-tkh-grayscale-8`
                }`,
            }}
          />
          <svg onClick={handleTagFormRendering}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="black"/>
          </svg>
        </div>
        <button
          onClick={(e)=>{handleTagFormSubmit(e)}}
          className=" h-10 w-[200px] mt-3 border-0 rounded-md bg-tkh-brand-tangerine-5 
          drop-shadow-btn text-center text-tkh-grayscale-0 font-bold "
        >
          Save
        </button>
      </label>

    )
  }
  
  
  return (
    <div className="flex h-[90%]  w-full">
      <button className="
        text-[12px] ml-3 transition ease-in-out duration-200 border border-solid 
        border-tkh-grayscale-7 hover:border-tkh-brand-tangerine-5 rounded-full 
        text-center text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-5 
        hover:text-tkh-grayscale-0 pl-2 pr-2 font-[800]"  
        onClick={(e) => { handleClick(e)}}>        
          Add Tags
      </button>
    </div>
  );
};






















