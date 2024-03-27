"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validation";
import Dropdown from "@/components/Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarClear } from "react-icons/io5";
import { DatePicker } from "@/components/ui/date-picker";

interface EventFormProps {
  userId: string;
  type: "Create" | "Update";
}

const EventForm = ({ type, userId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const eventDefaultValues = {
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: "",
    price: "",
    isFree: false,
    url: "",
  };

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // console.log(values);
    console.log(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    {...field}
                    className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full px-4 py-3 border-none focus-visible:ring-transparent !important"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="">
                  <Textarea
                    placeholder="Event Description"
                    {...field}
                    className="bg-gray-50 h-72 rounded-2xl flex flex-1 placeholder:text-grey-500 p-regular-16 focus-visible:ring-offset-0 placeholder:text-grey-500 px-4 py-3 border-none focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="">
                  <FileUpload
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center items-center h-[55px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <IoLocationOutline size={24} />
                    <Input
                      placeholder="Event Location"
                      className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[55px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <IoCalendarClear size={24} />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      Start Date
                    </p>
                    <DatePicker
                      isStart
                      date={field.value}
                      setDate={(date) => field.onChange(date)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[55px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <IoCalendarClear size={24} />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      End Date
                    </p>
                    <DatePicker
                      date={field.value}
                      setDate={(date) => field.onChange(date)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EventForm;
