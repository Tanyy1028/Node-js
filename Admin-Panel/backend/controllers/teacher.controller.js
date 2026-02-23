import Teacher from "../models/Teacher.js";
import { APIFeatures } from "../utils/apiFeatures.js";

// CREATE
export const createTeacher = async (req, res) => {
  const teacher = await Teacher.create({
    name: req.body.name,
    subject: req.body.subject,
    photo: req.file?.filename,
    createdBy: req.user.id
  });

  res.json(teacher);
};

// GET ALL with search + pagination
export const getTeachers = async (req, res) => {
  const features = new APIFeatures(Teacher.find(), req.query)
    .search()
    .paginate();

  const teachers = await features.query;
  res.json(teachers);
};

// DELETE
export const deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted" });
};