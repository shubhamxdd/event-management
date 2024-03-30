"use client";

import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface SearchProps {
  placeholder?: string;
}

const Search = ({ placeholder }: SearchProps) => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const debounce = setTimeout(() => {
      let newUrl = "";
      if (value) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(debounce);
  }, [value, searchParams, router]);

  return (
    <div className="flex justify-center items-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
      <IoIosSearch size={24} />
      <Input
        type="text"
        className="border-0 bg-gray-50 outline-offset-0 placeholder:text-gray-500  focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0  "
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
