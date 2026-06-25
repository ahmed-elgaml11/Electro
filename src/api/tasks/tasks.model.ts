import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'in progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  project: Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in progress', 'done'], default: 'pending' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

export const Task = mongoose.model<ITask>('Task', TaskSchema);
