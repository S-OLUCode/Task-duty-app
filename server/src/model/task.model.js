import mongoose, { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },

    title: {
      type: String,
      required: [true, "Please add a task title"],
    },

    description: {
      type: String,
      required: [true, "Please add a description"],
    },

    tags: {
      type: String,
      enum: ["Urgent", "Important", "Personal"],
      required: true,
    },
  },
  { timestamps: true 

  }
);

export default mongoose.models.Task || model("Task", taskSchema);
