require("dotenv").config();
const { Op } = require("sequelize");
const { Tag } = require("../models");

/*-------------Tag-CONTROLLERS-------------*/

const addTag = async(req,res)=>{
  const {
    name,
  } = req.body;

  try{
    /*--------------Create-New-Tag--------------*/
    const tag = await Tag.create({
      name:name,
    });
    await tag.save();

    /*-----------Successful-Server-Response------------*/
    if (tag) {
      return res.status(200).json({ tag });
    }

  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};



const getAllTags = async (req, res) => {
  try {
    /*-------------Retreive-all-Tags--------------*/
    const tags = await Tag.findAll();

    /*-------------Retreive-all-Tags--------------*/
    if (tags){
      return res.status(200).json({ tags });
    }
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTagById = async (req, res) => {
  const { tag_id } = req.params;
  try {
    /*---------------Find-Tag-by-ID---------------*/
    const tag = await Tag.findOne({
      where: { tag_id: tag_id },
    });
    if (tag) {
      return res.json(tag);
    }
    return res.status(404).json({ message: "Tag not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTag = async (req, res) => {
  const { tag_id } = req.params;
  try {
    const tagToBeDeleted = await Tag.destroy({
      where: { tag_id: tag_id },
    });

    /*-----------Successful-Server-Response------------*/
    if (tagToBeDeleted) {
      return res
        .status(200)
        .json({ message: "Tag was deleted successfully!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Tag with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
  addTag,
  getAllTags,
  getTagById,
  deleteTag,
};
