import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import {PreferencesForm} from "../../components/sharedComponents/PreferenceForm";
import { changePreferences } from "../../redux/user/updatePreferencesSlice";
import cookie from "js-cookie";
import { AddSkillModal } from "../../components/orgComponents/AddSkillModal";
import { getAllSkills } from "../../redux/skills/fetchAllSkillsSlice";
import { createSkill } from "../../redux/skills/newSkillSlice";
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import { createTag } from "../../redux/events/newTagSlice";
import { AddTagModal } from "../../components/orgComponents/AddTagModal";

function SetPreferences() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSettingsConfirmed = cookie.get("settings_confirmed");
  const user_id = cookie.get('userId');
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [skills, setSkills] = useState();
  const [skill2, setSkill2] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const skillList = useSelector((state) => state?.getAllSkills);
  const [days,setDays] = useState();
  const [weekDays, setWeekDays] = useState();
  const userToken = cookie.get("userToken");
  const [modalSkillRendered, isModalSkillRendered] = useState(false);
  const [tags, setTags] = useState();
  const [tag2, setTag2] = useState();
  const [allTags, setAllTags] = useState();
  const tagList = useSelector((state) => state?.getAllTags);
  const [modalTagRendered, isModalTagRendered] = useState(false);
  const [learningStyle, setLearningStyle] = useState();
  const [preferredLanguage, setPreferredLanguage] = useState();
  const [skillErrors, setSkillErrors] = useState({});
  const setSkillOptions = (allSkills) => {
    return allSkills.map((skill) => ({
      value: skill.skill_id,
      label: skill.name,
      description: skill.default,
    }));
  };


  const setTagOptions = (allTags) => {
    return allTags.map((tag) => ({
      value: tag.tag_id,
      label: tag.name,
    }));
  };

  const formatSkills = (skills) => {
    if (skills != null) {
      return skills.map((skill) => ({
        skill_id: skill.value,
        description: skill.description,
      }));
    }
  };

  useEffect(() => {
    dispatch(getAllSkills({ userToken }));
    dispatch(getAllTags());
  }, [dispatch, userToken]);

  useEffect(() => {
    if (skillList?.status == "success" && tagList?.status == "success") {
      setAllSkills(skillList?.skills?.skills);
      setList(setSkillOptions(skillList?.skills?.skills));
      setAllTags(tagList?.tags?.tags);
      setList2(setTagOptions(tagList?.tags?.tags));
    }
  }, [skillList, tagList]);

  const [skillFormData, setSkillFormData] = useState({
    name: "",
    description: "",
  });

  function handleSkillFormRendering(event) {
    event.preventDefault();
    isModalSkillRendered(!modalSkillRendered);
  }

  function handleSkillFormSubmit(event) {
    event.preventDefault();
    const newErrors = {
      name: !skillFormData.name,
      description: !skillFormData.description,
    };
    setSkillErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error);

    if (isValid) {
      dispatch(
        createSkill({
          name: skillFormData.name,
          description: skillFormData.description,
        })
      ).then((data) => {
        if (data.payload && data.payload.skill) {
          let arr = [...allSkills];
          arr.push(data.payload.skill);
          setSkillFormData({
            name: "",
            description: "",
          });
          setList(setSkillOptions(arr));
          handleSkillFormRendering(event);
        }
      }).catch((error) => {
        console.error("Error creating skill:", error);
        setErrorMessage("Failed to create skill. Please try again.");
      });
    }
  }

  const handleSkillChange = (value) => {
    try {
      setSkills(value);
      setSkill2(formatSkills(value));
    } catch (error) {
      console.error("Error handling skill change:", error);
      setErrorMessage("Error updating skills. Please try again.");
    }
  };

  const [tagFormData, setTagFormData] = useState({
    name: "",
  });

  function handleTagFormRendering(event) {
    event.preventDefault();
    isModalTagRendered(!modalTagRendered);
  }

  function handleTagFormSubmit(event) {
    event.preventDefault();
    if (!tagFormData.name.trim()) {
      setErrorMessage("Tag name is required.");
      return;
    }

    dispatch(
      createTag({
        name: tagFormData.name,
      })
    ).then((data) => {
      if (data.payload && data.payload.tag) {
        let arr = [...allTags];
        arr.push(data.payload.tag);
        setTagFormData({
          name: "",
        });
        setList2(setTagOptions(arr));
        handleTagFormRendering(event);
      }
    }).catch((error) => {
      console.error("Error creating tag:", error);
      setErrorMessage("Failed to create tag. Please try again.");
    });
  }

  const formatTags = (tags) => {
    if (tags != null) {
      return tags.map((tag) => ({
        tag_id: tag.value,
        name: tag.name,
      }));
    }
  };

  const handleTagChange = (value) => {
    try {
      setTags(value);
      setTag2(formatTags(value));
    } catch (error) {
      console.error("Error handling tag change:", error);
      setErrorMessage("Error updating tags. Please try again.");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!user_id) {
      setErrorMessage("User ID not found. Please log in again.");
      return;
    }

    const data = {
      user_id: user_id,
      availability: weekDays,
      learning_style: learningStyle.value,
      preferred_language: preferredLanguage.value,
      desired_skills: skill2, 
      desired_tags: tag2,
    };

    dispatch(changePreferences(data))
      .then((result) => {
        if (result.payload) {
          if(isSettingsConfirmed == "false"){
            setErrorMessage("");
            cookie.set("settings_confirmed", true);
            navigate("/");
          }else{
            setErrorMessage("");
            navigate("/profile");
          }
        } else {
          setErrorMessage("Failed to update preferences. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error updating preferences:", error);
        setErrorMessage("An error occurred while updating preferences. Please try again.");
      });
  }

  const handleLearningStyleChange = (value) => {
    setLearningStyle(value);
  };

  const handlePreferredLanguageChange = (value) => {
    setPreferredLanguage(value);
  };
  
  const handleOptOut = () => {
    cookie.set("settings_confirmed", true);
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-between m-h-screen h-screen w-screen">
      <Navbar />
      <AddSkillModal
        skillFormData={skillFormData}
        handleSkillFormRendering={handleSkillFormRendering}
        setSkillFormData={setSkillFormData}
        handleSkillFormSubmit={handleSkillFormSubmit}
        modalSkillRendered={modalSkillRendered}
        isModalSkillRendered={isModalSkillRendered}
        skillErrors={skillErrors}
      />
      <AddTagModal
        tagFormData={tagFormData}
        setTagFormData={setTagFormData}
        handleTagFormSubmit={handleTagFormSubmit}
        handleTagFormRendering={handleTagFormRendering}
        modalTagRendered={modalTagRendered}
        isModalTagRendered={isModalTagRendered}
      />
      <div className="flex flex-row h-screen">
        <div className="flex-col w-full lg:w-3/6 pb-[70px] overflow-y-auto">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-row justify-center items-center py-20"
          >
            <div className="flex flex-col justify-center lg:w-8/12 w-12/12 px-3">
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errorMessage}
                </div>
              )}
              <PreferencesForm
                setWeekDays={setWeekDays}
                days={days}
                setDays={setDays}
                list={list}
                list2={list2}
                handleLearningStyleChange={handleLearningStyleChange}
                handlePreferredLanguageChange={handlePreferredLanguageChange}
                handleTagFormRendering={handleTagFormRendering}
                handleSkillFormRendering={handleSkillFormRendering}
                skills={skills}
                handleSkillChange={handleSkillChange}
                handleTagChange={handleTagChange}
                tags={tags}
                learningStyle={learningStyle}
                preferredLanguage={preferredLanguage}
              />
              <div className="flex md:flex-row flex-col mt-2 h-10 gap-3">
                <button
                  type="button"
                  onClick={handleOptOut}
                  className="h-10 border-0 rounded-md bg-[#EFF0FC] hover:bg-tkh-grayscale-4
                    text-center text-tkh-grayscale-10 font-bold capitalize md:w-[108px] w-full h-[44px]"
                >
                  Opt Out
                </button>
                <button
                  type="submit"
                  className="h-10 border-0 rounded-md hover:bg-tkh-brand-tangerine-2 bg-tkh-brand-tangerine-5 
                    text-center text-tkh-grayscale-0 font-bold capitalize md:w-[142px] w-full h-[44px]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center w-none lg:w-3/6 bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-vlada-karpovich-4050287.jpg')]">
          <div className="h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SetPreferences;
