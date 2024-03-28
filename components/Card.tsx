import { IEvent } from "@/lib/db/models/eventModel";
import { IoArrowForward } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import ConfirmDelete from "./ConfirmDelete";

interface CardProps {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const isEventHost = event.host._id.toString() === userId;

  return (
    <div className="group flex relative min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex justify-center items-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />

      {isEventHost && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <FaRegEdit size={20} />
          </Link>
          <ConfirmDelete eventId={event._id} />
        </div>
      )}

      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="text-[14px] font-semibold rounded-full bg-blue-500/10 px-4 py-1 text-blue-700">
              {event.isFree ? "Free" : "₹ " + event.price}
            </span>
            <p className="text-[14px] font-semibold rounded-full bg-purple-500/10 px-4 py-1 text-purple-700 capitalize">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="text-[16px] font-medium text-gray-500">
          {formatDateTime(event.startDateTime).dateOnly}
        </p>
        <p className="text-[18px] font-medium line-clamp-2 flex-1 text-black">
          {event.title}
        </p>
        <div className="flex justify-between items-center w-full">
          <p className="text-[12px] md:text-[14px] font-medium text-gray-600">
            {event.host.firstName} {event.host.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-gray-500">Order Details</p>
              <IoArrowForward size={16} />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;