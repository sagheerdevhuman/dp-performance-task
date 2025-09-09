import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateOrgUserStatus } from "../../redux/user/updateOrgUserSlice";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import cookie from "js-cookie";


function ConfirmEmail() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const encodedToken = searchParams.get("invite_token");
  const userID = searchParams.get("user");
  const type = searchParams.get("type");
  const navigate = useNavigate()

  const editOrgAdmin = () => {
    dispatch(
      updateOrgUserStatus({
        user_id: userID,
      })
    );
  };
  


  const navigateRegisteredUser = (event) => {
    event.preventDefault();
    editOrgAdmin();
    alert("email verified")
    cookie.set("emailCofirmed","true");
    navigate("/org_registration");
  };

  const navigateRegisteredUser2 = (event) => {
    event.preventDefault();
    editOrgAdmin();
    alert("email verified")
    cookie.set("emailCofirmed","true");
    cookie.set("preferencesSet","false");
    navigate(`/login`);
  };

  if (!!encodedToken) {
    return (
      <div className="flex flex-col justify-between  max-w-screen min-w-screen">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[70vh] ">
         
            <p className="text-[40px] font-[700] mb-[20px] text-tkh-grayscale-10 ">Click below to verify email</p>
            {type === "org" && (
              <button
                className=" inline-flex items-center w-[80vw] max-w-[400px] h-[44px] justify-center
                      transition ease-in-out transform  duration-900
                    py-2 px-4 border border-tkh-brand-tangerine-5 rounded text-sm bg-tkh-brand-tangerine-5 
                    drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm  hover:bg-tkh-brand-tangerine-5 
                    hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
                onClick={(e) => navigateRegisteredUser(e)}
              >
                Verify
              </button>
            )}
            {type === "user" && (
              <button
                className=" inline-flex items-center w-[80vw] max-w-[400px] h-[44px] justify-center
                      transition ease-in-out transform  duration-900
                    py-2 px-4 border border-tkh-brand-tangerine-5 rounded text-sm bg-tkh-brand-tangerine-5 
                    drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm  hover:bg-tkh-brand-tangerine-5 
                    hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
                onClick={(e) => navigateRegisteredUser2(e)}
              >
                Verify
              </button>
            )}    

        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-between  max-w-screen min-w-screen">
        <Navbar />
        <main className="flex flex-col justify-center items-center h-[70vh]">
          <div className="flex flex-col max-w-[500px] w-[80vw] p-[72px] drop-shadow-card rounded bg-tkh-grayscale-1">
            <h1 className="text-[40px] font-[700] mb-[16px] text-tkh-grayscale-10 mb-10">Welcome to Digital Pipline</h1>
            <div>
              <p className="mb-3">To unlock full access and ensure your account security, please verify your email address:</p>
              <div className="px-4">
                <ul className="text-[13px] font-[600] list-disc">
                  <li>Check your inbox for an email from us titled "Welcome to Digital Pipeline!".</li> 
                  <li>Click the verification link inside</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default ConfirmEmail;
``