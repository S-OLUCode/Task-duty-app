import task from "../model/task.model.js";
import Task from "../model/task.model.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, tags } = req.body;

    const userId = req.user?.id;

    if (!title || !description || !tags) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const newTask = await task.create({
      userId,
      title,
      description,
      tags,
    });

    return res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const tasks = await task.find({ userId });

    return res.status(200).json({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No ID provided" });
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error); // 👈 VERY IMPORTANT
    next(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
