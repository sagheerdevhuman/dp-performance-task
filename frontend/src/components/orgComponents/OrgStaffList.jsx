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

const OrgStaffList = ({handleStaffFormRendering}) => {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const orgId = cookie.get("orgId");
  const userId = cookie.get("userId");
  const isOrgAdmin = cookie.get("isOrgAdmin") === "true";
  const isOrgManager = cookie.get("isOrgManager") === "true";
  const isOrgUser = cookie.get("isOrgUser") === "true";
  const users = useSelector((state) => state?.getAllOrgStaff);
  const [staff, setStaff] = useState([]);
  const [staffId, setStaffId] = useState({
    staffUserId: "",
    staffOrgId: "",
  });

  useEffect(() => {
    dispatch(getAllOrgStaff({ userToken, orgId }));
  }, []);

  useEffect(() => {
    if (users?.status == "success") {
      const staffList = users?.staff?.users;
      setStaff(staffList);
    }
  }, [users]);
 console.log(users?.staff?.users)
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

  function renderUserRole(isOrgAdmin, isOrgUser) {
    if (isOrgAdmin) {
      return "Admin";
    } else if (isOrgUser) {
      return "User";
    } else {
      return "User";
    }
  }

  console.log(staff)
  return (
   
    <div className="min-h-full w-full  rounded-lg p-x-4 shadow-lg">
      <div className="flex flex-row justify-between px-4">
        <div className="sm:flex-auto">
          <h1 className="h-9 justify-center text-[25px] font-bold text-tkh-brand-tangerine-5">
              Staff
            </h1>
          </div>
          <AddStaffButton handleStaffFormRendering={handleStaffFormRendering} />
        </div>

        <div className="flow-root h-full overflow-y-auto max-h-[500px]">
          <ul role="list" className="h-full">
            {staff.map((user, key) => (
              <li
                key={key}
                className="focus:text-tkh-grayscale-2 hover:text-[#000] hover:bg-tkh-brand-tangerine-2 p-3 mt-1.5"
              >
                <div className="flex items-center space-x-4 h-12 ">
                  <div className="flex-shrink-0 items-center w-[47px] h-[67px] justify-center shadow-sm">
                    {user.imageUrl ? (
                      <div className={`w-full h-full rounded-md bg-[url('${user.profile_image}')] bg-cover bg-center`}> 
                      </div>

                    ) : (
                      <UserIcon className="w-full h-full"/>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">
                      {user.first_name + " "}
                      {user.last_name}
                    </p>
                    <p className="text-sm font-light truncate">
                      {renderUserRole(
                        user.is_org_admin,
                        user.is_org_user
                      )}
                    </p>
                    <p className="text-sm truncate">
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
              </li>
            ))}
          </ul>
        </div>
      </div>

  );
};

export default OrgStaffList;
