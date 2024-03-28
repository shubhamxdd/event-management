"use server";

import { connectDB } from "@/lib/db/database";
import Event from "@/lib/db/models/eventModel";
import User from "@/lib/db/models/userModel";
import { handleError } from "@/lib/utils";
import { CreateEventParams } from "@/types";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectDB();

    const owner = await User.findById(userId);

    console.log(userId);

    if (!owner) {
      throw new Error("User not found");
    }

    console.log({
      categoryId: event.categoryId,
      host: userId,
    });

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      host: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
