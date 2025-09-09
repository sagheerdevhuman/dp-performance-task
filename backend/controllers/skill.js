require("dotenv").config();
const { Op } = require("sequelize");
const { Skill, Program, User } = require("../models");

/*-------------SKILL-CONTROLLERS-------------*/

const addSkill = async(req,res)=>{
  const {
    name,
    description,
    icon_url,
  } = req.body;

  try{
    /*--------------Create-New-Skill--------------*/
    const skill = await Skill.create({
      name:name,
      default:description,
      icon_url:icon_url,
    });
    await skill.save();

    /*-----------Successful-Server-Response------------*/
    if (skill) {
      return res.status(200).json({ skill });
    }

  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};



const getAllSkills = async (req, res) => {
  try {
    /*-------------Retreive-all-Skills--------------*/
    const skills = await Skill.findAll();

    /*-------------Retreive-all-Skills--------------*/
    if (skills){
      return res.status(200).json({ skills });
    }
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSkillId = async (req, res) => {
  const { skill_id } = req.params;
  try {
    /*---------------Find-Skill-by-ID---------------*/
    const skill = await Skill.findOne({
      where: { id: skill_id },
    });
    if (skill) {
      return res.json(skill);
    }
    return res.status(404).json({ message: "Skill not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updateSkill= async (req, res) => {
  const { skill_id } = req.params;
  const {
    user_id,
    name,
    icon_url,
    description
  } = req.body;
  try {
    const user = await User.findOne({
       where: { user_id: user_id },
    });
    if((user.is_meta_admin=true)||(user.is_bxdp_admin==true)){
      /*--------------Update-Skill-by-ID--------------*/
      const skill = await Skill.findOne({
        where: { skill_id: skill_id },
      });
      if (skill) {
        skill.name = name;
        skill.icon_url = icon_url;
        skill.default = description;
        await skill.save();
        return res.json(skill);
      }
      return res.status(404).json({ message: "Skill not found!" });
    }
   return res.status(404).json({ message: "User not found!" }); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  const { skill_id } = req.params;
  console.log("working")
  try {
    const skillToBeDeleted = await Skill.destroy({
      where: { skill_id: skill_id },
    });

    /*-----------Successful-Server-Response------------*/
    if (skillToBeDeleted) {
      return res
        .status(200)
        .json({ message: "Skill was deleted successfully!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Skill with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
  addSkill,
  getAllSkills,
  getSkillId,
  updateSkill,
  deleteSkill,
};
