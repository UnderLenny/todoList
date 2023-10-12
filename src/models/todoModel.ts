import mongoose, { Document, Schema } from "mongoose";

interface ITodo extends Document {
  todo: string;
  status: string;
}

const todoSchema: Schema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "A task must have a name"],
  },
  status: {
    type: String,
    required: [true, "A task must have a status"],
    enum: {
      values: ["Complete", "Todo"],
    },
    default: "Todo",
  },
});
const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
