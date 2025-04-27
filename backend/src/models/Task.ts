import mongoose, { Document, Schema } from 'mongoose';

export type TaskStatus = 'not-started' | 'in-progress' | 'completed';
export type TaskPriority = 'urgent' | 'high' | 'normal' | 'low';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimated_minutes: number;
  actual_minutes?: number;
  start_time?: Date;
  end_time?: Date;
  color?: string;
  category?: string;
  user_id: string;
  created_at: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started'
    },
    priority: {
      type: String,
      enum: ['urgent', 'high', 'normal', 'low'],
      default: 'normal'
    },
    estimated_minutes: {
      type: Number,
      default: 30
    },
    actual_minutes: {
      type: Number,
      default: null
    },
    start_time: {
      type: Date,
      default: null
    },
    end_time: {
      type: Date,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: null
    },
    user_id: {
      type: String,
      required: [true, 'User ID is required']
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Task = mongoose.model<ITask>('Task', taskSchema); 