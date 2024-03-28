import { getAllEvents } from "@/actions/event";
import Collection from "@/components/Collection";

const Events = async () => {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  return (
    <>
      <h2 className="font-bold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
        Popular events <br /> In your area
      </h2>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        Search, category, filter TODO
      </div>
      <Collection
        data={events?.data}
        emptyTitle="No events found"
        emptyDescription="Try searching for events in a different location or category"
        collectionType="All_Events"
        limit={5}
        page={1}
        totalPages={2}
      />
    </>
  );
};

export default Events;
