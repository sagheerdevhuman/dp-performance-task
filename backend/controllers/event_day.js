require("dotenv").config();
const { Op } = require("sequelize");
const {Event, Event_Day} = require("../models");

/*-------------EVENT-CONTROLLERS-------------*/
const addEventDay = async(req,res)=>{
  const { event_id } = req.params;
  const {
    days,
  } = req.body;
  try{
    /*--------------Create-new-Event-Days--------------*/
    const event_days = await Event_Day.bulkCreate(days);
    
    return res.status(404).json({ message: "Event Day Created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getAllEventDays = async (req, res) => {
  try {
    /*-------------Retreive-all-Event-Days-------------*/
    const event_days = await Event_Day.findAll();
    return res.json(event_days);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEventDaybyId = async (req, res) => {
  const { event_day_id } = req.params;
  try {
    /*---------------Find-Event-Days-by-ID---------------*/
    const event_day = await Event_Day.findOne({
      where: { id: event_day_id },
    });
    if (event_day) {
      return res.json(event_day);
    }
    return res.status(404).json({ message: "Event not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEventDaysbyEvent = async (req, res) => {
  const { event_id } = req.params;
  try {
    /*---------------Find-Event-Days-by-Event-------------------*/
    const event_days = await Event_Days.findAll({
      where: { event_id: event_id },
    });
    if (event_days) {
      return res.json(event_days);
    }
    return res.status(404).json({ message: "Event not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEventDaysbyOrg = async (req, res) => {
  const { org_id } = req.params;
  try {
    /*---------------Find-Event-Days-by-Organization---------------*/
    const event = await Event.findOne({
      where: { org_id: org_id },
    });
    if (event) {
      return res.json(event);
    }
    return res.status(404).json({ message: "Event not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEventDay = async (req, res) => {
  const { event_day_id } = req.params;
  const {
    date,
    start_time,
    end_time,
  } = req.body;
  try {
    /*--------------Update-Event-Day-by-Event-ID--------------*/
    const even_day = await Event_Day.findOne({
      where: { id: event_day_id },
    });
    even_day.date = date;
    even_day.start_time = start_time;
    even_day.end_time = end_time;
    
    await even_day.save();
    if (even_day) {
      return res.json(even_day);
    }
    return res.status(404).json({ message: "Event Day not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEventDay = async (req, res) => {
  const { event_day_id } = req.params;
  try {
    /*---------------Delete-an-Event-Day---------------*/
    const event_day = await Event_Day.findOne({
      where: { id: event_day_id },
    });

    await event_day.destroy();

    return res.json("Event Day deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addEventDay,
  getAllEventDays,
  getEventDaysbyEvent,
  getEventDaybyId,
  // getEventDaysbyOrg,
  deleteEventDay,
  updateEventDay,
};
