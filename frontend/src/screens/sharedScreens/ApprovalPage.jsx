import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateOrgAdminStatus } from "../../redux/org/updateOrgAdminToApprovedSlice";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";

function ApprovalPage() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const encodedToken = searchParams.get("invite_token");
  const orgID = searchParams.get("org");
  const userID = searchParams.get("user");
  const navigate = useNavigate();

  const editOrgAdmin = () => {
    dispatch(
      updateOrgAdminStatus({
        org_id: orgID,
        user_id: userID,
        is_approved: true,
      })
    );
  };

  const navigateRegisteredUser = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  if (!!encodedToken) {
    editOrgAdmin();
    return (
      <div className="flex flex-col justify-between m-h-screen h-screen max-w-screen min-w-screen">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <p>You can now login below</p>
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-tkh-brand-tangerine-2 bg-origin-border px-4 py-2 rounded-md border-none shadow-sm text-base font-medium text-tkh-grayscale-0 hover:bg-tkh-brand-tangerine-3 active:bg-tkh-brand-tangerine-4"
            onClick={(e) => navigateRegisteredUser(e)}
          >
            Login
          </button>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-between m-h-screen h-screen max-w-screen min-w-screen">
        <Navbar />
        <main className="flex flex-col justify-center items-center h-full">
          <h1 className="text-5xl font-semibold">Approval still pending</h1>
        </main>
        <Footer />
      </div>
    );
  }
}

export default ApprovalPage;
