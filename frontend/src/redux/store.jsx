import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./user/userLoginSlice";
import activateOrgStaffReducer from "./org/activateOrgStaffSlice";
import activateOrgReducer from "./org/activateOrgSlice"
import deactivateOrgStaffReducer from "./org/deactivateOrgStaffSlice";
import activateBxdpStaffReducer from "./bxdp/activateBxdpStaffSlice";
import deactivateBxdpStaffReducer from "./bxdp/deactivateBxdpStaffSlice";
import newReportReducer from "./user/reportBugSlice"
// import bxdpStaffSignUpReducer from "./bxdpStaffSignUpSlice";
// import updateStaffMemberReducer from "./updateBXDPStaffSlice";
import recoverPasswordReducer from "./user/recoverPasswordSlice";
import getUserListReducer from "./user/fetchAllUsers";
import getFeaturedQualifiedContentReducer from "./user/featuredQualifiedContentSlice";
import getQualifiedContentReducer from "./user/qualifiedContentSlice";
import getQualifiedUserContentReducer from"./user/qualifiedUserContentSlice";
import getAllBxdpReducer from "./bxdp/fetchAllBXDPStaffSlice";
import getAllOrgsReducer from "./org/fetchAllOrgsSlice";
import getParntersListReducer from "./user/fetchPartnersListSlice";
import getAllApprovedOrgsReducer from "./org/fetchAllApprovedOrgsSlice";
import getAllUnapprovedOrgsReducer from "./org/fetchAllUnapprovedOrgsSlice";
import featureProgramReducer from "./programs/featureProgramSlice";
import featureOrgReducer from "./org/featureOrgSlice";
import featureEventReducer from "./events/featureEventSlice"
import fileUploadReducer from "./image/fileUploadSlice"
import removeEventReducer from "./events/deleteEventSlice";
import removeEventTagReducer from "./events/deleteEventTagSlice"
import qualifiedProgramsReducer from "./programs/qualifiedProgramsSlice";
import qualifiedEventsReducer from "./events/qualifiedEventsSlice";
import getAllActiveEventsReducer from "./events/fetchAllActiveEventsSlice";
import getAllActiveEventsByOrgReducer from "./org/fetchAllActiveEventsByOrgSlice";
import getAllActiveProgramsByOrgReducer from "./programs/fetchAllActiveProgramsByOrgSlice";
import getAllEventsByOrgReducer from "./events/fetchAllEventsByOrgSlice";
import getEventByIdReducer from "./events/fetchEventByIdSlice";
import getAllEventsReducer from "./events/fetchAllEventsSlice";
import getRecommendedEventsReducer from "./events/fetchRecommendedEventsSlice";
import updateEventReducer from "./events/updateEventSlice";
import fetchAllTagsReducer from "./events/fetchAllTagsSlice";
import activateEventReducer from "./events/activateEventSlice";
import newTagReducer from "./events/newTagSlice"
import newEventTagReducer from"./events/newEventTagSlice"
import removeSkillReducer from "./skills/deleteSkillSlice";
import getAllSkillsReducer from "./skills/fetchAllSkillsSlice";
import updateSkillsReducer from "./skills/updateSkillSlice";
import newSkillReducer from "./skills/newSkillSlice";
import newVideoReducer from "./videos/newVideoSlice"
import removeVideoReducer from "./videos/deleteVideoSlice";
import getAllVideosReducer from "./videos/fetchAllVideosSlice";
import getVideoByIdReducer from "./videos/fetchVideoByIdSlice";
import getVideosByOrgReducer from "./videos/fetchVideosByOrgSlice";
import updateVideosReducer from "./videos/updateVideoSlice";
import getResourceByIdReducer from "./resources/fetchResourceByIdSlice";
import getAllResourcesReducer from "./resources/fetchAllResourcesSlice";
import getResourcesByOrgIdReducer from "./resources/fetchResourcesByOrgIdSlice";
import getActiveResourcesByOrgIdReducer from "./resources/fetchActiveResourcesByOrgIdSlice";
import newResourceReducer from "./resources/newResourceSlice";
import updateResourceReducer from "./resources/updateResourceSlice";
import deleteResourceReducer from "./resources/deleteResourceSlice";
import addResourceTagReducer from "./resources/addResourceTagSlice";
import deleteResourceTagReducer from "./resources/deleteResourceTagSlice";
import addResourceCategoryReducer from "./resources/addResourceCategorySlice";
import deleteResourceCategoryReducer from "./resources/deleteResourceCategorySlice";
import removeProgramReducer from "./programs/deleteProgramSlice";
import getAllActiveProgramsReducer from "./programs/fetchAllActiveProgramsSlice";
import getProgramByIdReducer from "./programs/fetchProgramByIdSlice";
import getAllProgramsReducer from "./programs/fetchAllProgramsSlice";
import getRecommendedProgramsReducer from "./programs/fetchRecommendedProgramsSlice";
import updateProgramReducer from "./programs/updateProgramSlice";
import removeTopicReducer from "./programs/deleteTopicSlice";
import newTopicReducer from "./programs/newTopicSlice";
import activateProgramReducer from "./programs/activateProgramSlice"
import removeOrgReducer from "./org/deleteOrgSlice";
import getOrgByIdReducer from "./org/fetchOrgByIdSlice";
import getPartnerByIdReducer from "./org/fetchPartnerById";
import getAllOrgStaffReducer from "./org/fetchAllOrgStaffSlice";
import orgApprovalReducer from "./org/approveOrgSlice";
import registerUserReducer from "./user/signUpUserSlice";
import registerOrgUserReducer from "./user/signUpOrgUserSlice"
import registerOrgReducer from "./org/signUpOrgSlice";
import editOrgUserSlice from "./user/updateOrgUserSlice"
import metaAdminInviteStatusReducer from "./bxdp/inviteMetaAdminSlice";
import bxdpAdminInviteStatusReducer from "./bxdp/inviteBxdpAdminSlice";
import orgInviteStatusReducer from "./org/inviteOrgSlice";
import orgAdminInviteStatusReducer from "./org/inviteOrgAdminSlice";
import orgManagerInviteStatusReducer from "./org/inviteOrgManagerSlice";
import orgUserInviteStatusReducer from "./org/inviteOrgUserSlice";
import changeGeneratedPasswordBxdpReducer from "./bxdp/resetGeneratedBxdpPasswordSlice";
import changeGeneratedPasswordOrgReducer from "./org/resetGeneratedOrgPasswordSlice";
import changePasswordReducer from "./user/resetPasswordSlice";
import changeOrgReducer from "./org/updateOrgDataSlice";
import changeStaffToAdminReducer from "./org/orgStaffToAdminSlice";
import changeStaffToManagerReducer from "./org/orgStaffToManagerSlice";
import changeStaffToUserReducer from "./org/orgStaffToUserSlice";
import removeBxdpStaffReducer from "./bxdp/deleteBxdpStaffSlice";
import removeOrgStaffReducer from "./org/deleteOrgStaffSlice";
import newEventReducer from "./events/newEventSlice";
import newProgramReducer from "./programs/newProgramSlice";
import changeUserReducer from "./user/updateUserSlice";
import changeUserPasswordReducer from "./user/updateUserPasswordSlice";
import userLogoutReducer from "./user/userLogoutSlice";
import generateUrlReducer from "./image/generateUrlSlice";
import changePreferencesReducer from "./user/updatePreferencesSlice";
import getUserProfileReducer from "./user/fetchUserProfileSlice";
import updateRequirementsReducer from "./requirements/updateRequirementsSlice";
import getCategoriesReducer from "./categories/getCategoriesSlice";
import addCategoryReducer from "./categories/addCategorySlice";
import deleteCategoryReducer from "./categories/deleteCategorySlice";
import updateCategoryReducer from "./categories/updateCategorySlice";


export default configureStore({
  reducer: {
    // orgUserSignUp: registerOrgUserReducer,
    // updateOrgAdminData: updateOrgAdminReducer,
    // inviteOrgStaff: inviteOrgStaffReducer,

    // changeActiveToDeactive: deactivateOrgStaffReducer,
    // changeDeactiveToActive: activateOrgStaffReducer,
    // changeActiveToDeactiveBxdp: deactivateBxdpStaffReducer,
    // changeDeactiveToActiveBxdp: deactiveToActiveBxdpReducer,
    // createBXPDUser: bxdpStaffSignUpReducer,
    // editStaffMember: updateStaffMemberReducer,
  
    activateOrg: activateOrgReducer,
    activateProgram: activateProgramReducer,
    activateEvent: activateEventReducer,
    getLink: recoverPasswordReducer,
    featureProgram: featureProgramReducer,
    featureEvent: featureEventReducer,
    featureOrg: featureOrgReducer,
    userLogin: userLoginReducer,
    getUserList: getUserListReducer,
    getAllBxdpStaff: getAllBxdpReducer,
    getAllOrgs: getAllOrgsReducer,
    getPartnersList: getParntersListReducer,
    getAllApprovedOrgs: getAllApprovedOrgsReducer,
    getAllUnapprovedOrgs: getAllUnapprovedOrgsReducer,
    getOrgById: getOrgByIdReducer,
    getPartnerById: getPartnerByIdReducer,
    getAllOrgStaff: getAllOrgStaffReducer,
    uploadFile:fileUploadReducer,
    getAllActiveEvents: getAllActiveEventsReducer,
    getAllActiveEventsByOrg: getAllActiveEventsByOrgReducer,
    getAllEventsByOrg: getAllEventsByOrgReducer,
    getEventById: getEventByIdReducer,
    getAllEvents: getAllEventsReducer,
    getRecommendedEvents: getRecommendedEventsReducer,
    getFeaturedQualifiedContent: getFeaturedQualifiedContentReducer,
    getQualifiedContent: getQualifiedContentReducer,
    getQualifiedUserContent: getQualifiedUserContentReducer,
    getQualifiedPrograms: qualifiedProgramsReducer,
    getQualifiedEvents: qualifiedEventsReducer,
    removeEvent: removeEventReducer,
    changeEvent: updateEventReducer,
    changeSkill: updateSkillsReducer,
    changeProgram: updateProgramReducer,
    removeSkill: removeSkillReducer,
    getAllTags: fetchAllTagsReducer,
    newTag: newTagReducer,
    getAllSkills: getAllSkillsReducer,
    newSkill: newSkillReducer,
    newVideo: newVideoReducer,
    changeVideo: updateVideosReducer,
    getAllVideos: getAllVideosReducer,
    getVideoById: getVideoByIdReducer,
    getVideosByOrg: getVideosByOrgReducer,
    removeVideo: removeVideoReducer,
    getResourceById: getResourceByIdReducer,
    getAllResources: getAllResourcesReducer,
    getResourcesByOrgId: getResourcesByOrgIdReducer,
    getActiveResourcesByOrgId: getActiveResourcesByOrgIdReducer,
    newResource: newResourceReducer,
    changeResource: updateResourceReducer,
    removeResource: deleteResourceReducer,
    addResourceTag: addResourceTagReducer,
    removeResourceTag: deleteResourceTagReducer,
    addResourceCategory: addResourceCategoryReducer,
    removeResourceCategory: deleteResourceCategoryReducer,
    removeProgram: removeProgramReducer,
    getAllActivePrograms: getAllActiveProgramsReducer,
    getProgramById: getProgramByIdReducer,
    getAllPrograms: getAllProgramsReducer,
    getRecommendedPrograms: getRecommendedProgramsReducer,
    removeOrg: removeOrgReducer,
    orgApprovalStatus: orgApprovalReducer,
    registerUser: registerUserReducer,
    registerOrgUser: registerOrgUserReducer,
    registerOrg: registerOrgReducer,
    updateOrgUserStatus: editOrgUserSlice,
    metaAdminInviteStatus: metaAdminInviteStatusReducer,
    bxdpAdminInviteStatus: bxdpAdminInviteStatusReducer,
    orgInviteStatus: orgInviteStatusReducer,
    orgAdminInviteStatus: orgAdminInviteStatusReducer,
    orgManagerInviteStatus: orgManagerInviteStatusReducer,
    orgUserInviteStatus: orgUserInviteStatusReducer,
    changeGeneratedPasswordBxdp: changeGeneratedPasswordBxdpReducer,
    changeGeneratedPasswordOrg: changeGeneratedPasswordOrgReducer,
    changePassword: changePasswordReducer,
    changeOrg: changeOrgReducer,
    changeStaffToAdmin: changeStaffToAdminReducer,
    changeStaffToManager: changeStaffToManagerReducer,
    changeStaffToUser: changeStaffToUserReducer,
    removeBxdpStaff: removeBxdpStaffReducer,
    removeOrgStaff: removeOrgStaffReducer,
    newEvent: newEventReducer,
    newProgram: newProgramReducer,
    newTopic: newTopicReducer,
    newEventTag: newEventTagReducer,
    newReport: newReportReducer,
    removeTopic:removeTopicReducer,
    removeEventTag:removeEventTagReducer,
    changeUser: changeUserReducer,
    changeUserPassword: changeUserPasswordReducer,
    signOutUser: userLogoutReducer,
    generateUrl: generateUrlReducer,
    changePreferences: changePreferencesReducer,
    getAllActiveProgramsByOrg: getAllActiveProgramsByOrgReducer,
    getUserProfile: getUserProfileReducer,
    updateRequirements: updateRequirementsReducer,
    getCategories: getCategoriesReducer,
    addCategory: addCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    updateCategory: updateCategoryReducer,
  },
});
