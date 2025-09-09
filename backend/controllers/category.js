require("dotenv").config();
const { Op } = require("sequelize");
const { Category, User } = require("../models");

/*-------------CATEGORY-CONTROLLERS-------------*/

const addCategory = async(req,res)=>{
  const {
    title,
  } = req.body;

  try{
    /*--------------Create-New-Category--------------*/
    const category = await Category.create({
      title:title,
    });
    await category.save();

    /*-----------Successful-Server-Response------------*/
    if (category) {
      return res.status(200).json({ category });
    }

  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    /*-------------Retreive-all-Categories--------------*/
    const categories = await Category.findAll();

    /*-------------Retreive-all-Categories--------------*/
    if (categories){
      return res.status(200).json({ categories });
    }
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategoryId = async (req, res) => {
  const { category_id } = req.params;
  try {
    /*---------------Find-Category-by-ID---------------*/
    const category = await Category.findOne({
      where: { category_id: category_id },
    });
    if (category) {
      return res.json(category);
    }
    return res.status(404).json({ message: "Category not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updateCategory = async (req, res) => {
  const { category_id } = req.params;
  const {
    user_id,
    title,
  } = req.body;
  try {
    const user = await User.findOne({
       where: { user_id: user_id },
    });
    if((user.is_meta_admin==true)||(user.is_bxdp_admin==true)){
      /*--------------Update-Category-by-ID--------------*/
      const category = await Category.findOne({
        where: { category_id: category_id },
      });
      if (category) {
        category.title = title;
        await category.save();
        return res.json(category);
      }
      return res.status(404).json({ message: "Category not found!" });
    }
   return res.status(404).json({ message: "User not found!" }); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { category_id } = req.params;

  try {
    const categoryToBeDeleted = await Category.destroy({
      where: { category_id: category_id },
    });

    /*-----------Successful-Server-Response------------*/
    if (categoryToBeDeleted) {
      return res
        .status(200)
        .json({ message: "Category was deleted successfully!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Category with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
  addCategory,
  getAllCategories,
  getCategoryId,
  updateCategory,
  deleteCategory,
};
