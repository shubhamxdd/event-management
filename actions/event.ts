"use server";

import { connectDB } from "@/lib/db/database";
import Category from "@/lib/db/models/categoryModel";
import Event from "@/lib/db/models/eventModel";
import User from "@/lib/db/models/userModel";
import { handleError } from "@/lib/utils";
import { CreateEventParams } from "@/types";

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: "host",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "category",
      model: Category,
      select: "_id name",
    });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectDB();

    const owner = await User.findById(userId);

    // console.log(userId);

    if (!owner) {
      throw new Error("User not found");
    }

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

export const getEvent = async (eventId: string) => {
  try {
    await connectDB();

    const event = await populateEvent(Event.findById(eventId));

    if (!eventId || !event) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};
