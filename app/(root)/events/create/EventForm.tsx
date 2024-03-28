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
import { useUploadThing } from "@/lib/uploadthing";
import { IoLocationOutline, IoCalendarClear } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/actions/event";
import { IEvent } from "@/lib/db/models/eventModel";

interface EventFormProps {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
}

const EventForm = ({ type, userId, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const eventDefaultValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
          imageUrl: event.imageUrl,
        }
      : {
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

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
          },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: eventId,
          },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
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

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[55px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <FaRupeeSign size={24} />
                    <Input
                      type="number"
                      placeholder="Price"
                      disabled={!!form.getValues("isFree")}
                      className="border-0 text-[16px] font-normal leading-[24px] bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-gray-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center items-center h-[55px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <FaLink size={24} />
                    <Input
                      placeholder="URL"
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

        <Button
          type="submit"
          size={"lg"}
          disabled={form.formState.isSubmitting}
          className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] col-span-2 w-full"
        >
          {form.formState.isSubmitting ? <Spinner /> : type + " Event"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
