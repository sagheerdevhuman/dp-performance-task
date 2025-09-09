const { Router } = require("express");
const orgRouter = Router();
const orgControl = require("../controllers/organization");
const {
  checkForAccessToken,
  checkIfAdminManager,
  checkIfOrgAdmin,
} = require("../helpers/validation");
const corsHeader = require("../config/corsHeader");

/*-------------------ORGANIZATION-ROUTES-------------------*/

orgRouter.use(corsHeader);

orgRouter.get("/orgs", orgControl.getAllOrganizations);

orgRouter.get(
  "/orgs/approvedOrgs",
  [checkForAccessToken],
  orgControl.getAllApprovedOrganizations
);

orgRouter.get("/orgs/partnersList", orgControl.getApprovedPartnersList);

orgRouter.get(
  "/orgs/activatedOrgs",
  [checkForAccessToken],
  orgControl.getAllActivatedOrganizations
);

orgRouter.get(
  "/orgs/unapprovedOrgs",
  [checkForAccessToken],
  orgControl.getAllUnapprovedOrganizations
);

orgRouter.get(
  "/orgs/deactivatedOrgs",
  [checkForAccessToken],
  orgControl.getAllDeactivatedOrganizations
);

orgRouter.get(
  "/orgs/:org_id",
  [checkForAccessToken],
  orgControl.getOrganizationById
);

orgRouter.get("/orgs/partner/:org_id", orgControl.getPartnerById);

orgRouter.put(
  "/orgs/:org_id/approve",
  [checkForAccessToken],
  orgControl.approveOrganization
);
orgRouter.put(
  "/orgs/:org_id/reject",
  [checkForAccessToken],
  orgControl.rejectOrganization
);

orgRouter.put(
  "/orgs/:org_id/feature",
  [checkForAccessToken],
  orgControl.featureOrganization
);

orgRouter.post(
  "/orgs/:org_id/activate",
  orgControl.activateOrganization
);

orgRouter.put("/orgs/:org_id/update", orgControl.updateOrganization);

orgRouter.put("/orgs/:org_id/hide", orgControl.hideOrganization);

orgRouter.delete(
  "/orgs/:org_id/delete",
  // [checkForAccessToken],
  orgControl.deleteOrganization
);


// Filter organizations by user profile matches
orgRouter.get("/orgs/filter/:user_id", orgControl.filterOrganizationsByUserProfile);

// Organization reports with category filtering
orgRouter.get("/orgs/reports", orgControl.getOrganizationReports);

module.exports = orgRouter;
