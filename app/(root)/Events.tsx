import { getAllEvents } from "@/actions/event";
import CategoryFilter from "@/components/CategoryFilter";
import Collection from "@/components/Collection";
import Search from "@/components/Search";

const Events = async ({ searchParams }: any) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <h2 className="font-bold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
        Popular events <br /> In your area
      </h2>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Search placeholder="Search" />
        <CategoryFilter />
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
