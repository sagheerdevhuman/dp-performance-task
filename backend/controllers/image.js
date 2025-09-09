require("dotenv").config();
const AWS = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
const { Image, Organization, Program, Event, Skill } = require("../models");
const { Op } = require("sequelize");
const storage = require("../services/storage");

const fileUpload = async (req, res, next) => {
  try {
    const buffer = Buffer.from(req.file.buffer, 'binary');
    const key = req.file.originalname;
    const url = await storage.uploadBuffer(key, buffer, req.file.mimetype);
    return res.status(200).send(url);
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
};



const generatePresignedUrl = async (req, res) => {
  try {
    const keyPrefix = "uploads/";
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString("hex") + ".jpg";
    const key = keyPrefix + imageName;
    const uploadURL = await storage.getPresignedPutUrl(key);
    return res.status(200).json({ uploadURL, key });
  } catch (err) {
    return res.status(500).json({ message: "Could not generate URL" });
  }
};

const updateOrgLogo = async (req, res) => {
  const { org_id } = req.params;
  const { image_url } = req.body;
  try {
    const org = await Organization.findOne({
      where: { org_id: org_id },
    });
    if (org) {
      org.logo_url = image_url
      await org.save();
    }
    return res.status(200).json({ message: "logo updated" });
  } catch (error) {
    console.error("Error creating image:", error);
  }
};

const updateOrgBanner = async (req, res) => {
  const { org_id } = req.params;
  const { image_url } = req.body;
  try {
    const org = await Organization.findOne({
      where: { org_id: org_id },
    });
    if (org) {
      org.banner_url = image_url
      await org.save();
    }
    return res.status(200).json({ message: "banner updated" });
  } catch (error) {
    console.error("Error creating image:", error);
  }
};

const updateProgramBanner = async (req, res) => {
  const { program_id } = req.params;
  const { image_url } = req.body;
  try {
    const program = await Program.findOne({
      where: { program_id: program_id },
    });
    if (program) {
      program.banner_url = image_url
      await program.save();
    }
    return res.status(200).json({ message: "banner updated" });
  } catch (error) {
    console.error("Error creating image:", error);
  }
};

const updateEventBanner = async (req, res) => {
  const { event_id } = req.params;
  const { image_url } = req.body;
  try {
    const event = await Event.findOne({
      where: { event_id: event_id },
    });
    if (event) {
      event.banner_url = image_url
      await event.save();
    }
    return res.status(200).json({ message: "banner updated" });
  } catch (error) {
    console.error("Error creating image:", error);
  }
};

const updateSkillIcon = async (req, res) => {
  const { skill_id } = req.params;
  const { image_url } = req.body;
  try {
    const skill = await Skill.findOne({
      where: { skill_id: skill_id },
    });
    if (skill) {
      skill.icon_url = image_url
      await skill.save();
      return res.status(200).json({ message: "banner updated" });
    }
  } catch (error) {
    console.error("Error creating image:", error);
  }
};

module.exports = {
  generatePresignedUrl,
  updateOrgLogo,
  updateProgramBanner,
  updateEventBanner,
  updateSkillIcon,
  fileUpload,
  updateOrgBanner,
};
