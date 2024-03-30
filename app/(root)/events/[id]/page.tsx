import { getEvent, getRelatedEventsByCategory } from "@/actions/event";
import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import Collection from "@/components/Collection";
import CheckoutButton from "@/components/CheckoutButton";

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const EventPage = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEvent(id);

  const events = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-gray-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h1 className="font-bold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
                {event.title}
              </h1>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="font-medium text-[16px] leading-[30px] tracking-[2%] rounded-full bg-blue-500/10 px-5 py-2 text-blue-700">
                    {event.isFree ? "Free" : "₹ " + event.price}
                  </p>
                  <p className="text-[16px] font-medium leading-[24px] rounded-full bg-purple-900/10 px-4 py-2.5 text-purple-700 capitalize">
                    {event.category.name}
                  </p>
                </div>
                <p className="text-[18px] font-medium leading-[28px] ml-2 mt-2 sm:mt-0 text-zinc-500">
                  by {event.host.firstName} {event.host.lastName}
                </p>
              </div>
              <CheckoutButton event={event} />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <FaCalendarAlt size={28} />
                <div className="text-[16px] font-medium leading-[24px] flex flex-wrap items-center">
                  <p>{formatDateTime(event.startDateTime).dateOnly} - </p>
                  <p className="ml-1">
                    {formatDateTime(event.endDateTime).dateOnly}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[16px] font-medium leading-[24px] ">
                <IoLocationOutline size={28} />

                <p className="text-[16px] font-medium leading-[24px]">
                  {event.location}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[20px] leading-[30px] tracking-[2%] text-gray-600">
                What you'll learn:
              </p>
              <p className="text-[16px] font-medium leading-[24px]">
                {event.description}
              </p>
              <p className="text-[16px] font-medium leading-[24px] truncate text-gray-500 underline">
                <Link href={event.url}>{event.url}</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="font-bold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
          May Also Like
        </h2>
        <Collection
          data={events?.data}
          emptyTitle="No events found"
          emptyDescription="Try searching for events in a different location or category"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
};

export default EventPage;
