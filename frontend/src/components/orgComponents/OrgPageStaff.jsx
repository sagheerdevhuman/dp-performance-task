import AddStaffButton from "./AddStaffButton";
import StaffActions from "./StaffActions";
import { UserIcon } from "@heroicons/react/solid";
import { getAllOrgStaff } from "../../redux/org/fetchAllOrgStaffSlice";
import { changeStaffToAdmin } from "../../redux/org/orgStaffToAdminSlice";
import { changeStaffToManager } from "../../redux/org/orgStaffToManagerSlice";
import { changeStaffToUser } from "../../redux/org/orgStaffToUserSlice";
import { changeActiveToDeactive } from "../../redux/org/deactivateOrgStaffSlice";
import { changeDeactiveToActive } from "../../redux/org/activateOrgStaffSlice";
import { removeOrgStaff } from "../../redux/org/deleteOrgStaffSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import cookie from "js-cookie";

const StaffList = ({handleStaffFormRendering, staff}) => {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const orgId = cookie.get("orgId");
  const userId = cookie.get("userId");
  const isOrgAdmin = cookie.get("isOrgAdmin") === "true";
  const isOrgManager = cookie.get("isOrgManager") === "true";
  const isOrgUser = cookie.get("isOrgUser") === "true";
  const [staffId, setStaffId] = useState({
    staffUserId: "",
    staffOrgId: "",
  });

  const changeUserActiveStatus = (e) => {
    e.preventDefault();
    if (e.target.name == "activateUser") {
      dispatch(
        changeDeactiveToActive({
          org_id: staffId.staffOrgId,
          user_id: staffId.staffUserId,
        })
      );
      return window.location.reload(true);
    } else if (e.target.name == "deactivateUser") {
      dispatch(
        changeActiveToDeactive({
          org_id: staffId.staffOrgId,
          user_id: staffId.staffUserId,
        })
      );
      return window.location.reload(true);
    }
  };

  const changeUserRole = (e) => {
    e.preventDefault();
    if (e.target.name == "toOrgAdmin") {
      dispatch(
        changeStaffToAdmin({
          org_id: staffId.staffOrgId,
          user_id: staffId.staffUserId,
        })
      );
      return window.location.reload(true);
    } else if (e.target.name == "toOrgManager") {
      dispatch(
        changeStaffToManager({
          org_id: staffId.staffOrgId,
          user_id: staffId.staffUserId,
        })
      );
      return window.location.reload(true);
    } else if (e.target.name == "toOrgUser") {
      dispatch(
        changeStaffToUser({
          org_id: staffId.staffOrgId,
          user_id: staffId.staffUserId,
        })
      );
      return window.location.reload(true);
    }
  };

  const deleteUser = (e) => {
    e.preventDefault();
    console.log(staffId.staffOrgId, staffId.staffUserId);
    dispatch(
      removeOrgStaff({
        org_id: staffId.staffOrgId,
        user_id: staffId.staffUserId,
      })
    ).then(() => {
      return window.location.reload(true);
    });
  };

  function renderUserRole(isOrgAdmin, isOrgManager) {
    if (isOrgAdmin) {
      return "Admin";
    } else if (isOrgManager) {
      return "Manager";
    } else {
      return "User";
    }
  }

  return (
    <div className="w-[70vw]">
      <div className="flex items-center mb-3">
        <div className="mr-5">
          <h1 className="text-4xl md:text-[40px] leading-tight mb-2 font-bold  break-word">
            Staff
          </h1>
          <p className="h-7 text-sm font-normal text-tkh-grayscale-10">
            Org-wide
          </p>
        </div>
        <AddStaffButton handleStaffFormRendering={handleStaffFormRendering} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
      {staff.filter(staff => staff.is_user == false ).map((user, key) => (
        <div className="flex text-start drop-shadow bg-[#ffff] rounded items-center justify-center cursor-pointer">
          <div className="flex drop-shadow-card-2 items-center space-x-4 w-full  p-5">
            <div className="flex-shrink-0 items-center w-9 h-9 justify-center border rounded shadow-sm">
              {user.imageUrl ? (
                <img
                  className=" rounded"
                  src={user.profile_image}
                  alt=""
                />
              ) : (
                <UserIcon />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-tkh-grayscale-10 truncate">
                {user.first_name + " "}
                {user.last_name}
              </p>
              <p className="text-sm text-tkh-grayscale-10 font-light truncate">
                {renderUserRole(
                  user.is_org_admin,
                  user.is_org_manager,
                  user.is_org_user
                )}
              </p>
              <p className="text-sm text-tkh-grayscale-10 truncate">
                {user.user_email}
              </p>
            </div>   
            <div>
              <StaffActions
                changeUserActiveStatus={changeUserActiveStatus}
                changeUserRole={changeUserRole}
                deleteUser={deleteUser}
                staffId={staffId}
                setStaffId={setStaffId}
                userId={user.user_id}
                orgId={user.org_id}
              />
            </div>
          </div>
        </div>
      ))}
        
      </div>
      <hr className="mt-[6vh] mb-2 border-[.5px] border-[#E2E5F1] text-tkh-grayscale-9"/>
    </div>

  );
};

export default StaffList;
