const { Video, Organization, Video_Tag, Tag } = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

// Create Video
const createVideo = async (req, res) => {
  try {
    const { org_id, name, link, description,image_url, tags } = req.body;
    if (!org_id || !name || !link || !description || !tags) {
      return res.status(400).json({ message: "org_id, name, link, description, and tags are required" });
    }
    const org = await Organization.findOne({ where: { org_id } });
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }
    const video = await Video.create({ org_id, name, link, description,image_url });
    // Create event tags if provided
    if (tags) {
      tags.map((x) => {
        x.video_id = video.video_id;
        return x;
      });
      const video_tags = await Video_Tag.bulkCreate(tags);
    }
    return res.status(201).json(video);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all Videos (optionally by org_id)
const getVideos = async (req, res) => {
  try {
    const { org_id } = req.query;
    const where = org_id ? { org_id } : {};
    const videos = await Video.findAll({ 
      where, 
      include: ["organization"],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get videos by organization ID
const getVideosByOrgId = async (req, res) => {
  try {
    const { org_id } = req.params;
    const videos = await Video.findAll({ 
      where: { org_id }, 
      include: ["organization", "tags"],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get single Video by video_id
const getVideoById = async (req, res) => {
  try {
    const { video_id } = req.params;
    const video = await Video.findOne({ where: { video_id } ,include: [ "organization", "tags"]});
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Video
const updateVideo = async (req, res) => {
  try {
    const { video_id } = req.params;
    const { name, link, description, tags } = req.body;
    const video = await Video.findOne({ where: { video_id } });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    if (name !== undefined) video.name = name;
    if (link !== undefined) video.link = link;
    if (description !== undefined) video.description = description;
    if (tags !== undefined) {
      tags.map((x) => {
        x.video_id = video_id;
        return x;
      });
      await Video_Tag.destroy({ where: { video_id } });
      await Video_Tag.bulkCreate(tags);
    }
    await video.save();
    const updatedVideo = await Video.findOne({ where: { video_id } ,include: [{ model: Organization, as: "organization" },{ model: Video_Tag, as: "tags" }]});
    return res.status(200).json(updatedVideo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Video
const deleteVideo = async (req, res) => {
  try {
    const { video_id } = req.params;
    const video = await Video.findOne({ where: { video_id } });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    await Video_Tag.destroy({ where: { video_id } });
    await video.destroy();
    return res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get videos by tag IDs (array)
const getVideosByTagId = async (req, res) => {
  const { tags } = req.body;

  try {
    /*---------------Find-Tag_Event-by-Tag---------------*/
    const filterd_tags = await Video_Tag.findAll({
      where: {
        tag_id: tags
      },
    });


    if(filterd_tags){

      const videoIds = filterd_tags.map(tag => tag.video_id);

      /*---------------Find-Event-by-Tag---------------*/
      const videos = await Video.findAll({
        where: {
           [Op.and]: [
            { video_id: videoIds},
          ],
        },
        include: ["organization", "tags"],
      });
      
      if (videos) {

        return res.json(videos);
      }
      return res.status(404).json({ message: "Videos not found!" });
    }
    return res.status(404).json({ message: "Tags not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVideo,
  getVideos,
  getVideosByOrgId,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideosByTagId,
}; 