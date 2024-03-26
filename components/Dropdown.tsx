import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ICategory } from "@/lib/db/models/categoryModel";
import { startTransition, useState } from "react";
import { Input } from "./ui/input";

interface EventFormProps {
  value: string;
  onChangeHandler?: () => void;
}

const Dropdown = ({ onChangeHandler, value }: EventFormProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {};

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full bg-gray-50 h-[54px] placeholder:text-grey-500 rounded-full px-5 py-3 border-none focus-visible:ring-transparent focus:ring-transparent !important">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((item) => (
            <SelectItem
              key={item._id}
              value={item._id}
              className="py-3 cursor-pointer focus:bg-gray-100 text-[14px] font-normal leading-[20px]"
            >
              {item.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="text-[14px] font-bold leading-[20px] flex w-full rounded-sm py-3 pl-2 hover:bg-gray-100 ">
            Open
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Create new category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-gray-50 mt-3 text-black h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full px-4 py-3 border-none focus-visible:ring-transparent !important"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
