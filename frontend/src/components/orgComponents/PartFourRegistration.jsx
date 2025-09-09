import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie";

export const PartFourRegistration = () => {
  const navigate = useNavigate();
  const orgId = useSelector((state) => state?.registerOrg?.orgUserStatus?.org_id);
  const handleClick = (e) => {
    cookie.set("orgId", orgId);
    navigate("/")
  };

  return (
    <div className="flex flex-col justify-evenly items-center gap-3 py-5 min-h-96 h-96 w-full px-5">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-center">
        You’ve completed your application, and is now under review
      </h1>
      <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl text-center">
        Upon approval, you should receive an email where you’ll have your
        organization’s account activated
      </h2>
      <div className="flex flex-col justify-center items-center w-3/5 md:w-4/12 lg:w-2/5">
        <button
          className="p-2 w-full border-0 rounded-md bg-tkh-brand-tangerine-2 text-center text-tkh-grayscale-0 font-bold"
          onClick={(e) => handleClick(e)}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};
