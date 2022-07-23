import mongoose from 'mongoose';

export interface IMachine {
  _id: string;
  macAddress: string;
  osType: string;
  uptime: number;
  freeMemory: number;
  totalMemory: number;
  usedMemory: number;
  memoryUsage: number;
  numberOfCores: number;
  cpuModel: string;
  cpuSpeed: number;
  cpuLoad: number;
}

const Machine = new mongoose.Schema<IMachine>(
  {
    macAddress: {
      type: String,
      required: true,
      unique: true,
    },
    osType: {
      type: String,
      required: true,
    },
    freeMemory: {
      type: Number,
      required: true,
    },
    totalMemory: {
      type: Number,
      required: true,
    },
    usedMemory: {
      type: Number,
      required: true,
    },
    memoryUsage: {
      type: Number,
      required: true,
    },
    numberOfCores: {
      type: Number,
      required: true,
    },
    cpuModel: {
      type: String,
      required: true,
    },
    cpuSpeed: {
      type: Number,
      required: true,
    },
    cpuLoad: {
      type: Number,
      required: true,
    },
    uptime: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMachine>('Machine', Machine);
