require("dotenv").config();
const { Op } = require("sequelize");
const { Event, Event_Day, Organization, RSVP, User , Tag, Tag_Event, Case, E_Case, Profile, Requirements } = require("../models");


/*-------------EVENT-CONTROLLERS-------------*/
const addEvent = async (req, res) => {
  const { org_id } = req.params;
  const {
    name,
    description,
    location,
    rsvp_link,
    days,
    tags,
    banner_url,
    is_virtual,
    is_featured,
    user_id,
    past_experience,
    education_level,
    max_income_level,
    min_income,
    max_age,
    min_age,
    gender,
    experience_Level,
    city,
    zipcode,
    radius
  } = req.body;
  try {
    const org = await Organization.findOne({
      where: { org_id: org_id },
    });
    if (org) {
      const user = await User.findOne({
        where: { user_id: user_id },
      });

      let event;
      if (user.is_meta_admin==true) {
        /*--------------Create-new-Event--------------*/
        event = await Event.create({
          org_id: org_id,
          name: name,
          description: description,
          location: location,
          rsvp_link: rsvp_link,
          banner_url: banner_url,
          is_virtual: is_virtual,
          is_featured: is_featured,
          is_approved: true,
        });
        await event.save();
      } else {
        /*--------------Create-new-Event--------------*/
        event = await Event.create({
          org_id: org_id,
          name: name,
          description: description,
          location: location,
          rsvp_link: rsvp_link,
          banner_url: banner_url,
          is_virtual: is_virtual,
          is_featured: is_featured,
        });
        await event.save();
      }

      if (event) {
        // Create event days
        days.map((x) => {
          x.event_id = event.event_id;
          return x;
        });
        const event_days = await Event_Day.bulkCreate(days);

        // Create event tags if provided
        if (tags) {
          tags.map((x) => {
            x.event_id = event.event_id;
            return x;
          });
          const event_tags = await Tag_Event.bulkCreate(tags);
        }

        // Create event requirements
        const eventRequirements = await Requirements.create({
          past_experience: past_experience || false,
          education_level: education_level || 'any',
          max_income_level: max_income_level || null,
          min_income: min_income || null,
          max_age: max_age || null,
          min_age: min_age || null,
          gender: gender || 'any',
          experience_Level: experience_Level || 'any',
          city: city || null,
          zipcode: zipcode || null,
          radius: radius || null,
        });

        await eventRequirements.save();

        // Associate requirements with event
        await event.addEvent_requirements(eventRequirements);

        return res.status(200).json({ 
          message: "Event Created",
          event_id: event.event_id,
          requirements_id: eventRequirements.requirements_id
        });
      }
    }
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: error.message });
  }
};





const rsvp = async (req, res) => {
  const { event_id } = req.params;
  const { user_id } = req.body;
  try {
    // const attendee = await RSVP.findAll({
    //   where: {
    //     [Op.and]: [
    //       { event_id: event_id },
    //       { user_id:user_id },
    //     ],
    //   },
    // });
    // if (attendee) {
    //    return res.json( "Already RSVP'd!");
    // }
    const rsvp = await RSVP.create({
      event_id: event_id,
      user_id: user_id,
    });
    rsvp.save();
    return res.json("RSVP'd for Event!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRSVPs = async (req, res) => {
  const { event_id } = req.params;
  try {
    /*-------------Retreive-all-Programs-------------*/
    const event = await Event.findOne({
      where: { event_id: event_id },
      include: "rsvps",
    });
    return res.json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEventbyId = async (req, res) => {
  const { event_id } = req.params;
  try {
    /*---------------Find-Event-by-ID---------------*/
    const event = await Event.findOne({
      where: { event_id: event_id },
      include: ["organization", "event_days", "rsvps","tags","casses", "event_requirements"],
    });
    if (event) {
      return res.json(event);
    }
    return res.status(404).json({ message: "Event not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getEventsbyTag = async (req, res) => {
  const { tags } = req.body;

  try {
    /*---------------Find-Tag_Event-by-Tag---------------*/
    const filterd_tags = await Tag_Event.findAll({
      where: {
        tag_id: tags
      },
    });


    if(filterd_tags){

      const eventIds = filterd_tags.map(tag => tag.event_id);

      /*---------------Find-Event-by-Tag---------------*/
      const events = await Event.findAll({
        where: {
           [Op.and]: [
            { event_id: eventIds},
            { is_active: true },
            { is_approved: true },
          ],
        },
        include: ["organization", "event_days","tags"],
      });
      
      if (events) {

        return res.json(events);
      }
      return res.status(404).json({ message: "Eventmsnot found!" });
    }
    return res.status(404).json({ message: "Tags not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getAllEvents = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findOne({
      where: { user_id: user_id },
    });
    if (user.is_meta_admin == true || user.is_bxdp_admin == true ){
      /*-------------Retreive-all-Events-------------*/
      const events = await Event.findAll({
        include: ["organization", "event_days", "rsvps","tags","casses"],
      });
      if (events) {
        return res.json(events);
      }
    } else {
      const events = await Event.findAll({
        where: { org_id: user.org_id },
        include: ["organization", "event_days", "rsvps","tags","casses"],
      });
      if (events) {
        return res.json(events);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllActiveEvents = async (req, res) => {
  try {
    /*-------------Retreive-all-Events-------------*/
    const activeEvents = await Event.findAll({
      where: {
        [Op.and]: [{ is_active: true }, { is_approved: true }],
      },
      include: [
        "organization", 
        { model: Event_Day,
          as:"event_days",
          where:{ date:{[Op.gte]: new Date()}}
        },
        "tags",
        "casses"
      ],
    });
    return res.json(activeEvents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEventbyOrg = async (req, res) => {
  const { org_id } = req.params;
  try {
    const org = await Organization.findOne({
      where: { org_id: org_id },
    });
    if (org) {
      /*---------------Find-Event-by-Organization---------------*/
      const event = await Event.findOne({
        where: { org_id: org_id },
      });
      return res.json(event);
    }
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllActiveEventsByOrg = async (req, res) => {
  const { org_id } = req.params;
  try {
    const org = await Organization.findOne({
       where: {
        [Op.and]: [{ org_id: org_id }, { is_approved: true }],
      },
      
    });

    if (org) {
      /*-------------Retreive-all-Events-------------*/
      const activeEvents = await Event.findAll({
        where: {
          [Op.and]: [
            { org_id: org_id },
            { is_active: true },
            { is_approved: true },
          ],
        },
        include: ["organization", "event_days","tags","casses"]
      });
      return res.json({ activeEvents });
    }
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { event_id } = req.params;
  const {
    name,
    description,
    location,
    rsvp_link,
    days,
    banner_url,
    is_virtual,
    is_featured,
    user_id,
    tags,
    org_id
  } = req.body;
  try {
    const user = await User.findOne({
       where:{ user_id: user_id }
    });
      if(
        (user.is_meta_admin=true)||
        (user.is_bxdp_admin==true)||
        (user.is_org_admin==true && user.org_id == org_id)||
        (user.is_org_admin==true&& user.org_id == org_id
      )){
        /*--------------Update-Event-by-ID--------------*/
        const event = await Event.findOne({
          where: { event_id: event_id },
          include: "event_days",
        });
        if (event) {
          event.name = name;
          event.description = description;
          event.location = location;
          event.rsvp_link = rsvp_link;
          event.banner_url=banner_url;
          event.is_virtual=is_virtual;
          await event.save();
          if (event) {
            await Event_Day.destroy({
              where: { event_id: event_id},
            });
            if(days){
              days.map((x) => {
                x.event_id = event.event_id;
                return x;
              });
              const event_days = await Event_Day.bulkCreate(days);
              if (tags) {
                tags.map((x) => {
                  x.event_id = event.event_id;
                  return x;
                });
                const event_tags = await Event_Tag.bulkCreate(tags);
              }

            }
            
          }
          const new_event = await Event.findOne({
            where: { event_id: event_id },
            include: ["event_days"]
          });
          return res.json(new_event);
        }
        return res.status(404).json({ message: "Event not found!" });
      }
    return res.status(404).json({ message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const approveEvent = async (req, res) => {
  const { event_id } = req.params;
  try {
    /*--------------Approve-Event-by-ID--------------*/
    const event = await Event.findOne({
      where: { event_id: event_id },
    });
    if (event) {
      if (event.is_approved == true) {
        event.is_approved = false;
        await event.save();
        return res.json(event);
        
      } else if (event.is_approved == false) {
        event.is_approved = true;
        await event.save();
        return res.json(event);
      } 
    }
    return res.status(404).json({ message: "Event not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const rejectEvent = async (req, res) => {
  const { event_id } = req.params;
  const { user_id,reason} = req.body
  try {
    /*--------------Approve-Event-by-ID--------------*/
    const event = await Event.findOne({
      where: { event_id: event_id },
    });
    if (event) {
      if (event.is_rejected == true) {
        event.is_rejected = false;
        await event.save();
        return res.json(event);
        
      } else if (event.is_rejected == false) {
        const new_case = await Case.create({
          user_id:user_id,
          reason:reason
        })
        await new_case.save();
        if (new_case) {
          const add_case = await E_Case.create({
            event_id:event.event_id,
            case_id:new_case.case_id
          })
          console.log(add_case)
          event.is_rejected = true;
          await event.save();
          return res.json(event);
        }
      } 
    }
    return res.status(404).json({ message: "Event not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const featureEvent = async (req, res) => {
  const { event_id } = req.params;
  try {
    /*--------------Approve-Event-by-ID--------------*/
    const event = await Event.findOne({
      where: { event_id: event_id },
    });
    if (event) {
      if (event.is_featured == true) {
        event.is_featured = false;
        await event.save();
        return res.json(event);
        
      } else if (event.is_featured == false) {
        event.is_featured = true;
        await event.save();
        return res.json(event);
      } 
    }
    return res.status(404).json({ message: "Event not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteEvent = async (req, res) => {
  const { event_id } = req.params;
  try {
    /*---------------Delete-an-Event---------------*/
    const event = await Event.findOne({
      where: { event_id: event_id },
    });

    const rsvps = await RSVP.destroy({
      where: { event_id: event_id },
    });

    const tags = await Tag_Event.destroy({
      where: { event_id: event_id },
    });

    await event.destroy();

    return res.json("Event deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addEventTag = async (req, res) => {
  const { event_id } = req.params;
  const { tags } = req.body;
  try {
    const event = await Event.findOne({
      where: { event_id: event_id },
    });
    if (event) {
      tags.map((x) => {
        x.event_id = event.event_id;
        return x;
      });
      const event_tags = await Tag_Event.bulkCreate(tags);
      return res.json("Tags Created!!!");
    }
    return res.status(404).json("Event with that id not found!!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEventTag = async (req, res) => {
  const { event_id } = req.params;
  const { tag_id } = req.body;
  try {
    /*---------------Delete-an-E_Tag---------------*/
    const topic = await Tag_Event.destroy({
      where: {
        [Op.and]: [
          { tag_id: tag_id },
          { event_id: event_id }
        ],
      },
    });

    return res.json("Tag deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/*--------------Activate-Event------------------*/
const activateEvent = async (req, res) => {
  const { event_id } = req.params;

  try {
    /*-------------Retreive-Event-------------*/
    const event = await Event.findOne({
      where: { event_id: event_id },
    });


    console.log(event.is_active)

    /*-------------Dectivate-Event--------------*/
    if (event.is_active == true) {
      event.is_active = false;
      await event.save();
      return res.send({ message: "Event is activated!!!" });
    } else if (event.is_active == false){
       event.is_active = true;
      await event.save();
      return res.send({ message: "Event is deactivated!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Event with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const filterEventsByUserProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Find user and their profile with associated data
    const user = await User.findOne({
      where: { user_id },
      include: [{
        model: Profile,
        as: 'profile',
        include: ['interests', 'desired_careers', 'skills', 'tags']
      }]
    });

    if (!user || !user.profile) {
      return res.status(404).json({ message: "User or profile not found" });
    }

    // Get user profile attributes
    const profile = user.profile;
    // const userInterests = profile.interests.map(interest => interest.name.toLowerCase());
    // const userProfileTags = profile.tags ? profile.tags.map(tag => tag.name.toLowerCase()) : [];
    
    // Calculate user's age for requirements matching
    const userAge = profile.date_of_birth ? 
      Math.floor((new Date() - new Date(profile.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;

    // Find upcoming events
    const events = await Event.findAll({
      include: [
        'tags', 
        'organization', 
        {
          model: Event_Day,
          as:"event_days",
          where:{ date:{[Op.gte]: new Date()}}
        }, 
        {
          model: Requirements,
          as: 'event_requirements'
        }
      ],
      where: {
        [Op.and]: [
          { is_active: true },
          { is_approved: true }
        ]
      }
    });

    // Filter events based on qualification criteria
    const qualifiedEvents = events.map(event => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        meetsRequirements: true,
        // interestMatches: [],
        // tagMatches: [],
        requirementsSatisfied: [],
        requirementsNotMet: []
      };

      // Check if event hasn't ended
      // const eventDays = event.event_days || [];
      // const latestEventDay = eventDays.reduce((latest, day) => {
      //   return !latest || new Date(day.date) > new Date(latest.date) ? day : latest;
      // }, null);

      // if (!latestEventDay || new Date(latestEventDay.date) < new Date()) {
      //   return null; // Skip events that have ended
      // }
      // Check event requirements first
      if (event) {
        const req = event 
        console.log(req)
        // Only check requirements if they have age or education level requirements
        const hasAgeRequirement = userAge && (req.min_age || req.max_age);
        const hasEducationRequirement = req.education_level && req.education_level !== 'any';
        
        if (hasAgeRequirement || hasEducationRequirement) {
          // Education Level Check
          if (hasEducationRequirement) {
            const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];
            const reqLevel = educationLevels.indexOf(req.education_level);
            const userLevel = educationLevels.indexOf(profile.education_level);
            
            if (userLevel < reqLevel) {
              isQualified = false;
              qualificationDetails.requirementsNotMet.push('education_level');
            } else {
              qualificationDetails.requirementsSatisfied.push('education_level');
              score += 1;
            }
          }

          // Age Check
          if (hasAgeRequirement) {
            if ((req.min_age && userAge < req.min_age) || 
                (req.max_age && userAge > req.max_age)) {
              isQualified = false;
              qualificationDetails.requirementsNotMet.push('age');
            } else {
              qualificationDetails.requirementsSatisfied.push('age');
              score += 1;
            }
          }
        } else {
          // If event has requirements but no age or education requirements, it's automatically qualified
          qualificationDetails.requirementsSatisfied.push('no_age_education_requirements');
          score += 1;
        }
      } else {
        // If event has no requirements, it's automatically qualified
        qualificationDetails.requirementsSatisfied.push('no_requirements');
        score += 1;
      }

      // Virtual format preference (optional)
      if (profile.preferred_format === 'virtual' && event.is_virtual) {
        score += 1;
        qualificationDetails.requirementsSatisfied.push('virtual_format');
      }

      // Only return qualified events
      if (!isQualified) {
        return null;
      }

      return {
        ...event.toJSON(),
        qualificationScore: score,
        qualificationDetails
      };
    });

    // Filter out null entries (unqualified events) and sort by qualification score
    const filteredEvents = qualifiedEvents
      .filter(event => event !== null)
      .sort((a, b) => b.qualificationScore - a.qualificationScore);

    return res.status(200).json({
      qualified_events: filteredEvents,
      total_qualified: filteredEvents.length
    });
  } catch (error) {
    console.error("Error filtering qualified events:", error);
    return res.status(500).json({ message: error.message });
  }
};

const filterRecommendedEvents = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Find user and their profile with associated data
    const user = await User.findOne({
      where: { user_id },
      include: [{
        model: Profile,
        as: 'profile',
        include: ['interests', 'desired_careers', 'skills', 'tags']
      }]
    });

    if (!user || !user.profile) {
      return res.status(404).json({ message: "User or profile not found" });
    }

    // Get user profile attributes
    const profile = user.profile;
    const userInterests = profile.interests.map(interest => interest.name.toLowerCase());
    const userProfileTags = profile.tags ? profile.tags.map(tag => tag.name.toLowerCase()) : [];
    
    // Calculate user's age for requirements matching
    const userAge = profile.date_of_birth ? 
      Math.floor((new Date() - new Date(profile.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;

    // Find upcoming events
    const events = await Event.findAll({
      include: [
        'tags', 
        'organization', 
        { 
          model: Event_Day,
          as:"event_days",
          where:{ date:{[Op.gte]: new Date()}}
        },
        {
          model: Requirements,
          as: 'event_requirements'
        }
      ],
      where: {
        [Op.and]: [
          { is_active: true },
          { is_approved: true }
        ]
      }
    });

    // Filter events based on qualification criteria
    const recommendedEvents = events.map(event => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        meetsRequirements: true,
        interestMatches: [],
        tagMatches: [],
        requirementsSatisfied: [],
        requirementsNotMet: []
      };

      // Check if event hasn't ended
      // const eventDays = event.event_days || [];
      // const latestEventDay = eventDays.reduce((latest, day) => {
      //   return !latest || new Date(day.date) > new Date(latest.date) ? day : latest;
      // }, null);

      // if (!latestEventDay || new Date(latestEventDay.date) < new Date()) {
      //   return null; // Skip events that have ended
      // }
      // Check event requirements first
      if (event) {
        const req = event 
        console.log(req)
        // Only check requirements if they have age or education level requirements
        const hasAgeRequirement = userAge && (req.min_age || req.max_age);
        const hasEducationRequirement = req.education_level && req.education_level !== 'any';
        
        if (hasAgeRequirement || hasEducationRequirement) {
          // Education Level Check
          if (hasEducationRequirement) {
            const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];
            const reqLevel = educationLevels.indexOf(req.education_level);
            const userLevel = educationLevels.indexOf(profile.education_level);
            
            if (userLevel < reqLevel) {
              isQualified = false;
              qualificationDetails.requirementsNotMet.push('education_level');
            } else {
              qualificationDetails.requirementsSatisfied.push('education_level');
              score += 1;
            }
          }

          // Age Check
          if (hasAgeRequirement) {
            if ((req.min_age && userAge < req.min_age) || 
                (req.max_age && userAge > req.max_age)) {
              isQualified = false;
              qualificationDetails.requirementsNotMet.push('age');
            } else {
              qualificationDetails.requirementsSatisfied.push('age');
              score += 1;
            }
          }
        } else {
          // If event has requirements but no age or education requirements, it's automatically qualified
          qualificationDetails.requirementsSatisfied.push('no_age_education_requirements');
          score += 1;
        }
      } else {
        // If event has no requirements, it's automatically qualified
        qualificationDetails.requirementsSatisfied.push('no_requirements');
        score += 1;
      }

      // Virtual format preference (optional)
      if (profile.preferred_format === 'virtual' && event.is_virtual) {
        score += 1;
        qualificationDetails.requirementsSatisfied.push('virtual_format');
      }

      // Check interests and tags
      const eventTags = event.tags || [];
      
      // Interest matches
      const interestMatches = eventTags.filter(tag => 
        userInterests.includes(tag.name.toLowerCase())
      );
      if (interestMatches.length > 0) {
        score += interestMatches.length * 2;
        qualificationDetails.interestMatches = interestMatches.map(tag => tag.name);
      }

      // Profile tag matches
      const profileTagMatches = eventTags.filter(tag => 
        userProfileTags.includes(tag.name.toLowerCase())
      );
      if (profileTagMatches.length > 0) {
        score += profileTagMatches.length * 2;
        qualificationDetails.tagMatches = profileTagMatches.map(tag => tag.name);
      }

      // Only return qualified events
      if (!isQualified) {
        return null;
      }

      return {
        ...event.toJSON(),
        qualificationScore: score,
        qualificationDetails
      };
    });

    // Filter out null entries (unqualified events) and sort by qualification score
    const filteredEvents = recommendedEvents
      .filter(event => event !== null)
      .sort((a, b) => b.qualificationScore - a.qualificationScore);

    return res.status(200).json({
      recommended_events: filteredEvents,
      total_recommended: filteredEvents.length
    });
  } catch (error) {
    console.error("Error filtering qualified events:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get requirements by event ID
const getRequirementsByEventId = async (req, res) => {
  const { event_id } = req.params;
  
  try {
    const event = await Event.findOne({
      where: { event_id: event_id },
      include: [
        {
          model: Requirements,
          as: "event_requirements"
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    return res.status(200).json({
      event_id: event.event_id,
      event_name: event.name,
      requirements: event.event_requirements
    });
  } catch (error) {
    console.error("Error getting requirements by event ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update requirements by event ID
const updateRequirementsByEventId = async (req, res) => {
  const { event_id } = req.params;
  const {
    past_experience,
    education_level,
    max_income_level,
    min_income,
    max_age,
    min_age,
    gender,
    experience_Level,
    city,
    zipcode,
    radius
  } = req.body;

  try {
    const event = await Event.findOne({
      where: { event_id: event_id },
      include: [
        {
          model: Requirements,
          as: "event_requirements"
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    if (!event.event_requirements || event.event_requirements.length === 0) {
      return res.status(404).json({ message: "No requirements found for this event!" });
    }

    const requirements = event.event_requirements[0];

    // Update only provided fields
    if (past_experience !== undefined) requirements.past_experience = past_experience;
    if (education_level !== undefined) requirements.education_level = education_level;
    if (max_income_level !== undefined) requirements.max_income_level = max_income_level;
    if (min_income !== undefined) requirements.min_income = min_income;
    if (max_age !== undefined) requirements.max_age = max_age;
    if (min_age !== undefined) requirements.min_age = min_age;
    if (gender !== undefined) requirements.gender = gender;
    if (experience_Level !== undefined) requirements.experience_Level = experience_Level;
    if (city !== undefined) requirements.city = city;
    if (zipcode !== undefined) requirements.zipcode = zipcode;
    if (radius !== undefined) requirements.radius = radius;

    await requirements.save();

    return res.status(200).json({
      message: "Event requirements updated successfully!",
      event_id: event.event_id,
      event_name: event.name,
      requirements: requirements
    });
  } catch (error) {
    console.error("Error updating event requirements:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  activateEvent,
  addEvent,
  rsvp,
  getRSVPs,
  getAllEvents,
  getAllActiveEvents,
  getEventbyId,
  getEventbyOrg,
  getAllActiveEventsByOrg,
  updateEvent,
  deleteEvent,
  approveEvent,
  rejectEvent,
  featureEvent,
  getEventsbyTag,
  addEventTag,
  deleteEventTag,
  filterEventsByUserProfile,
  filterRecommendedEvents,
  getRequirementsByEventId,
  updateRequirementsByEventId
};
