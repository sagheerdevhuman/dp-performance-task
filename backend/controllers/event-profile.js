const { Op } = require("sequelize");
const { 
  Event, 
  Event_Day, 
  User, 
  Profile, 
  Tag, 
  Tag_Event,
  Interest,
  Profile_Interest
} = require("../models");

/**
 * Get events that match user profile elements
 * Matches based on:
 * - User interests (via tags)
 * - User availability
 * - User location (zipcode)
 * - User preferred language
 * - Virtual vs in-person preference
 */

const getEventsByUserProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Get user profile with interests
    const profile = await Profile.findOne({
      where: { user_id },
      include: [{
        model: Interest,
        as: "interests"
      }]
    });

    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Build query conditions
    const conditions = {
      is_active: true,
      is_approved: true
    };

    // Match virtual/in-person preference if specified
    if (profile.preferred_language) {
      conditions.is_virtual = true; // Prefer virtual events for language preference
    }

    // Get events with tags and event days
    const events = await Event.findAll({
      where: conditions,
      include: [
        {
          model: Tag,
          as: "tags",
          required: false,
          // Match events with tags that align with user interests
          where: profile.interests?.length > 0 ? {
            name: {
              [Op.in]: profile.interests.map(interest => interest.name)
            }
          } : undefined
        },
        {
          model: Event_Day,
          as: "event_days",
          required: true,
          where: profile.availability ? {
            // Match events on user's available times
            // This is a simplified example - you might want to make this more sophisticated
            date: {
              [Op.gte]: new Date()
            }
          } : undefined
        }
      ],
      order: [
        [{ model: Event_Day, as: "event_days" }, "date", "ASC"]
      ]
    });

    // Score and sort events based on match quality
    const scoredEvents = events.map(event => {
      let score = 0;
      
      // Score based on interest matches
      const interestMatches = event.tags.filter(tag => 
        profile.interests.some(interest => interest.name === tag.name)
      ).length;
      score += interestMatches * 2;

      // Score based on location proximity (if not virtual)
      if (!event.is_virtual && profile.zipcode && event.location) {
        // Simple zip code matching - first 3 digits for regional proximity
        const profileZipRegion = String(profile.zipcode).substring(0, 3);
        const eventZipRegion = event.location.match(/\d{5}/) ? 
          event.location.match(/\d{5}/)[0].substring(0, 3) : null;
        
        if (eventZipRegion && profileZipRegion === eventZipRegion) {
          score += 3;
        }
      }

      // Score virtual events if user has language preferences
      if (profile.preferred_language && event.is_virtual) {
        score += 1;
      }

      return {
        ...event.toJSON(),
        matchScore: score
      };
    });

    // Sort by match score (highest first)
    scoredEvents.sort((a, b) => b.matchScore - a.matchScore);

    return res.json(scoredEvents);

  } catch (error) {
    console.error("Error in getEventsByUserProfile:", error);
    return res.status(500).json({ 
      message: "Error finding matching events",
      error: error.message 
    });
  }
};

/**
 * Get upcoming events that match user's availability
 */

const getEventsByUserAvailability = async (req, res) => {
  const { user_id } = req.params;
  try {
    const profile = await Profile.findOne({
      where: { user_id }
    });

    if (!profile || !profile.availability) {
      return res.status(404).json({ 
        message: "User profile not found or no availability specified" 
      });
    }

    const events = await Event.findAll({
      where: {
        is_active: true,
        is_approved: true
      },
      include: [{
        model: Event_Day,
        as: "event_days",
        required: true,
        where: {
          date: {
            [Op.gte]: new Date()
          }
        }
      }],
      order: [
        [{ model: Event_Day, as: "event_days" }, "date", "ASC"]
      ]
    });

    return res.json(events);

  } catch (error) {
    console.error("Error in getEventsByUserAvailability:", error);
    return res.status(500).json({ 
      message: "Error finding events by availability",
      error: error.message 
    });
  }
};

module.exports = {
  getEventsByUserProfile,
  getEventsByUserAvailability
}; 