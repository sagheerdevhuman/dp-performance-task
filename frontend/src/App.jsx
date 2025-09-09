import "./App.css";
import { Routes, Route, Link, useLocation} from "react-router-dom";
import BxdpDashboard from "./screens/staffScreens/BxdpDashboard";
import CreateOrg from "./screens/staffScreens/CreateOrg";
import ConfirmOrg from "./screens/staffScreens/confirm/Org";
import StaffRoute from "./routings/StaffRoute";
import OrgRoute from "./routings/OrgRoute";
import Layout from "./screens/sharedScreens/Layout";
import Homepage from "./screens/sharedScreens/Homepage";
import ProgramsPage from "./screens/sharedScreens/ProgramsPage";
import ProgramDetails from "./screens/sharedScreens/ProgramDetails";
import CreateProgram from "./screens/staffScreens/CreateProgram";
import ConfirmProgram from "./screens/staffScreens/confirm/Program";
import EventsPage from "./screens/sharedScreens/EventsPage";
import EventDetails from "./screens/sharedScreens/EventDetails";
import CreateEvent from "./screens/staffScreens/CreateEvent";
import ConfirmEvent from "./screens/staffScreens/confirm/Event";
import PartnersPage from "./screens/sharedScreens/PartnersPage";
import LoginPage from "./screens/sharedScreens/LoginPage";
import UserSignUp from "./screens/sharedScreens/UserSignUp";
import OrgPage from "./screens/sharedScreens/OrgPage";
import OrgSignUp from "./screens/staffScreens/OrgSignUp";
import OrgDashboard from "./screens/staffScreens/OrgDashboard";
import SoftlockPage from "./screens/sharedScreens/SoftlockPage";
import SignUpPage from "./screens/sharedScreens/SignUpPage";
import NewProfile from "./screens/sharedScreens/NewProfile";
import OrgUserSignUp from  "./screens/sharedScreens/OrgUserSignUp";
import ApprovalPage from "./screens/sharedScreens/ApprovalPage";
import ConfirmEmail from "./screens/sharedScreens/ConfirmEmail";
import AboutPage from "./screens/sharedScreens/AboutPage";
import ResetPasswordPage from "./screens/staffScreens/ResetPasswordPage";
import ResetPasswordUserPage from "./screens/sharedScreens/ResetPasswordPage";
import InactiveUserPage from "./screens/sharedScreens/InactiveUserPage";
import ProfileDashboard from "./screens/sharedScreens/ProfileDashboard";
import VideosPage from "./screens/sharedScreens/VideosPage";
import VideoDetails from "./screens/sharedScreens/VideoDetails";
import ResourcesPage from "./screens/sharedScreens/ResourcesPage";
import ResourceDetails from "./screens/sharedScreens/ResourceDetails";
import SetPreferences from "./screens/sharedScreens/SetPreferences";
import ResetRoute from "./routings/ResetRoute";
import ResetPassRoute from "./routings/ResetPassRoute";
import ProgramRoute from "./routings/ProgramRoute";
import EventRoute from "./routings/EventRoute";
import PartnerRoute from "./routings/PartnerRoute";
import { ParallaxProvider } from 'react-scroll-parallax';
import cookie from "js-cookie";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

function App() {
  const isAuthenticatedStorage = cookie.get("isAuthenticated");
  const isAdminManagerStorage = cookie.get("isAdminManager");
  const isAdminStorage = cookie.get("isAdmin");
  let location = useLocation();

  return (
    <ParallaxProvider>
      <div className="App"> 
        <Routes >
          <Route path="/" element={<Layout />}>
            {/* Shared Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="videos" element={<VideosPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="partners_page" element={<PartnersPage />} />
            <Route path="user_registration" element={<UserSignUp />} />
            <Route path="org_user_registration" element={<OrgUserSignUp />} />
            <Route path="sign_up" element={<SignUpPage />} />
            <Route path="confirm_email" element={<ConfirmEmail/>}></Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="approval_page" element={<ApprovalPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="inactive_page" element={<InactiveUserPage />} />
            <Route path="*" element={<SoftlockPage />} />


            {/* Login Only Routes */}
            <Route element={<ProgramRoute />}>
              <Route path="profile" element={<ProfileDashboard />} />
              <Route
                path="program_details/:id"
                element={<ProgramDetails />}
              ></Route>
              <Route
                path="partners_page/partnerProfile/:org_id"
                element={<OrgPage />}
              />
              <Route path="program_details/:id" element={<ProgramDetails />} />
              <Route path="event_details/:id" element={<EventDetails />} />
              <Route path="video_details/:id" element={<VideoDetails />} />
              <Route path="resource_details/:id" element={<ResourceDetails />} />
              <Route path="create_profile" element={<NewProfile />} />
              <Route path="set_preferences" element={<SetPreferences />} />
            </Route>
            {/* <Route element={<EventRoute />}>
              <Route path="event_details/:id" element={<EventDetails />}></Route>
            </Route>
             */}
            
            <Route element={<ResetRoute />}>
              <Route
                path="reset_password_page"
                element={<ResetPasswordPage />}
              ></Route>
            </Route>

            <Route
                path="/reset_user_password?"
                element={<ResetPasswordUserPage />}
            ></Route>

         
            {/* Org Only Routes */}
            
            <Route element={<OrgRoute />}>
              <Route path="org_registration" element={<OrgSignUp />}></Route>
              <Route path="org_dashboard" element={<OrgDashboard />} />
              <Route path="create_program" element={<CreateProgram />}></Route>
              <Route path="confirm_program" element={<ConfirmProgram />}></Route>
              <Route path="create_event" element={<CreateEvent />}></Route>
              <Route path="confirm_event" element={<ConfirmEvent />}></Route>
              
            </Route>
            
            

            {/* BXDP Only Routes */}
            <Route element={<StaffRoute />}>
              <Route path="dashboard" element={<BxdpDashboard />} />
              <Route path="create_organization" element={<CreateOrg />}></Route>
              <Route path="confirm_organization" element={<ConfirmOrg />}></Route>
            </Route>
          </Route>
        </Routes>  
      </div>
      <style jsx>{`
                
          
          
          
                        
      `}</style>
    </ParallaxProvider>
  );
}

export default App;
