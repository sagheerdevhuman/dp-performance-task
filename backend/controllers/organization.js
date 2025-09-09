require("dotenv").config();
const { Op } = require("sequelize");
const { User, Organization, Program, Event, Case, O_Case, Category, Resource } = require("../models");
const { Profile, Tag, Tag_Event, Topic, Requirements } = require("../models");

/*-------------ORGANIZATION-CONTROLLERS-------------*/

/*------------FETCH-ALL-ORGANIZATIONS--------------*/
const getAllOrganizations = async (req, res) => {
  try {
    /*-------------Retreive-Organizations-------------*/
    const allOrgs = await Organization.findAll({include: "casses"});

    /*-----------Successful-Server-Response------------*/
    if (allOrgs) {
      return res.status(200).json({ allOrgs });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "No organization found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*------------FETCH-APPROVED-ORGANIZATIONS--------------*/
const getAllApprovedOrganizations = async (req, res) => {
  try {
    /*-------------Retreive-Organizations-------------*/
    const allApprovedOrgs = await Organization.findAll({
      where: {
        [Op.and]: [{ is_approved: true }],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (allApprovedOrgs) {
      return res.status(200).json({ allApprovedOrgs });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "No organization found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*------------FETCH-APPROVED-ORGANIZATIONS--------------*/
const getApprovedPartnersList = async (req, res) => {
  try {
    /*-------------Retreive-Organizations-------------*/
    const partners = await Organization.findAll({
      where: {
        [Op.and]: [{ is_approved: true },{ is_active: true }],
      },
      attributes: [
        "org_id",
        "name",
        "description",
        "banner_url",
        "logo_url",
        "is_featured",
        "hidden"
      ],
    });

    /*-----------Successful-Server-Response------------*/
    if (partners) {
      return res.status(200).json({ partners });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "No organization found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*------------FETCH-ACTIVATED-ORGANIZATIONS--------------*/
const getAllActivatedOrganizations = async (req, res) => {
  try {
    /*-------------Retreive-Organizations-------------*/
    const allActivatedOrgs = await Organization.findAll({
      where: {
        [Op.and]: [{ org_id: !null }, { is_active: true }],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (allActivatedOrgs) {
      return res.status(200).json({ allActivatedOrgs });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "No organization found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*------------FETCH-UNAPPROVED-ORGANIZATIONS--------------*/
const getAllUnapprovedOrganizations = async (req, res) => {
  try {
    /*-------------Retreive-Organizations-------------*/
    const allUnapprovedOrgs = await Organization.findAll({
      where: {
        [Op.and]: [{ is_approved: false }],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (allUnapprovedOrgs) {
      return res.status(200).json({ allUnapprovedOrgs });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "No organization found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*------------FETCH-DEACTIVATED-ORGANIZATIONS--------------*/
const getAllDeactivatedOrganizations = async (req, res) => {
  try {
    /*-------------Retreive-Organizations-------------*/
    const allDeactivatedOrgs = await Organization.findAll({
      where: {
        [Op.and]: [{ org_id: !null }, { is_active: false }],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (allDeactivatedOrgs) {
      return res.status(200).json({ allDeactivatedOrgs });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "No organization found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*------------FETCH-ORGANIZATION-BY-ID--------------*/
const getOrganizationById = async (req, res) => {
  const { org_id } = req.params;
  try {
    /*-------------Retreive-Organization-------------*/
    const org = await Organization.findOne({
      where: { org_id: org_id },
    });

    /*-----------Successful-Server-Response------------*/
    if (org) {
      return res.status(200).json({ org });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const getPartnerById = async (req, res) => {
  const { org_id } = req.params;
  try {
    /*-------------Retreive-Organization-------------*/
    const org = await Organization.findOne({
      where: { org_id: org_id },
      include: ["programs","events"],
    });

    /*-----------Successful-Server-Response------------*/
    if (org) {
      return res.status(200).json({
        org_id:org.org_id,
        name: org.name,
        info_email: org.info_email,
        description: org.description,
        website: org.website,
        address: org.address,
        zipcode: org.zipcode,
        logo_url: org.logo_url,
        banner_url:org.banner_url,
        featured: org.featured,
        programs:org.programs,
        events:org.events
      });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};


/*--------------APPROVE-ORGANIZATION------------------*/
const approveOrganization = async (req, res) => {
  const { org_id } = req.params;

  try {
    /*-------------Retreive-Organization-------------*/
    const orgToBeApproved = await Organization.findOne({
      where: {
        [Op.and]: [{ org_id: org_id }, { is_approved: false }],
      },
    });

    /*-------------Approve-Organization-------------*/
    if (orgToBeApproved) {
      orgToBeApproved.is_approved = true;
      await orgToBeApproved.save();
      // console.log("Your organization --->", orgToBeApproved);

      return res.send({ message: "Organization is approved!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    if (!orgToBeApproved.is_approved) {
      return res
        .status(409)
        .json({ message: "Organization is already approved!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*--------------REJECT-ORGANIZATION------------------*/
const rejectOrganization = async (req, res) => {
  const { org_id } = req.params;
  const { user_id,reason} = req.body
  try {
    /*--------------Update-Program-by-ID--------------*/
    const org = await Organization.findOne({
      where: { org_id: org_id },

    });
    if (org) {
      if (org.is_rejected == true) {
        org.is_rejected = false;
        await org.save();
        return res.json(org);
        
      } else if (org.is_rejected == false) {

        const new_case = await Case.create({
          user_id:user_id,
          reason:reason
        })
        await new_case.save();
        if (new_case) {
          const add_case = await O_Case.create({
            org_id:org.org_id,
            case_id:new_case.case_id
          })
          console.log(add_case)
          org.is_rejected = true;
          await org.save();
          return res.json(org);
        }
      } 
    }
    return res.status(404).json({ message: "Organization not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/*--------------Activate-ORGANIZATION------------------*/
const activateOrganization = async (req, res) => {
  const { org_id } = req.params;

  try {
    /*-------------Retreive-Organization-------------*/
    const org = await Organization.findOne({
      where: { org_id: org_id },
    });


    console.log(org.is_active)

    /*-------------Dectivate-Organization--------------*/
    if (org.is_active == true) {
      org.is_active = false;
      await org.save();

      if(org){
        /*-------------Retreive-Organization-------------*/
        const programs = await Program.findAll({
          where: { org_id: org_id },
        });
        await programs.map(program => {
          program.is_active = false
          program.save()
        })
      }
      
      return res.send({ message: "Organization is activated!!!" });
    } else if (org.is_active == false){
       org.is_active = true;
      await org.save();
      if(org){
        const programs = await Program.findAll({
          where: { org_id: org_id },
        });
        
      }
      return res.send({ message: "Organization is deactivated!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*--------------FEATURE-ORGANIZATION------------------*/
const featureOrganization = async (req, res) => {
  const { org_id } = req.params;

  try {
    /*-------------Retreive-Organization-------------*/
    const orgToBeFeatured = await Organization.findOne({
      where: {
        [Op.and]: [{ org_id: org_id }],
      },
    });

    /*-------------Feature-Organization-------------*/
    if (orgToBeFeatured.is_featured == false) {
      orgToBeFeatured.is_featured = true;
      await orgToBeFeatured.save();
      // console.log("Your organization --->", orgToBeFeatured);

      return res.send({ message: "Organization is featured!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    if (orgToBeFeatured.is_featured == true) {
      orgToBeFeatured.is_featured = false;
      await orgToBeFeatured.save();
      // console.log("Your organization --->", orgToBeFeatured);

      return res.send({ message: "Organization is featured!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*--------------UPDATE-ORGANIZATION------------------*/
const updateOrganization = async (req, res) => {
  const { org_id } = req.params;
  const {
    user_id,
    name,
    info_email,
    description,
    website,
    phone,
    address_a,
    address_b,
    zipcode,
    logo_url,
    banner_url,
  } = req.body;

  try {
    /*-------------Retreive-Organization-------------*/
    const orgToBeUpdated = await Organization.findOne({
      where: { org_id: org_id ,},
    });
    // return console.log("Your organization --->", orgToBeUpdated);

    // const adminToBeUpdated = await User.findOne({
    //   where: { user_id: user_id },
    // });

    /*-----------------Get-Full-Address-----------------*/
    let fullAddress;
    if (!address_b || address_b == "") {
      fullAddress = `${address_a}`;
    } else {
      fullAddress = `${address_a} ${address_b}`;
    }
    

    /*-----------------Updating-Organization-----------------*/
    if (orgToBeUpdated) {
      orgToBeUpdated.name = name;
      orgToBeUpdated.info_email = info_email;
      orgToBeUpdated.description = description;
      orgToBeUpdated.website = website;
      orgToBeUpdated.phone = phone;
      orgToBeUpdated.address = fullAddress;
      orgToBeUpdated.zipcode = zipcode;
      orgToBeUpdated.logo_url = logo_url;
      orgToBeUpdated.banner_url = banner_url;
      // orgToBeUpdated.mou = mou;
      // orgToBeUpdated.is_approved = is_approved;
      // orgToBeUpdated.is_active = is_active;
      // orgToBeUpdated.was_invited = was_invited;

      await orgToBeUpdated.save();
      // console.log("Your organization --->", orgToBeUpdated);

      // adminToBeUpdated.user_email = info_email;
      // await adminToBeUpdated.save();
      // console.log("Your user --->", adminToBeUpdated);

      return res.send({ message: "Organization was updated successfully!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const hideOrganization = async (req, res) => {
  const { org_id } = req.params;

  try {
    /*-------------Retreive-Organization-------------*/
    const orgToBeHidden = await Organization.findOne({
      where: { org_id: org_id ,},
    });

    /*-----------------Updating-Organization-----------------*/
    if (orgToBeHidden) {
      orgToBeHidden.hidden = true;
    
      await orgToBeHidden.save();

      return res.status(200).json({orgToBeHidden})
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*--------------DELETE-ORGANIZATION-----------------*/
const deleteOrganization = async (req, res) => {
  const { org_id } = req.params;
  try {
    /*---------------Delete-an-Program---------------*/
    const orgToBeDeleted = await Organization.findOne({
      where: { org_id: org_id },
    });   
    /*-----------Successful-Server-Response------------*/
    if (orgToBeDeleted) {

      const programs = await Program.destroy({
      where: { org_id: org_id },
      });

      const events = await Event.destroy({
        where: { org_id: org_id },
      });
      const users = await User.update({ org_id: null, is_active: false,}, {
        where: {org_id:org_id},
      });

      if(users){
        await orgToBeDeleted.destroy();

        return res
          .status(200)
          .json({ message: "Organization was deleted successfully!!!" });
        
      }
      
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const filterOrganizationsByUserProfile = async (req, res) => {
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
    
    // Calculate user's age for requirements matching
    const userAge = profile.date_of_birth ? 
      Math.floor((new Date() - new Date(profile.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      null;

    // Find all active organizations with their programs and events
    const organizations = await Organization.findAll({
      where: {
        is_approved: true,
        is_active: true
      },
      include: [
        {
          model: Program,
          as: 'programs',
          where: {
            is_active: true,
            is_approved: true,
            end_date: { [Op.gte]: new Date() }
          },
          include: ['skills', {
            model: Requirements,
            as: 'program_requirements'
          }],
          required: false
        },
        {
          model: Event,
          as: 'events',
          where: {
            is_active: true,
            is_approved: true
          },
          include: ['tags', 'event_days', {
            model: Requirements,
            as: 'event_requirements'
          }],
          required: false
        }
      ]
    });

    // Filter and score organizations based on qualified programs and events
    const qualifiedOrganizations = organizations.map(org => {
      let totalScore = 0;
      const qualificationDetails = {
        qualifiedPrograms: [],
        qualifiedEvents: [],
        totalQualifiedPrograms: 0,
        totalQualifiedEvents: 0
      };

      // Check program qualifications
      org.programs.forEach(program => {
        let isQualified = true;
        let programScore = 0;
        const programQualificationDetails = {
          requirementsSatisfied: [],
          requirementsNotMet: [],
          skillMatches: []
        };

        // Check program requirements
        if (program.program_requirements && program.program_requirements.length > 0) {
          const req = program.program_requirements[0];

          // Education Level Check
          if (req.education_level && req.education_level !== 'any') {
            const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];
            const reqLevel = educationLevels.indexOf(req.education_level);
            const userLevel = educationLevels.indexOf(profile.education_level);
            
            if (userLevel < reqLevel) {
              isQualified = false;
              programQualificationDetails.requirementsNotMet.push('education_level');
            } else {
              programQualificationDetails.requirementsSatisfied.push('education_level');
              programScore += 1;
            }
          }

          // Income Level Check
          if (req.max_income_level || req.min_income) {
            const userIncome = parseInt(profile.income_level?.replace(/[^0-9]/g, '') || '0');
            if ((req.min_income && userIncome < req.min_income) || 
                (req.max_income_level && userIncome > req.max_income_level)) {
              isQualified = false;
              programQualificationDetails.requirementsNotMet.push('income_level');
            } else {
              programQualificationDetails.requirementsSatisfied.push('income_level');
              programScore += 1;
            }
          }

          // Age Check
          if (userAge && (req.min_age || req.max_age)) {
            if ((req.min_age && userAge < req.min_age) || 
                (req.max_age && userAge > req.max_age)) {
              isQualified = false;
              programQualificationDetails.requirementsNotMet.push('age');
            } else {
              programQualificationDetails.requirementsSatisfied.push('age');
              programScore += 1;
            }
          }

          // Gender Check
          if (req.gender && req.gender !== 'any') {
            if (req.gender.toLowerCase() !== profile.gender?.toLowerCase()) {
              isQualified = false;
              programQualificationDetails.requirementsNotMet.push('gender');
            } else {
              programQualificationDetails.requirementsSatisfied.push('gender');
              programScore += 1;
            }
          }

          // Experience Level Check
          if (req.experience_Level && req.experience_Level !== 'any') {
            if (req.experience_Level.toLowerCase() !== profile.experience_Level?.toLowerCase()) {
              isQualified = false;
              programQualificationDetails.requirementsNotMet.push('experience_level');
            } else {
              programQualificationDetails.requirementsSatisfied.push('experience_level');
              programScore += 2;
            }
          }

          // Past Experience Check
          if (req.past_experience === true) {
            if (!profile.past_experience) {
              isQualified = false;
              programQualificationDetails.requirementsNotMet.push('past_experience');
            } else {
              programQualificationDetails.requirementsSatisfied.push('past_experience');
              programScore += 1;
            }
          }
        }

        // Check skill matches
        const programSkills = program.skills.map(skill => skill.skill_id);
        const matchingSkills = programSkills.filter(skillId => userSkills.includes(skillId));
        if (matchingSkills.length > 0) {
          programScore += matchingSkills.length * 2;
          programQualificationDetails.skillMatches = matchingSkills;
        }

        if (isQualified) {
          totalScore += programScore;
          qualificationDetails.qualifiedPrograms.push({
            program_id: program.program_id,
            name: program.name,
            qualificationScore: programScore,
            qualificationDetails: programQualificationDetails
          });
        }
      });

      // Check event qualifications
      org.events.forEach(event => {
        let isQualified = true;
        let eventScore = 0;
        const eventQualificationDetails = {
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
          return; // Skip events that have ended
        }

        // Check event requirements
        if (event.event_requirements && event.event_requirements.length > 0) {
          const req = event.event_requirements[0];

          // Education Level Check
          if (req.education_level && req.education_level !== 'any') {
            const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];
            const reqLevel = educationLevels.indexOf(req.education_level);
            const userLevel = educationLevels.indexOf(profile.education_level);
            
            if (userLevel < reqLevel) {
              isQualified = false;
              eventQualificationDetails.requirementsNotMet.push('education_level');
            } else {
              eventQualificationDetails.requirementsSatisfied.push('education_level');
              eventScore += 1;
            }
          }

          // Income Level Check
          if (req.max_income_level || req.min_income) {
            const userIncome = parseInt(profile.income_level?.replace(/[^0-9]/g, '') || '0');
            if ((req.min_income && userIncome < req.min_income) || 
                (req.max_income_level && userIncome > req.max_income_level)) {
              isQualified = false;
              eventQualificationDetails.requirementsNotMet.push('income_level');
            } else {
              eventQualificationDetails.requirementsSatisfied.push('income_level');
              eventScore += 1;
            }
          }

          // Age Check
          if (userAge && (req.min_age || req.max_age)) {
            if ((req.min_age && userAge < req.min_age) || 
                (req.max_age && userAge > req.max_age)) {
              isQualified = false;
              eventQualificationDetails.requirementsNotMet.push('age');
            } else {
              eventQualificationDetails.requirementsSatisfied.push('age');
              eventScore += 1;
            }
          }

          // Gender Check
          if (req.gender && req.gender !== 'any') {
            if (req.gender.toLowerCase() !== profile.gender?.toLowerCase()) {
              isQualified = false;
              eventQualificationDetails.requirementsNotMet.push('gender');
            } else {
              eventQualificationDetails.requirementsSatisfied.push('gender');
              eventScore += 1;
            }
          }

          // Experience Level Check
          if (req.experience_Level && req.experience_Level !== 'any') {
            if (req.experience_Level.toLowerCase() !== profile.experience_Level?.toLowerCase()) {
              isQualified = false;
              eventQualificationDetails.requirementsNotMet.push('experience_level');
            } else {
              eventQualificationDetails.requirementsSatisfied.push('experience_level');
              eventScore += 2;
            }
          }

          // Past Experience Check
          if (req.past_experience === true) {
            if (!profile.past_experience) {
              isQualified = false;
              eventQualificationDetails.requirementsNotMet.push('past_experience');
            } else {
              eventQualificationDetails.requirementsSatisfied.push('past_experience');
              eventScore += 1;
            }
          }
        }

        // Check interests and tags
        const eventTags = event.tags || [];
        
        // Interest matches
        const interestMatches = eventTags.filter(tag => 
          userInterests.includes(tag.name.toLowerCase())
        );
        if (interestMatches.length > 0) {
          eventScore += interestMatches.length * 2;
          eventQualificationDetails.interestMatches = interestMatches.map(tag => tag.name);
        }

        // Profile tag matches
        const profileTagMatches = eventTags.filter(tag => 
          userProfileTags.includes(tag.name.toLowerCase())
        );
        if (profileTagMatches.length > 0) {
          eventScore += profileTagMatches.length * 2;
          eventQualificationDetails.tagMatches = profileTagMatches.map(tag => tag.name);
        }

        if (isQualified) {
          totalScore += eventScore;
          qualificationDetails.qualifiedEvents.push({
            event_id: event.event_id,
            name: event.name,
            qualificationScore: eventScore,
            qualificationDetails: eventQualificationDetails
          });
        }
      });

      qualificationDetails.totalQualifiedPrograms = qualificationDetails.qualifiedPrograms.length;
      qualificationDetails.totalQualifiedEvents = qualificationDetails.qualifiedEvents.length;

      // Only include organizations that have at least one qualified program or event
      if (qualificationDetails.totalQualifiedPrograms === 0 && qualificationDetails.totalQualifiedEvents === 0) {
        return null;
      }

      return {
        ...org.toJSON(),
        qualificationScore: totalScore,
        qualificationDetails
      };
    });

    // Filter out null entries and sort by qualification score
    const filteredOrganizations = qualifiedOrganizations
      .filter(org => org !== null)
      .sort((a, b) => b.qualificationScore - a.qualificationScore);

    return res.status(200).json({
      qualified_organizations: filteredOrganizations,
      total_qualified: filteredOrganizations.length,
      summary: {
        total_qualified_programs: filteredOrganizations.reduce((sum, org) => 
          sum + org.qualificationDetails.totalQualifiedPrograms, 0),
        total_qualified_events: filteredOrganizations.reduce((sum, org) => 
          sum + org.qualificationDetails.totalQualifiedEvents, 0)
      }
    });
  } catch (error) {
    console.error("Error filtering qualified organizations:", error);
    return res.status(500).json({ message: error.message });
  }
};

/*------------ORGANIZATION-REPORTS-WITH-CATEGORY-FILTERING--------------*/
const getOrganizationReports = async (req, res) => {
  const { category_id, start_date, end_date, status } = req.query;
  try {
    // Build the base query
    let whereClause = {};
    let includeClause = [
      {
        model: Program,
        as: 'programs',
        include: ['skills', {
          model: Requirements,
          as: 'program_requirements'
        }],
        required: false
      },
      {
        model: Event,
        as: 'events',
        include: ['tags', 'event_days', {
          model: Requirements,
          as: 'event_requirements'
        }],
        required: false
      },
      {
        model: User,
        as: 'user',
        required: false
      }
    ];

    // Apply category filter if provided
    if (category_id) {
      includeClause.push({
        model: Resource,
        as: 'resources',
        include: [{
          model: Category,
          as: 'categories',
          where: { category_id: category_id },
          through: { attributes: [] }
        }],
        required: true
      });
    }

    // Apply date filters if provided
    if (start_date || end_date) {
      const dateFilter = {};
      if (start_date) {
        dateFilter[Op.gte] = new Date(start_date);
      }
      if (end_date) {
        dateFilter[Op.lte] = new Date(end_date);
      }
      
      // Apply date filter to programs
      includeClause[0].where = {
        ...includeClause[0].where,
        start_date: dateFilter
      };
      
      // Apply date filter to events
      includeClause[1].where = {
        ...includeClause[1].where,
        start_date: dateFilter
      };
    }

    // Apply status filter if provided
    if (status) {
      switch (status.toLowerCase()) {
        case 'approved':
          whereClause.is_approved = true;
          break;
        case 'unapproved':
          whereClause.is_approved = false;
          break;
        case 'active':
          whereClause.is_active = true;
          break;
        case 'inactive':
          whereClause.is_active = false;
          break;
        case 'featured':
          whereClause.is_featured = true;
          break;
        case 'rejected':
          whereClause.is_rejected = true;
          break;
        default:
          break;
      }
    }

    // Get organizations with filters
    const organizations = await Organization.findAll({
      where: whereClause,
      include: includeClause
    });

    // Generate report data
    const reportData = organizations.map(org => {
      const totalPrograms = org.programs ? org.programs.length : 0;
      const totalEvents = org.events ? org.events.length : 0;
      const totalUsers = org.user ? org.user.length : 0;
      
      // Calculate active programs (not ended)
      const activePrograms = org.programs ? org.programs.filter(program => 
        program.end_date && new Date(program.end_date) >= new Date()
      ).length : 0;

      // Calculate upcoming events
      const upcomingEvents = org.events ? org.events.filter(event => {
        if (!event.event_days || event.event_days.length === 0) return false;
        const latestEventDay = event.event_days.reduce((latest, day) => {
          return !latest || new Date(day.date) > new Date(latest.date) ? day : latest;
        }, null);
        return latestEventDay && new Date(latestEventDay.date) >= new Date();
      }).length : 0;

      return {
        org_id: org.org_id,
        name: org.name,
        description: org.description,
        status: {
          is_approved: org.is_approved,
          is_active: org.is_active,
          is_featured: org.is_featured,
          is_rejected: org.is_rejected
        },
        stats: {
          total_programs: totalPrograms,
          active_programs: activePrograms,
          total_events: totalEvents,
          upcoming_events: upcomingEvents,
          total_users: totalUsers
        },
        contact: {
          website: org.website,
          phone: org.phone,
          address: org.address,
          zipcode: org.zipcode,
          info_email: org.info_email
        },
        created_at: org.createdAt,
        updated_at: org.updatedAt
      };
    });

    // Calculate summary statistics
    const summary = {
      total_organizations: reportData.length,
      total_programs: reportData.reduce((sum, org) => sum + org.stats.total_programs, 0),
      total_events: reportData.reduce((sum, org) => sum + org.stats.total_events, 0),
      total_users: reportData.reduce((sum, org) => sum + org.stats.total_users, 0),
      approved_organizations: reportData.filter(org => org.status.is_approved).length,
      active_organizations: reportData.filter(org => org.status.is_active).length,
      featured_organizations: reportData.filter(org => org.status.is_featured).length
    };

    return res.status(200).json({
      organizations: reportData,
      summary: summary,
      filters_applied: {
        category_id: category_id || null,
        start_date: start_date || null,
        end_date: end_date || null,
        status: status || null
      }
    });

  } catch (error) {
    console.error("Error generating organization reports:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrganizations,
  getAllApprovedOrganizations,
  getApprovedPartnersList,
  getAllActivatedOrganizations,
  getAllUnapprovedOrganizations,
  getAllDeactivatedOrganizations,
  getOrganizationById,
  getPartnerById,
  approveOrganization,
  updateOrganization,
  deleteOrganization,
  featureOrganization,
  activateOrganization,
  hideOrganization,
  rejectOrganization,
  filterOrganizationsByUserProfile,
  getOrganizationReports,
};
