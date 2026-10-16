import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

export async function connectDatabase(uri: string) {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
