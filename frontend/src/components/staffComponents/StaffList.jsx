import AddStaffButton from "../staffComponents/AddStaffButton";
import StaffActionsButton from "../staffComponents/StaffActionsButton";
import { UserIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBxdpStaff } from "../../redux/bxdp/fetchAllBXDPStaffSlice";
import { changeUserToBxdpAdmin } from "../../redux/bxdp/bxdpStaffToBxdpAdminSlice";
import { changeUserToMetaAdmin } from "../../redux/bxdp/bxdpStaffToMetaAdminSlice";
import { changeActiveToDeactiveBxdp } from "../../redux/bxdp/deactivateBxdpStaffSlice";
import { changeDeactiveToActiveBxdp } from "../../redux/bxdp/activateBxdpStaffSlice";
import { removeBxdpStaff } from "../../redux/bxdp/deleteBxdpStaffSlice";
import cookie from "js-cookie";

const StaffList = ({handleStaffFormRendering}) => {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const users = useSelector((state) => state?.getAllBxdpStaff);
  const [staff, setStaff] = useState([]);
  const [staffId, setStaffId] = useState({
    staffUserId: "",
  });

  useEffect(() => {
    dispatch(getAllBxdpStaff({ userToken }));
  }, []);

  useEffect(() => {
    if (users?.status == "success") {
      const staffList = users?.staff?.users;
      setStaff(staffList);
    }
  }, [users]);

  const renderUserRole = (isMetaAdmin, isBxdpAdmin) => {
    if (isMetaAdmin) {
      return "Meta Admin";
    } else if (isBxdpAdmin) {
      return "DP Admin";
    }
  };

  const changeUserRole = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "toMetaAdmin") {
      dispatch(
        changeUserToMetaAdmin({ userToken, user_id: staffId.staffUserId })
      ).then(() => {
        return window.location.reload(true);
      });
    } else if (e.target.name == "toBxdpAdmin") {
      dispatch(
        changeUserToBxdpAdmin({ userToken, user_id: staffId.staffUserId })
      ).then(() => {
        return window.location.reload(true);
      });
    }
  };

  const changeUserActiveStatus = (e) => {
    e.preventDefault();
    if (e.target.name == "deactivateUser") {
      dispatch(
        changeActiveToDeactiveBxdp({ userToken, user_id: staffId.staffUserId })
      ).then(() => {
        return window.location.reload(true);
      });
    } else if (e.target.name == "activateUser") {
      dispatch(
        changeDeactiveToActiveBxdp({ userToken, user_id: staffId.staffUserId })
      ).then(() => {
        return window.location.reload(true);
      });
    }
  };

  const deleteUser = (e) => {
    e.preventDefault();
    dispatch(
      removeBxdpStaff({
        user_id: staffId.staffUserId,
      })
    );
    return window.location.reload(true);
  };

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
        <ul role="list" className=" h-full">
          {staff.map((user, key) => (
            <li
              key={key}
              className="focus:text-tkh-grayscale-2 hover:text-[#000] hover:bg-tkh-brand-tangerine-2 p-3 mt-1.5"
            >
              <div className="flex items-center space-x-4 h-12   ">
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
                  <p className="text-sm truncate">
                    {renderUserRole(user.is_meta_admin, user.is_bxdp_admin)}
                  </p>
                  <p className="text-sm truncate">
                    {user.user_email}
                  </p>
                </div>

                <div>
                  <StaffActionsButton
                    changeUserActiveStatus={changeUserActiveStatus}
                    changeUserRole={changeUserRole}
                    deleteUser={deleteUser}
                    staffId={staffId}
                    setStaffId={setStaffId}
                    userId={user.user_id}
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

export default StaffList;
