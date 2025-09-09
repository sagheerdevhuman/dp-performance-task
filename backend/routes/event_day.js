const { Router } = require("express");
const event_dayRouter = Router();
const event_dayControl = require("../controllers/event_day");

const corsHeader = require("../config/corsHeader");

/*-------------------ORGANIZATION-ROUTES-------------------*/

event_dayRouter.use(corsHeader);

event_dayRouter.post(
  "/event_day/:event_id/addEventDay",
  event_dayControl.addEventDay
);

event_dayRouter.get("/event_days", event_dayControl.getAllEventDays);

event_dayRouter.get(
  "/event_day/:event_id",
  event_dayControl.getEventDaybyId
);

event_dayRouter.put(
  "/event_day/:event_day_id/Day",
  event_dayControl.updateEventDay
);

event_dayRouter.delete(
  "/event_day/:event_day_id/Day",
  event_dayControl.deleteEventDay
);

event_dayRouter.get(
  "/event_day/:org_id/events",
  event_dayControl.getEventDaysbyEvent
);

// event_dayRouter.get(
//   "/event_day/:org_id/orgs",
//   [checkForAccessToken],
//   event_dayControl.getEvent_DaysbyOrg
// );

module.exports = event_dayRouter;
