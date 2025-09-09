require("dotenv").config();
const { Op } = require("sequelize");
const {
  Profile,
  User,
  Profile_Tag,
  Tag,
  Profile_Interest,
  Interest,
  Profile_Career,
  Career,
  Profile_Skill,
  Skill,
  Profile_Role,
  Role,
} = require("../models");


/*-------------PROFILE-CONTROLLERS-------------*/
const addProfile = async (req, res) => {
  const {
    user_id,
    past_experience,
    portfolio,
    education_level,
    college_in_stem,
    income_level,
    date_of_birth,
    gender,
    address,
    zipcode,
  } = req.body;
  try {
     const user = await User.findOne({
        where: { user_id: user_id },
      });
      user.profile_cofirmed=true;
      await user.save();
      console.log("user",user);
    if (user) {
      /*--------------Create-new-Profile--------------*/
      const profile = await Profile.create({
        user_id:user_id,
        past_experience:past_experience,
        portfolio:portfolio,
        education_level:education_level,
        college_in_stem:college_in_stem,
        income_level:income_level,
        date_of_birth:date_of_birth,
        gender:gender,
        address:address,
        zipcode:zipcode,
      });
      await profile.save();
      if(profile){
        return res.status(200).json({ message: "Profile Created" });
      }
    }
    return res
      .status(404)
      .json({ message: "User with that id not found!!!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  const {
    user_id,
    past_experience,
    portfolio,
    education_level,
    college_in_stem,
    income_level,
    date_of_birth,
    gender,
    address,
    zipcode,
    availability,
    learning_style,
    preferred_language,
    desired_skills,
    desired_tags,
  } = req.body;
  try {
    const user = await User.findOne({
       where:{ user_id: user_id }
    });
      if(user){
        /*--------------Update-Profile--------------*/
        const profile = await Profile.findOne({
          where: { user_id: user_id },

        });
        if (profile) {
          profile.user_id=user_id;
          profile.past_experience=past_experience;
          profile.portfolio=portfolio;
          profile.education_level=education_level;
          profile.college_in_stem=college_in_stem;
          profile.income_level=income_level;
          profile.date_of_birth=date_of_birth;
          profile.gender=gender;
          profile.address=address;
          profile.zipcode=zipcode;
          profile.availability=availability;
          profile.learning_style=learning_style;
          profile.preferred_language=preferred_language;
          await profile.save();
          if (desired_skills){
            desired_skills.map((x) => {
              x.profile_id = profile.profile_id;
              return x;
            });
            const profile_skills = await Profile_Skill.bulkCreate(desired_skills);
          } 
          if (desired_tags){
            desired_tags.map((x) => {
              x.profile_id = profile.profile_id;
              return x;
            });
            const profile_tags = await Profile_Tag.bulkCreate(desired_tags);
          }

          return res.json(profile);
        }
        return res.status(404).json({ message: "Profile not found!" });
      }
    return res.status(404).json({ message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePreferences = async (req, res) => {
  const {
    user_id,
    availability,
    learning_style,
    preferred_language,
    desired_skills,
    desired_tags,
  } = req.body;
  try {
    const user = await User.findOne({
       where:{ user_id: user_id }
    });
      if(user){
        user.settings_confirmed=true;
        await user.save();
        /*--------------Update-Profile--------------*/
        const profile = await Profile.findOne({
          where: { user_id: user.user_id },

        });
        if (profile) {
          profile.user_id=user.user_id;
          // profile.availability=availability;
          profile.learning_style=learning_style;
          profile.preferred_language=preferred_language;
          await profile.save();
          if (profile) {
            if(desired_skills){
              desired_skills.map((x) => {
                x.profile_id = profile.profile_id;
                return x;
              });
              const profile_skills = await Profile_Skill.bulkCreate(desired_skills);
              if (desired_tags) {
                desired_tags.map((x) => {
                  x.profile_id = profile.profile_id;
                  return x;
                });
                const profile_tags = await Profile_Tag.bulkCreate(desired_tags);
              }

            }
            
          }

          return res.json(profile);
        }
        return res.status(404).json({ message: "Profile not found!" });
      }
    return res.status(404).json({ message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// const updatePreferences = async (req, res) => {
//   const { event_id } = req.params;
//   const {
//     name,
//     description,
//     location,
//     rsvp_link,
//     days,
//     banner_url,
//     is_virtual,
//     is_featured,
//     user_id,
//     tags,
//     org_id
//   } = req.body;
//   try {
//     const user = await User.findOne({
//        where:{ user_id: user_id }
//     });
//       if(
//         (user.is_meta_admin=true)||
//         (user.is_bxdp_admin==true)||
//         (user.is_org_admin==true && user.org_id == org_id)||
//         (user.is_org_admin==true&& user.org_id == org_id
//       )){
//         /*--------------Update-Event-by-ID--------------*/
//         const event = await Event.findOne({
//           where: { event_id: event_id },
//           include: "event_days",
//         });
//         if (event) {
//           event.name = name;
//           event.description = description;
//           event.location = location;
//           event.rsvp_link = rsvp_link;
//           event.banner_url=banner_url;
//           event.is_virtual=is_virtual;
//           await event.save();
//           if (event) {
//             await Event_Day.destroy({
//               where: { event_id: event_id},
//             });
//             if(days){
//               days.map((x) => {
//                 x.event_id = event.event_id;
//                 return x;
//               });
//               const event_days = await Event_Day.bulkCreate(days);
//               if (tags) {
//                 tags.map((x) => {
//                   x.event_id = event.event_id;
//                   return x;
//                 });
//                 const event_tags = await Event_Tag.bulkCreate(tags);
//               }

//             }
            
//           }
//           const new_event = await Event.findOne({
//             where: { event_id: event_id },
//             include: ["event_days"]
//           });
//           return res.json(new_event);
//         }
//         return res.status(404).json({ message: "Event not found!" });
//       }
//     return res.status(404).json({ message: "User not found!" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


const getProfileByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    /*---------------Get-Profile-by-User-ID---------------*/
    const profile = await Profile.findOne({
      where: { user_id: user_id },
      
    });

    if (profile) {
      return res.json(profile);
    }
    return res.status(404).json({ message: "Profile not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    /*---------------Delete-an-Profile---------------*/
    const profile = await Profile.findOne({
      where: { user_id: user_id },
    });

    await profile.destroy();

    return res.json("Profile deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
addProfile,
updateProfile,
deleteProfile,
updatePreferences,
getProfileByUserId,
};



