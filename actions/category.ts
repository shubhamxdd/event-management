"use server";

import { connectDB } from "@/lib/db/database";
import category from "@/lib/db/models/categoryModel";
import { handleError } from "@/lib/utils";

// create category
export const createCategory = async ({
  categoryName,
}: {
  categoryName: string;
}) => {
  try {
    await connectDB();

    const newCategory = await category.create({
      name: categoryName,
    });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

// get all categories
export const getCategories = async () => {
  try {
    await connectDB();

    const categories = await category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
