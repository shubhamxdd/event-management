"use client";
import { getCategories } from "@/actions/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/db/models/categoryModel";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getAllCategories = async () => {
      const categoriesList = await getCategories();
      categoriesList && setCategories(categoriesList as ICategory[]);
    };
    getAllCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="w-full bg-gray-50 h-[54px] placeholder:text-grey-500 rounded-full text-[16px]  leading-[24px] px-5 py-3 border-none focus-visible:ring-transparent focus:ring-transparent  ">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="All"
          className="py-3 cursor-pointer focus:bg-gray-50 text-[14px] leading-[20px]"
        >
          All categories
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className="py-3 cursor-pointer focus:bg-gray-50 text-[14px] leading-[20px]"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
