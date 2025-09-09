const { Router } = require("express");
const eventRouter = Router();
const eventControl = require("../controllers/event");
const { checkForAccessToken, checkIfAdmin } = require("../helpers/validation");
const corsHeader = require("../config/corsHeader");
const eventProfileController = require("../controllers/event-profile");


/*-------------------ORGANIZATION-ROUTES-------------------*/

eventRouter.use(corsHeader);

eventRouter.post("/event/:org_id/addEvent", eventControl.addEvent);

eventRouter.get("/events/active", eventControl.getAllActiveEvents);

eventRouter.get("/all-events/:user_id", eventControl.getAllEvents);

eventRouter.get("/events/:org_id/active", eventControl.getAllActiveEventsByOrg);

eventRouter.get("/event/:event_id", eventControl.getEventbyId);

eventRouter.put("/events/:event_id/update", eventControl.updateEvent);

eventRouter.delete("/events/:event_id/delete", eventControl.deleteEvent);

eventRouter.get("/events/:event_id/rsvps", eventControl.getRSVPs);

eventRouter.post("/events/by_tag", eventControl.getEventsbyTag)

eventRouter.get("/events/:org_id/orgs", eventControl.getEventbyOrg);

eventRouter.post("/events/:event_id/rsvp", eventControl.rsvp);

eventRouter.put("/events/:event_id/approve", eventControl.approveEvent);

eventRouter.put("/events/:event_id/reject", eventControl.rejectEvent);

eventRouter.put("/events/:event_id/feature", eventControl.featureEvent);

eventRouter.post("/events/:event_id/activate", eventControl.activateEvent);

eventRouter.post("/events/:event_id/addTag", eventControl.addEventTag);

eventRouter.delete(
  "/events/:event_id/deleteTag",
  eventControl.deleteEventTag
);

// New profile-based event routes
eventRouter.get("/profile/:user_id", eventProfileController.getEventsByUserProfile);
eventRouter.get("/availability/:user_id", eventProfileController.getEventsByUserAvailability);

// Filter events by user profile
eventRouter.get("/events/filter/:user_id", eventControl.filterEventsByUserProfile);

// Get all recommended events for a user
eventRouter.get("/events/recommended/:user_id", eventControl.filterRecommendedEvents);

// Requirements routes for events
eventRouter.get("/events/:event_id/requirements", eventControl.getRequirementsByEventId);
eventRouter.put("/events/:event_id/requirements", eventControl.updateRequirementsByEventId);

module.exports = eventRouter;
