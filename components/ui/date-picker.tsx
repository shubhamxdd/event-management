"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date) => void | undefined;
  isStart?: boolean;
}
export function DatePicker({ date, setDate, isStart }: DatePickerProps) {
  //   console.log(date);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("", !date && "text-muted-foreground")}
        >
          {date ? (
            format(date, "PPP")
          ) : (
            <span>Pick {isStart ? "Start" : "End"} date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          // @ts-ignore
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
