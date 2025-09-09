import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {TableButton} from "./TableButton";
import { removeSkill } from "../../redux/skills/deleteSkillSlice";
import moment from "moment";
import ft from "format-time";
import {Delete} from "../utls/delete2";
import deleteSvg from "../../assets/x-circle.svg";
import cookie from "js-cookie";

function RequestedSkillsList({skills,meta,setSkills} ) {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const org_id = cookie.get("orgId");
  const title ="Delete Skill"
  const text =`Are You sure you want to delete This Skill. You cannot be undo this Action`
  const btn_text = "Confirm"


  const handleDelete = (e, skill) => {
    event.preventDefault(e);
    var arr = []
    skills.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(removeSkill({ skill_id: skill.skill_id })).then(() => {
        return window.location.reload(true);
    });
  };
  
  return (
    <tbody className="w-full ">
      {skills.map((skill) => (
        <tr
          key={skill.id}
          className="
            cursor-pointer 
            transition ease-in-out 
            duration-900
            border-y
            border-tkh-grayscale-3
            rounded-md text-tkh-grayscale-10 
            hover:bg-tkh-brand-tangerine-1
          "
        >
        <td className=" p-5 fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5">
            <Delete 
              handleDelete={handleDelete} 
              data={skill} 
              title={title}
              text={text}
              btn_text={btn_text}
            />
          </td> 
          <td className="whitespace-normal  h-8 px-3 text-sm font-light text-tkh-grayscale-10 max-w-[200px]">
            {skill.name}
          </td>
          <td className=" whitespace-normal h-8 m-auto p-3 text-sm font-light text-tkh-grayscale-10 ">
            {skill.default}
          </td>
          {/*<TableButton data={program} approved={approved} meta={meta}handleApproval={handleApproval}/>*/}
        </tr>
      ))}
    </tbody>
  );
}
export default RequestedSkillsList;
