require("dotenv").config();
const { Op } = require("sequelize");
const { User,Resource,Tag, Organization, Category, Category_Resource, Org_Resource, Tag_Resource, User_Resource } = require("../models");


/*-------------EVENT-CONTROLLERS-------------*/
const addResource = async (req, res) => {
  const { user_id } = req.params;
  const {
    title,
    description,
    location,
    link,
    photo,
    categories,
    tags,
    provider,
    is_platform_wide,
    is_active,
    org_id
  } = req.body;
  try {
    const user = await User.findOne({
        where: { user_id: user_id },
      });
    if (user) {
      
      	/*--------------Create-new-Resource--------------*/
        const resource = await Resource.create({
          title: title,
          description: description,
          location: location,
          link: link,
          photo: photo,
          provider: provider,
          is_platform_wide: is_platform_wide,
          is_active: true,
        });
        await resource.save();
        if (resource) {
          const org = await Organization.findOne({
           where: { org_id: org_id },
          });
          if(org){
            const org_resource = await Org_Resource.create({
              org_id:org_id,
              resource_id:resource.resource_id
            })
            await org_resource.save();
            const resource_categories = await Category_Resource.create({
              resource_id:resource.resource_id,
              category_id:categories.category_id,
              title:categories.title,
            });
            await resource_categories.save();
            if (tags) {
              tags.map((x) => {
                x.resource_id = resource.resource_id;
                return x;
              });
              const event_tags = await Tag_Resource.bulkCreate(tags);
            }
          }
      }
      return res.status(200).json({ message: "Resource Created" });
    }
    return res
      .status(404)
      .json({ message: "User with that id not found!!!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllResources = async (req, res) => {
  const { user_id } = req.params;
  try {
    // const user = await User.findOne({
    //   where: { user_id: user_id },
    // });
    // if (user.is_meta_admin == true || user.is_bxdp_admin == true ){
      /*-------------Retreive-all-Events-------------*/
      const resources = await Resource.findAll({
        include: [
          {
            model: Category,
            as: "categories",
          },
          {
            model: Tag,
            as: "tags",
          },
          {
            model: Organization,
            as: "orgs",
          },
        ],
      });
      if (resources) {
        return res.json(resources);
      }
    // } else {
    //   const resources = await Resource.findAll({
    //     include: ["categories", "orgs", "tags",],
    //   });
    //   if (resources) {
    //     return res.json(resources);
    //   }
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllActiveResources = async (req, res) => {
  try {
    /*-------------Retreive-all-Events-------------*/
    const activeResources = await Resource.findAll({
      where: {
        [Op.and]: [{ is_active: true }],
      },
      include: [
        "categories",
        "orgs",
        "tags"
      ],
    });
    return res.json(activeResources);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getResourceById = async (req, res) => {
  const { resource_id } = req.params;
  try {
    const resource = await Resource.findOne({
      where: { resource_id: resource_id },
      include: [
        "categories",
        "orgs",
        "tags"
      ],
    });
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    return res.status(200).json(resource);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addResourceTag = async (req, res) => {
  const { resource_id } = req.params;
  const { tags } = req.body;
  try {
    const resource = await Resource.findOne({
      where: { resource_id: resource_id },
    });
    if (resource) {
      tags.map((x) => {
        x.resource_id = resource.resource_id;
        return x;
      });
      const resource_tags = await Tag_Resource.bulkCreate(tags);
      return res.json("Tags Created!!!");
    }
    return res.status(404).json("Resource with that id not found!!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteResourceTag = async (req, res) => {
  const { resource_id } = req.params;
  const { tag_id } = req.body;
  try {
    /*---------------Delete-an-Resource_Tag---------------*/
    const tags = await Tag_Resource.destroy({
      where: {
        [Op.and]: [
          { tag_id: tag_id },
          { resource_id: resource_id }
        ],
      },
    });

    return res.json("Tag deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const addResourceCategory = async (req, res) => {
  const { resource_id } = req.params;
  const { categories } = req.body;
  try {
    const resource = await Resource.findOne({
      where: { resource_id: resource_id },
    });
    if (resource) {
      categories.map((x) => {
        x.resource_id = resource.resource_id;
        return x;
      });
      const resource_categories = await Category_Resource.bulkCreate(categories);
      return res.json("Categories Created!!!");
    }
    return res.status(404).json("Resource with that id not found!!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteResourceCategory = async (req, res) => {
  const { resource_id } = req.params;
  const { category_id } = req.body;
  try {
    /*---------------Delete-an-Resource_Category---------------*/
    const category = await Category_Resource.destroy({
      where: {
        [Op.and]: [
          { category_id: category_id },
          { resource_id: resource_id }
        ],
      },
    });

    return res.json("Category deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*--------------Activate-Resource------------------*/
const activateResource = async (req, res) => {
  const { resource_id } = req.params;

  try {
    /*-------------Retreive-Resource-------------*/
    const resource = await Resource.findOne({
      where: { resource_id: resource_id },
    });

    /*-------------Dectivate-Resource--------------*/
    if (resource.is_active == true) {
      resource.is_active = false;
      await resource.save();
      resource.is_active = false;
      await resource.save();
      return res.send({ message: "Resource is deactivated!!!" });
    } else if (resource.is_active == false){
       resource.is_active = true;
      await resource.save();
      return res.send({ message: "Resource is activated!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Resource with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};


const updateResource = async (req, res) => {
  const { resource_id } = req.params;
  const {
    description,
    location,
    link,
    photo,
    provider,
    is_platform_wide,
    is_active,
    user_id,
    org_id
  } = req.body;
  try {
    const user = await User.findOne({
       where:{ user_id: user_id }
    });
      if(
        (user.is_meta_admin==true)||
        (user.is_bxdp_admin==true)||
        (user.is_org_admin==true && user.org_id == org_id)
      ){
        /*--------------Update-Resource-by-ID--------------*/
        const resource = await Resource.findOne({
          where: { resource_id: resource_id },
          include:[ "tags", "categories"]
        });
        if (resource) {
          resource.description = description;
          resource.location = location;
          resource.link = link;
          resource.photo = photo;
          resource.provider=provider;
          resource.is_platform_wide=is_platform_wide;
          await resource.save();
          
          return res.json(resource);
        }
        return res.status(404).json({ message: "Resource not found!" });
      }
    return res.status(404).json({ message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteResource = async (req, res) => {
  const { resource_id } = req.params;
  try {
    /*---------------Delete-an-Resource---------------*/
    const resource = await Resource.findOne({
      where: { resource_id: resource_id },
    });

    const categories = await Category_Resource.destroy({
      where: { resource_id: resource_id },
    });

    const tags = await Tag_Resource.destroy({
      where: { resource_id: resource_id },
    });
    const orgs = await Org_Resource.destroy({
      where: { resource_id: resource_id },
    });

    await resource.destroy();

    return res.json("Resource deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getResourcesByOrgId = async (req, res) => {
  const { org_id } = req.params;
  try {
    // First, check if the organization exists
    const organization = await Organization.findOne({
      where: { org_id: org_id },
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found!" });
    }

    // Get all resources associated with this organization
    const resources = await Resource.findAll({
      include: [
        {
          model: Organization,
          as: "orgs",
          where: { org_id: org_id },
        },
        {
          model: Category,
          as: "categories",
        
        },
        {
          model: Tag,
          as: "tags",
          
        }
      ],
      where: {
        is_active: true
      }
    });

    return res.status(200).json({
      organization: {
        org_id: organization.org_id,
        name: organization.name,
        description: organization.description
      },
      resources: resources,
      total_resources: resources.length
    });
  } catch (error) {
    console.error("Error getting resources by organization ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getActiveResourcesByOrgId = async (req, res) => {
  const { org_id } = req.params;
  try {
    // First, check if the organization exists
    const organization = await Organization.findOne({
      where: { org_id: org_id },
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found!" });
    }

    // Get all active resources associated with this organization
    const resources = await Resource.findAll({
      include: [
        {
          model: Organization,
          as: "orgs",
          where: { org_id: org_id },
          attributes: ["org_id", "name", "description"]
        },
        {
          model: Category,
          as: "categories",
          attributes: ["category_id", "name", "description"]
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["tag_id", "name"]
        }
      ],
      where: {
        [Op.and]: [
          { is_active: true }
        ]
      }
    });

    return res.status(200).json({
      organization: {
        org_id: organization.org_id,
        name: organization.name,
        description: organization.description
      },
      active_resources: resources,
      total_active_resources: resources.length
    });
  } catch (error) {
    console.error("Error getting active resources by organization ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addResource,
  addResourceTag,
  getAllResources,
  getAllActiveResources,
  getResourceById,
  deleteResourceTag,
  addResourceCategory,
  deleteResourceCategory,
  activateResource,
  updateResource,
  deleteResource,
  getResourcesByOrgId,
  getActiveResourcesByOrgId,
};


