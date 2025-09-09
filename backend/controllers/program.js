require("dotenv").config();
const { Op } = require("sequelize");
const {
  Skill,
  Program,
  Topic,
  Organization,
  Applicant,
  User,
  Case,
  P_Case,
  Profile,
  Requirements,
  Event,
  Event_Day
} = require("../models");

/*-------------PROGRAM-CONTROLLERS-------------*/

const addProgram = async (req, res) => {
  const { org_id } = req.params;
  const {
    name,
    description,
    requirements,
    enrollment_deadline,
    start_date,
    end_date,
    start_time,
    end_time,
    location,
    week_days,
    video_call_link,
    skills,
    banner_url,
    is_virtual,
    is_featured,
    user_id,
    // New requirements fields
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

      // Create the program based on user role
      let program;
      if (user.is_meta_admin === true) {
        /*--------------Create-new-Program--------------*/
        program = await Program.create({
          org_id: org_id,
          name: name,
          description: description,
          requirements: requirements,
          enrollment_deadline: enrollment_deadline,
          start_date: start_date,
          end_date: end_date,
          location: location,
          start_time: start_time,
          week_days: week_days,
          end_time: end_time,
          video_call_link: video_call_link,
          banner_url: banner_url,
          is_virtual: is_virtual,
          is_featured: is_featured,
          is_approved: true,
        });
      } else {
        /*--------------Create-new-Program--------------*/
        program = await Program.create({
          org_id: org_id,
          name: name,
          description: description,
          requirements: requirements,
          enrollment_deadline: enrollment_deadline,
          start_date: start_date,
          end_date: end_date,
          location: location,
          start_time: start_time,
          week_days: week_days,
          end_time: end_time,
          video_call_link: video_call_link,
          banner_url: banner_url,
          is_virtual: is_virtual,
          is_featured: is_featured,
        });
      }

      await program.save();

      if (program) {
        // Create program skills
        if (skills && skills.length > 0) {
          skills.map((x) => {
            x.program_id = program.program_id;
            return x;
          });
          await Topic.bulkCreate(skills);
        }

        // Create program requirements
        const programRequirements = await Requirements.create({
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

        await programRequirements.save();

        // Associate requirements with program
        await program.addProgram_requirements(programRequirements);

        return res.status(200).json({ 
          message: "Program Created",
          program_id: program.program_id,
          requirements_id: programRequirements.requirements_id
        });
      }
    }

    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    console.error("Error creating program:", error);
    return res.status(500).json({ message: error.message });
  }
};

const apply = async (req, res) => {
  const { program_id } = req.params;
  const { user_id } = req.body;
  try {
    // const applicant = await Applicant.findAll({
    //   where: {
    //     program_id: program_id,
    //     user_id:user_id ,
    //   },
    // });
    // if (applicant) {
    //    return res.json( "Already applied!");
    // }
    const application = await Applicant.create({
      user_id: user_id,
      program_id: program_id,
    });
    application.save();
    return res.json("Applied successfuly!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addTopic = async (req, res) => {
  const { program_id } = req.params;
  const { skills, description } = req.body;
  try {
    const program = await Program.findOne({
      where: { program_id: program_id },
    });
    if (program) {
      skills.map((x) => {
        x.program_id = program.program_id;
        return x;
      });
      const program_skills = await Topic.bulkCreate(skills);
      return res.json("Topics Created!!!");
    }
    return res.status(404).json("Program with that id not found!!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllApplicants = async (req, res) => {
  const { program_id } = req.params;
  try {
    /*-------------Retreive-all-Programs-------------*/
    const program = await Program.findOne({
      where: { program_id: program_id },
      include: ["applicants","casses"]
    });
    return res.json(program);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllPrograms = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findOne({
      where: { user_id: user_id },
    });
    if (user.is_meta_admin == true || user.is_bxdp_admin == true ) {
      /*-------------Retreive-all-Programs-------------*/
      const programs = await Program.findAll({
        include: ["skills", "organization", "applicants","casses","program_requirements"],
      });
      if (programs) {
        return res.json(programs);
      }
    } else {
      const programs = await Program.findAll({
        where: { org_id: user.org_id },
        include: ["skills", "organization", "applicants","casses","program_requirements"],
      });
      if (programs) {
        return res.json(programs);
      }
    }
    return res.json(programs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllActivePrograms = async (req, res) => {
  try {
    /*-------------Retreive-all-Programs-------------*/
    const activePrograms = await Program.findAll({
      where: {
        [Op.and]: [{ is_active: true }, { is_approved: true }],
        end_date: {
          [Op.gte]: new Date()
        }
      },
      include: ["skills"],
    });
    return res.json(activePrograms);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllActiveProgramsByOrg = async (req, res) => {
  const { org_id } = req.params;
  try {
    const org = await Organization.findOne({
      where: { org_id: org_id },
    });

    if (org) {
      /*-------------Retreive-all-Events-------------*/
      const activePrograms = await Program.findAll({
        where: {
          [Op.and]: [
            { org_id: org_id },
            { is_active: true },
            { is_approved: true },
          ],
        },
        include: "casses"
      });
      return res.json({ activePrograms });
    }
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProgrambyId = async (req, res) => {
  const { program_id } = req.params;
  try {
    /*---------------Find-Program-by-ID---------------*/
    const program = await Program.findOne({
      where: { program_id: program_id },
      include: ["skills", "organization", "applicants","program_requirements"],
    });
    if (program) {
      return res.status(200).json(program);
    }
    return res.status(404).json({ message: "Program not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProgramsbyOrg = async (req, res) => {
  const { org_id } = req.params;
  try {
    /*---------------Find-Program-by-Organization---------------*/
    const program = await Program.findAll({
      where: { org_id: org_id },
    });
    if (program) {
      return res.json(program);
    }
    return res.status(404).json({ message: "Program not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getProgramsbySkill = async (req, res) => {
  const { skills } = req.body;
 
  try {
    
    /*---------------Find-Topics-by-Organization---------------*/
    const topics = await Topic.findAll({
      where: {
          skill_id: skills
      },
    });

    if (topics) {

      const list = topics.map(topic => topic.program_id);

      /*---------------Find-Programs-by-Organization---------------*/
      const programs = await Program.findAll({

        where: {
          [Op.and]: [
            { program_id: list},
            { is_active: true },
            { is_approved: true },
          ],
        },
        include:["skills",]
      });

      if(programs){
        return res.json(programs);
      }

      
    }
    return res.status(404).json({ message: "Programs not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const approveProgram = async (req, res) => {
  const { program_id } = req.params;
  try {
    /*--------------Update-Program-by-ID--------------*/
    const program = await Program.findOne({
      where: { program_id: program_id },
    });
    if (program) {
      if (program.is_approved == true) {
        program.is_approved = false;
        await program.save();
        return res.json(program);
        
      } else if (program.is_approved == false) {
        program.is_approved = true;
        await program.save();
        return res.json(program);
      } 
    }
    return res.status(404).json({ message: "Program not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const rejectProgram = async (req, res) => {
  const { program_id } = req.params;
  const { user_id,reason} = req.body;
  try {
    /*--------------Update-Program-by-ID--------------*/
    const program = await Program.findOne({
      where: { program_id: program_id },
    });
    if (program) {
      if (program.is_rejected == true) {
        program.is_rejected = false;
        await program.save();
        return res.json(program);
        
      } else if (program.is_rejected == false) {
        const new_case = await Case.create({
          user_id:user_id,
          reason:reason
        })
        await new_case.save();
        if (new_case) {
          const add_case = await P_Case.create({
            program_id:program.program_id,
            case_id:new_case.case_id
          })
          console.log(add_case)
          program.is_rejected = true;
          await program.save();
          return res.json(program);
        }
      } 
    }
    return res.status(404).json({ message: "Program not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const featureProgram = async (req, res) => {
  const { program_id } = req.params;
  try {
    /*--------------Update-Program-by-ID--------------*/
    const program = await Program.findOne({
      where: { program_id: program_id },
    });
    if (program) {
      if (program.is_featured == true) {
        program.is_featured = false;
        await program.save();
        return res.json(program);
        
      } else if (program.is_featured == false) {
        program.is_featured = true;
        await program.save();
        return res.json(program);
      } 
    }
    return res.status(404).json({ message: "Program not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProgram = async (req, res) => {
  const { program_id } = req.params;
  const {
   name,
    description,
    requirements,
    enrollment_deadline,
    start_date,
    end_date,
    start_time,
    end_time,
    location,
    video_call_link,
    banner_url,
    is_virtual,
    is_featured,
    user_id,
    week_days,
    org_id,
  } = req.body;
  try {
    
    const user = await User.findOne({
       where:{ user_id: user_id }
    });
    console.log(user)
      if(
        (user.is_meta_admin=true)||
        (user.is_bxdp_admin==true)||
        (user.is_org_admin==true && user.org_id == org_id)||
        (user.is_org_admin==true&& user.org_id == org_id
      )){
        /*--------------Update-Program-by-ID--------------*/
        const program = await Program.findOne({
          where: { program_id: program_id },
        });

        if (program) {
          program.name = name;
          program.description = description;
          program.requirements = requirements;
          program.enrollment_deadline = enrollment_deadline;
          program.start_date = start_date;
          program.end_date = end_date;
          program.start_time = start_time;
          program.end_time = end_time;
          program.banner_url=banner_url;
          program.video_call_link = video_call_link;
          program.is_virtual = is_virtual;
          await program.save();
          return res.status(200).json(program);
        }
        return res.status(404).json({ message: "Program not found!" });
      }
    return res.status(404).json({ message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updateTopic = async (req, res) => {
  const { topic_id } = req.params;
  const { name, description } = req.body;
  try {
    const topic = Topic.findOne({
      where: { id: topic_id },
    });

    if (name) {
      let skill = await Skill.create({
        name: name,
      });
      await skill.save();
      topic.SkillID = skill.id;
      await topic.save();
      return res.json(topic);
    }
    if (description) {
      topic.description = skill.id;
      await topic.save();
      return res.status(200).json(topic);
    }
    return res.status(404).json({ message: "Topic not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProgram = async (req, res) => {
  const { program_id } = req.params;
  try {
    /*---------------Delete-an-Program---------------*/
    const program = await Program.findOne({
      where: { program_id: program_id },
    });

    const applications = await Applicant.destroy({
      where: { program_id: program_id },
    });
    const topics = await Topic.destroy({
      where: { program_id: program_id },
    });

    await program.destroy();

    return res.json("Program deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTopic = async (req, res) => {
  const { program_id } = req.params;
  const { skill_id } = req.body;
  try {
    /*---------------Delete-an-Program---------------*/
    const topic = await Topic.destroy({
      where: {
        [Op.and]: [
          { program_id: program_id },
          { skill_id: skill_id }
        ],
      },
    });

    return res.json("Topic deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/*--------------Activate-Program------------------*/
const activateProgram = async (req, res) => {
  const { program_id } = req.params;

  try {
    /*-------------Retreive-Program-------------*/
    const program = await Program.findOne({
      where: { program_id: program_id },
    });



    /*-------------Dectivate-Program--------------*/
    if (program.is_active == true) {
      program.is_active = false;
      await program.save();
      return res.send({ message: "Program is activated!!!" });
    } else if (program.is_active == false){
       program.is_active = true;
      await program.save();
      return res.send({ message: "Program is deactivated!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Program with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const filterProgramsByUserProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Find user and their profile with associated data
    const user = await User.findOne({
      where: { user_id },
      include: [{
        model: Profile,
        as: 'profile',
        include: ['skills', 'desired_careers', 'desired_roles', 'interests']
      }]
    });

    if (!user || !user.profile) {
      return res.status(404).json({ message: "User or profile not found" });
    }

    // Get user profile attributes
    const profile = user.profile;
    // const userSkills = profile.skills.map(skill => skill.skill_id);
    
    // Calculate user's age
    const userAge = profile.date_of_birth ? 
      Math.floor((new Date() - new Date(profile.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;
    
    // Find active and approved programs
    const programs = await Program.findAll({
      include: [
        'skills', 
        'organization',
        {
          model: Requirements,
          as: 'program_requirements'
        }
      ],
      where: {
        [Op.and]: [
          { is_active: true },
          { is_approved: true },
          { end_date: { [Op.gte]: new Date() } }
        ]
      }
    });

    // Filter programs based on qualification criteria
    const qualifiedPrograms = programs.map(program => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        meetsRequirements: true,
        skillMatches: [],
        requirementsSatisfied: [],
        requirementsNotMet: []
      };

      // Check program requirements first
      if (program) {
        const req = program 
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
          // If program has requirements but no age or education requirements, it's automatically qualified
          qualificationDetails.requirementsSatisfied.push('no_age_education_requirements');
          score += 1;
        }
      } else {
        // If program has no requirements, it's automatically qualified
        qualificationDetails.requirementsSatisfied.push('no_requirements');
        score += 1;
      }

      // // Check skill matches (optional but affects score)
      // const programSkills = program.skills.map(skill => skill.skill_id);
      // const matchingSkills = programSkills.filter(skillId => userSkills.includes(skillId));
      // qualificationDetails.skillMatches = matchingSkills;
      // score += matchingSkills.length * 2;

      // Only return qualified programs
      if (!isQualified) {
        return null;
      }

      return {
        ...program.toJSON(),
        qualificationScore: score,
        qualificationDetails
      };
    });

    // Filter out null entries (unqualified programs) and sort by qualification score
    const filteredPrograms = qualifiedPrograms
      .filter(program => program !== null)
      .sort((a, b) => b.qualificationScore - a.qualificationScore);

    return res.status(200).json({
      qualified_programs: filteredPrograms,
      total_qualified: filteredPrograms.length
    });
  } catch (error) {
    console.error("Error filtering qualified programs:", error);
    return res.status(500).json({ message: error.message });
  }
};

const filterRecommendedPrograms = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Find user and their profile with associated data
    const user = await User.findOne({
      where: { user_id },
      include: [{
        model: Profile,
        as: 'profile',
        include: ['skills', 'desired_careers', 'desired_roles', 'interests']
      }]
    });

    if (!user || !user.profile) {
      return res.status(404).json({ message: "User or profile not found" });
    }

    // Get user profile attributes
    const profile = user.profile;
    const userSkills = profile.skills.map(skill => skill.skill_id);
    
    // Calculate user's age
    const userAge = profile.date_of_birth ? 
      Math.floor((new Date() - new Date(profile.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;
    
    // Find active and approved programs
    const programs = await Program.findAll({
      include: [
        'skills', 
        'organization',
        {
          model: Requirements,
          as: 'program_requirements'
        }
      ],
      where: {
        [Op.and]: [
          { is_active: true },
          { is_approved: true },
          { end_date: { [Op.gte]: new Date() } }
        ]
      }
    });

    // Filter programs based on qualification criteria
    const recommendedPrograms = programs.map(program => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        meetsRequirements: true,
        skillMatches: [],
        requirementsSatisfied: [],
        requirementsNotMet: []
      };

      // Check program requirements first
      if (program) {
        const req = program 
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
          // If program has requirements but no age or education requirements, it's automatically qualified
          qualificationDetails.requirementsSatisfied.push('no_age_education_requirements');
          score += 1;
        }
      } else {
        // If program has no requirements, it's automatically qualified
        qualificationDetails.requirementsSatisfied.push('no_requirements');
        score += 1;
      }

      // Check skill matches (optional but affects score)
      const programSkills = program.skills.map(skill => skill.skill_id);
      const matchingSkills = programSkills.filter(skillId => userSkills.includes(skillId));
      qualificationDetails.skillMatches = matchingSkills;
      score += matchingSkills.length * 2;

      // Only return qualified programs
      if (!isQualified) {
        return null;
      }

      return {
        ...program.toJSON(),
        qualificationScore: score,
        qualificationDetails
      };
    });

    // Filter out null entries (unqualified programs) and sort by qualification score
    const filteredPrograms = recommendedPrograms
      .filter(program => program !== null)
      .sort((a, b) => b.qualificationScore - a.qualificationScore);

    return res.status(200).json({
      recommended_programs: filteredPrograms,
      total_recommended: filteredPrograms.length
    });
  } catch (error) {
    console.error("Error filtering qualified programs:", error);
    return res.status(500).json({ message: error.message });
  }
};
const getAllQualifiedContent = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Find user and their profile with associated data
    const user = await User.findOne({
      where: { user_id },
      include: [{
        model: Profile,
        as: 'profile',
        include: ['skills', 'interests', 'desired_careers', 'tags']
      }]
    });

    if (!user || !user.profile) {
      return res.status(404).json({ message: "User or profile not found" });
    }

    // Get user profile attributes
    const profile = user.profile;
    // const userSkills = profile.skills.map(skill => skill.skill_id);
    // const userInterests = profile.interests.map(interest => interest.name.toLowerCase());
    // const userProfileTags = profile.tags ? profile.tags.map(tag => tag.name.toLowerCase()) : [];
    
    // Calculate user's age
    const userAge = profile.date_of_birth ? 
      Math.floor((new Date() - new Date(profile.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;

    // Get all active programs
    const programs = await Program.findAll({
      include: [
        'skills',
        'organization',
        {
          model: Requirements,
          as: 'program_requirements'
        }
      ],
      where: {
        [Op.and]: [
          { is_active: true },
          { is_approved: true },
          { end_date: { [Op.gte]: new Date() } }
        ]
      }
    });

    // Get all active events
    const events = await Event.findAll({
      include: [
        'tags',
        'organization',
        'event_days',
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

    // Filter qualified programs
    const qualifiedPrograms = programs.map(program => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        type: 'program',
        requirementsSatisfied: [],
        requirementsNotMet: [],
        // skillMatches: []
      };

      if (program.program_requirements && program.program_requirements.length > 0) {
        const req = program.program_requirements[0];

        // Education Level Check
        if (req.education_level && req.education_level !== 'any') {
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

        // Income Level Check
        if (req.max_income_level || req.min_income) {
          const userIncome = parseInt(profile.income_level?.replace(/[^0-9]/g, '') || '0');
          if ((req.min_income && userIncome < req.min_income) || 
              (req.max_income_level && userIncome > req.max_income_level)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('income_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('income_level');
            score += 1;
          }
        }

        // Age Check
        if (userAge && (req.min_age || req.max_age)) {
          if ((req.min_age && userAge < req.min_age) || 
              (req.max_age && userAge > req.max_age)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('age');
          } else {
            qualificationDetails.requirementsSatisfied.push('age');
            score += 1;
          }
        }

        // Gender Check
        if (req.gender && req.gender !== 'any') {
          if (req.gender.toLowerCase() !== profile.gender?.toLowerCase()) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('gender');
          } else {
            qualificationDetails.requirementsSatisfied.push('gender');
            score += 1;
          }
        }

        // Experience Level Check
        if (req.experience_Level && req.experience_Level !== 'any') {
          if (req.experience_Level.toLowerCase() !== profile.experience_Level?.toLowerCase()) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('experience_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('experience_level');
            score += 2;
          }
        }

        // Past Experience Check
        if (req.past_experience === true) {
          if (!profile.past_experience) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('past_experience');
          } else {
            qualificationDetails.requirementsSatisfied.push('past_experience');
            score += 1;
          }
        }
      }

      // Check skill matches
      // const programSkills = program.skills.map(skill => skill.skill_id);
      // const matchingSkills = programSkills.filter(skillId => userSkills.includes(skillId));
      // if (matchingSkills.length > 0) {
      //   score += matchingSkills.length * 2;
      //   qualificationDetails.skillMatches = matchingSkills;
      // }

      if (!isQualified) {
        return null;
      }

      return {
        id: program.program_id,
        type: 'program',
        name: program.name,
        banner_url: program.banner_url,
        description: program.description,
        organization: program.organization,
        week_days: program.week_days,
        start_date: program.start_date,
        end_date: program.end_date,
        start_time: program.start_time,
        end_time: program.end_time,
        qualificationScore: score,
        qualificationDetails
      };
    }).filter(program => program !== null);

    // Filter qualified events
    const qualifiedEvents = events.map(event => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        type: 'event',
        requirementsSatisfied: [],
        requirementsNotMet: [],
        // interestMatches: [],
        // tagMatches: []
      };

      // Check if event hasn't ended
      const eventDays = event.event_days || [];
      const latestEventDay = eventDays.reduce((latest, day) => {
        return !latest || new Date(day.date) > new Date(latest.date) ? day : latest;
      }, null);

      if (!latestEventDay || new Date(latestEventDay.date) < new Date()) {
        return null;
      }

      if (event.event_requirements && event.event_requirements.length > 0) {
        const req = event.event_requirements[0];

        // Education Level Check
        if (req.education_level && req.education_level !== 'any') {
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

        // Income Level Check
        if (req.max_income_level || req.min_income) {
          const userIncome = parseInt(profile.income_level?.replace(/[^0-9]/g, '') || '0');
          if ((req.min_income && userIncome < req.min_income) || 
              (req.max_income_level && userIncome > req.max_income_level)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('income_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('income_level');
            score += 1;
          }
        }

        // Other requirement checks...
        // (Similar to program requirements)
      }

      // Check interests and tags
      // const eventTags = event.tags || [];
      
      // Interest matches
      // const interestMatches = eventTags.filter(tag => 
      //   userInterests.includes(tag.name.toLowerCase())
      // );
      // if (interestMatches.length > 0) {
      //   score += interestMatches.length * 2;
      //   qualificationDetails.interestMatches = interestMatches.map(tag => tag.name);
      // }

      // Profile tag matches
      // const profileTagMatches = eventTags.filter(tag => 
      //   userProfileTags.includes(tag.name.toLowerCase())
      // );
      // if (profileTagMatches.length > 0) {
      //   score += profileTagMatches.length * 2;
      //   qualificationDetails.tagMatches = profileTagMatches.map(tag => tag.name);
      // }

      if (!isQualified) {
        return null;
      }

      return {
        id: event.event_id,
        type: 'event',
        name: event.name,
        description: event.description,
        organization: event.organization,
        banner_url: event.banner_url,
        event_days: event.event_days,
        date: latestEventDay.date,
        qualificationScore: score,
        qualificationDetails
      };
    }).filter(event => event !== null);

    // Combine and shuffle qualified content
    const allQualifiedContent = [...qualifiedPrograms, ...qualifiedEvents]
      .sort(() => Math.random() - 0.5); // Random shuffle

    return res.status(200).json({
      qualified_content: allQualifiedContent,
      total_qualified: allQualifiedContent.length,
      summary: {
        total_programs: qualifiedPrograms.length,
        total_events: qualifiedEvents.length
      }
    });

  } catch (error) {
    console.error("Error getting qualified content:", error);
    return res.status(500).json({ message: error.message });
  }
};


const getAllQualifiedFeaturedContent = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Find user and their profile with associated data
    const user = await User.findOne({
      where: { user_id },
      include: [{
        model: Profile,
        as: 'profile',
        include: ['skills', 'interests', 'desired_careers', 'tags']
      }]
    });

    if (!user || !user.profile) {
      return res.status(404).json({ message: "User or profile not found" });
    }

    // Get user profile attributes
    const profile = user.profile;
    const userSkills = profile.skills.map(skill => skill.skill_id);
    const userInterests = profile.interests.map(interest => interest.name.toLowerCase());
    const userProfileTags = profile.tags ? profile.tags.map(tag => tag.name.toLowerCase()) : [];
    
    // Calculate user's age
    const userAge = profile.date_of_birth ? 
      Math.floor((new Date() - new Date(profile.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;

    // Get all featured and active programs
    const programs = await Program.findAll({
      include: [
        'skills',
        'organization',
        {
          model: Requirements,
          as: 'program_requirements'
        }
      ],
      where: {
        [Op.and]: [
          { is_active: true },
          { is_approved: true },
          { is_featured: true },
          { end_date: { [Op.gte]: new Date() } }
        ]
      }
    });

    // Get all featured and active events
    const events = await Event.findAll({
      include: [
        'tags',
        'organization',
        { model: Event_Day,
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
          { is_approved: true },
          { is_featured: true },
            
        ]
      }
    });

    // Filter qualified programs
    const qualifiedPrograms = programs.map(program => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        type: 'program',
        requirementsSatisfied: [],
        requirementsNotMet: [],
        // skillMatches: []
      };

      if (program.program_requirements && program.program_requirements.length > 0) {
        const req = program.program_requirements[0];

        // Education Level Check
        if (req.education_level && req.education_level !== 'any' && req.education_level !== null) {
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

        // Income Level Check
        if (req.max_income_level || req.min_income) {
          const userIncome = parseInt(profile.income_level?.replace(/[^0-9]/g, '') || '0');
          if ((req.min_income && userIncome < req.min_income) || 
              (req.max_income_level && userIncome > req.max_income_level)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('income_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('income_level');
            score += 1;
          }
        }

        // Age Check
        if (userAge && (req.min_age || req.max_age)) {
          if ((req.min_age && userAge < req.min_age) || 
              (req.max_age && userAge > req.max_age)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('age');
          } else {
            qualificationDetails.requirementsSatisfied.push('age');
            score += 1;
          }
        }

        // Gender Check
        if (req.gender && req.gender !== 'any' && req.gender !== null) {
          if (req.gender.toLowerCase() !== profile.gender?.toLowerCase()) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('gender');
          } else {
            qualificationDetails.requirementsSatisfied.push('gender');
            score += 1;
          }
        }

        // Experience Level Check
        if (req.experience_Level && req.experience_Level !== 'any' && req.experience_Level !== null) {
          if (req.experience_Level.toLowerCase() !== profile.experience_Level?.toLowerCase()) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('experience_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('experience_level');
            score += 2;
          }
        }

        // Past Experience Check
        if (req.past_experience === true) {
          if (!profile.past_experience) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('past_experience');
          } else {
            qualificationDetails.requirementsSatisfied.push('past_experience');
            score += 1;
          }
        }
      }

      // Check skill matches
      // const programSkills = program.skills.map(skill => skill.skill_id);
      // const matchingSkills = programSkills.filter(skillId => userSkills.includes(skillId));
      // if (matchingSkills.length > 0) {
      //   score += matchingSkills.length * 2;
      //   qualificationDetails.skillMatches = matchingSkills;
      // }

      if (!isQualified) {
        return null;
      }

      return {
        id: program.program_id,
        type: 'program',
        name: program.name,
        banner_url: program.banner_url,
        description: program.description,
        organization: program.organization,
        week_days: program.week_days,
        start_date: program.start_date,
        end_date: program.end_date,
        start_time: program.start_time,
        end_time: program.end_time,
        qualificationScore: score,
        qualificationDetails
      };
    }).filter(program => program !== null);

    // Filter qualified events
    const qualifiedEvents = events.map(event => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        type: 'event',
        requirementsSatisfied: [],
        requirementsNotMet: [],
        // interestMatches: [],
        // tagMatches: []
      };

      // Check if event hasn't ended
      const eventDays = event.event_days || [];
      const latestEventDay = eventDays.reduce((latest, day) => {
        return !latest || new Date(day.date) > new Date(latest.date) ? day : latest;
      }, null);

      if (!latestEventDay || new Date(latestEventDay.date) < new Date()) {
        return null;
      }

      if (event.event_requirements && event.event_requirements.length > 0) {
        const req = event.event_requirements[0];

        // Education Level Check
        if (req.education_level && req.education_level !== 'any') {
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

        // Income Level Check
        if (req.max_income_level || req.min_income) {
          const userIncome = parseInt(profile.income_level?.replace(/[^0-9]/g, '') || '0');
          if ((req.min_income && userIncome < req.min_income) || 
              (req.max_income_level && userIncome > req.max_income_level)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('income_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('income_level');
            score += 1;
          }
        }

        // Other requirement checks...
        // (Similar to program requirements)
      }

      // Check interests and tags
      // const eventTags = event.tags || [];
      
      // // Interest matches
      // const interestMatches = eventTags.filter(tag => 
      //   userInterests.includes(tag.name.toLowerCase())
      // );
      // if (interestMatches.length > 0) {
      //   score += interestMatches.length * 2;
      //   qualificationDetails.interestMatches = interestMatches.map(tag => tag.name);
      // }

      // // Profile tag matches
      // const profileTagMatches = eventTags.filter(tag => 
      //   userProfileTags.includes(tag.name.toLowerCase())
      // );
      // if (profileTagMatches.length > 0) {
      //   score += profileTagMatches.length * 2;
      //   qualificationDetails.tagMatches = profileTagMatches.map(tag => tag.name);
      // }

      if (!isQualified) {
        return null;
      }

      return {
        id: event.event_id,
        type: 'event',
        name: event.name,
        event_days: event.event_days,
        banner_url: event.banner_url,
        description: event.description,
        organization: event.organization,
        date: latestEventDay.date,
        qualificationScore: score,
        qualificationDetails
      };
    }).filter(event => event !== null);

    // Combine and shuffle qualified content
    const allQualifiedFeaturedContent = [...qualifiedPrograms, ...qualifiedEvents]
      .sort(() => Math.random() - 0.5); // Random shuffle

    return res.status(200).json({
      qualified_featured_content: allQualifiedFeaturedContent,
      total_qualified: allQualifiedFeaturedContent.length,
      summary: {
        total_featured_programs: qualifiedPrograms.length,
        total_featured_events: qualifiedEvents.length
      }
    });

  } catch (error) {
    console.error("Error getting qualified featured content:", error);
    return res.status(500).json({ message: error.message });
  }
};
const getAllQualifiedContentByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Find user and their profile with associated data
    const user = await User.findOne({
      where: { user_id },
      include: [{
        model: Profile,
        as: 'profile',
        include: ['skills', 'interests', 'desired_careers', 'tags']
      }]
    });

    if (!user || !user.profile) {
      return res.status(404).json({ message: "User or profile not found" });
    }

    // Get user profile attributes
    const profile = user.profile;
    const userSkills = profile.skills.map(skill => skill.skill_id);
    const userInterests = profile.interests.map(interest => interest.name.toLowerCase());
    const userProfileTags = profile.tags ? profile.tags.map(tag => tag.name.toLowerCase()) : [];
    
    // Calculate user's age
    const userAge = profile.date_of_birth ? 
      Math.floor((new Date() - new Date(profile.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;

    // Get all active programs
    const programs = await Program.findAll({
      include: [
        'skills',
        'organization',
        {
          model: Requirements,
          as: 'program_requirements'
        }
      ],
      where: {
        [Op.and]: [
          { is_active: true },
          { is_approved: true },
          { end_date: { [Op.gte]: new Date() } }
        ]
      }
    });

    // Get all active events
    const events = await Event.findAll({
      include: [
        'tags',
        'organization',
        { model: Event_Day,
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

    // Filter qualified programs
    const qualifiedPrograms = programs.map(program => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        type: 'program',
        requirementsSatisfied: [],
        requirementsNotMet: [],
        skillMatches: []
      };

      if (program.program_requirements && program.program_requirements.length > 0) {
        const req = program.program_requirements[0];

        // Education Level Check
        if (req.education_level && req.education_level !== 'any' && req.education_level !== null) {
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

        // Income Level Check
        if (req.max_income_level || req.min_income) {
          const userIncome = parseInt(profile.income_level?.replace(/[^0-9]/g, '') || '0');
          if ((req.min_income && userIncome < req.min_income) || 
              (req.max_income_level && userIncome > req.max_income_level)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('income_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('income_level');
            score += 1;
          }
        }

        // Age Check
        if (userAge && (req.min_age || req.max_age)) {
          if ((req.min_age && userAge < req.min_age) || 
              (req.max_age && userAge > req.max_age)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('age');
          } else {
            qualificationDetails.requirementsSatisfied.push('age');
            score += 1;
          }
        }

        // Gender Check
        if (req.gender && req.gender !== 'any' && req.gender !== null) {
          if (req.gender.toLowerCase() !== profile.gender?.toLowerCase()) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('gender');
          } else {
            qualificationDetails.requirementsSatisfied.push('gender');
            score += 1;
          }
        }

        // Experience Level Check
        if (req.experience_Level && req.experience_Level !== 'any' && req.experience_Level !== null) {
          if (req.experience_Level.toLowerCase() !== profile.experience_Level?.toLowerCase()) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('experience_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('experience_level');
            score += 2;
          }
        }

        // Past Experience Check
        if (req.past_experience === true) {
          if (!profile.past_experience) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('past_experience');
          } else {
            qualificationDetails.requirementsSatisfied.push('past_experience');
            score += 1;
          }
        }
      }

      // Check skill matches
      const programSkills = program.skills.map(skill => skill.skill_id);
      const matchingSkills = programSkills.filter(skillId => userSkills.includes(skillId));
      if (matchingSkills.length > 0) {
        score += matchingSkills.length * 2;
        qualificationDetails.skillMatches = matchingSkills;
      }

      if (!isQualified) {
        return null;
      }

      return {
        id: program.program_id,
        type: 'program',
        name: program.name,
        banner_url: program.banner_url,
        description: program.description,
        organization: program.organization,
        week_days: program.week_days,
        start_date: program.start_date,
        end_date: program.end_date,
        start_time: program.start_time,
        end_time: program.end_time,
        qualificationScore: score,
        qualificationDetails
      };
    }).filter(program => program !== null);

    // Filter qualified events
    const qualifiedEvents = events.map(event => {
      let isQualified = true;
      let score = 0;
      const qualificationDetails = {
        type: 'event',
        requirementsSatisfied: [],
        requirementsNotMet: [],
        interestMatches: [],
        tagMatches: []
      };

      // Check if event hasn't ended
      const eventDays = event.event_days || [];
      const latestEventDay = eventDays.reduce((latest, day) => {
        return !latest || new Date(day.date) > new Date(latest.date) ? day : latest;
      }, null);

      if (!latestEventDay || new Date(latestEventDay.date) < new Date()) {
        return null;
      }

      if (event.event_requirements && event.event_requirements.length > 0) {
        const req = event.event_requirements[0];

        // Education Level Check
        if (req.education_level && req.education_level !== 'any') {
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

        // Income Level Check
        if (req.max_income_level || req.min_income) {
          const userIncome = parseInt(profile.income_level?.replace(/[^0-9]/g, '') || '0');
          if ((req.min_income && userIncome < req.min_income) || 
              (req.max_income_level && userIncome > req.max_income_level)) {
            isQualified = false;
            qualificationDetails.requirementsNotMet.push('income_level');
          } else {
            qualificationDetails.requirementsSatisfied.push('income_level');
            score += 1;
          }
        }

        // Other requirement checks...
        // (Similar to program requirements)
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

      if (!isQualified) {
        return null;
      }

      return {
        id: event.event_id,
        type: 'event',
        name: event.name,
        description: event.description,
        organization: event.organization,
        banner_url: event.banner_url,
        event_days: event.event_days,
        date: latestEventDay.date,
        qualificationScore: score,
        qualificationDetails
      };
    }).filter(event => event !== null);

    // Combine and shuffle qualified content
    const allQualifiedContent = [...qualifiedPrograms, ...qualifiedEvents]
      .sort(() => Math.random() - 0.5); // Random shuffle

    return res.status(200).json({
      qualified_content: allQualifiedContent,
      total_qualified: allQualifiedContent.length,
      summary: {
        total_programs: qualifiedPrograms.length,
        total_events: qualifiedEvents.length
      }
    });

  } catch (error) {
    console.error("Error getting qualified content:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get requirements by program ID
const getRequirementsByProgramId = async (req, res) => {
  const { program_id } = req.params;
  
  try {
    const program = await Program.findOne({
      where: { program_id: program_id },
      include: [
        {
          model: Requirements,
          as: "program_requirements"
        }
      ]
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found!" });
    }

    return res.status(200).json({
      program_id: program.program_id,
      program_name: program.name,
      requirements: program.program_requirements
    });
  } catch (error) {
    console.error("Error getting requirements by program ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update requirements by program ID
const updateRequirementsByProgramId = async (req, res) => {
  const { program_id } = req.params;
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
    const program = await Program.findOne({
      where: { program_id: program_id },
      include: [
        {
          model: Requirements,
          as: "program_requirements"
        }
      ]
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found!" });
    }

    if (!program.program_requirements || program.program_requirements.length === 0) {
      return res.status(404).json({ message: "No requirements found for this program!" });
    }

    const requirements = program.program_requirements[0];

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
      message: "Program requirements updated successfully!",
      program_id: program.program_id,
      program_name: program.name,
      requirements: requirements
    });
  } catch (error) {
    console.error("Error updating program requirements:", error);
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
  addProgram,
  addTopic,
  apply,
  getAllApplicants,
  getAllPrograms,
  getProgrambyId,
  getProgramsbyOrg,
  getAllActivePrograms,
  getAllActiveProgramsByOrg,
  updateTopic,
  getProgramsbySkill,
  updateProgram,
  deleteProgram,
  deleteTopic,
  approveProgram,
  rejectProgram,
  featureProgram,
  activateProgram,
  filterProgramsByUserProfile,
  getAllQualifiedContent,
  getAllQualifiedFeaturedContent,
  getAllQualifiedContentByUser,
  filterRecommendedPrograms,
  getRequirementsByProgramId,
  updateRequirementsByProgramId
};
