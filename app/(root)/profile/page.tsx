import { getEventsByUser } from "@/actions/event";
import Collection from "@/components/Collection";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const ProfilePage = async () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const hostedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      <section className="bg-gray-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex justify-center items-center sm:justify-between">
          <h2 className="font-bold text-center text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] sm:text-left">
            My Tickets
          </h2>
          <Button asChild className="hidden sm:flex rounded-full">
            <Link href={"/#events"}>Explore more events</Link>
          </Button>
        </div>
      </section>

      {/* <section className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full my-8">
        <Collection
          data={events?.data}
          emptyTitle="No tickets purchased yet"
          emptyDescription="Kharid le bhai"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName="ordersPage"
        />
      </section> */}

      <section className="bg-gray-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex justify-center items-center sm:justify-between">
          <h2 className="font-bold text-center text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] sm:text-left">
            Events you hosted
          </h2>
          <Button asChild className="hidden sm:flex rounded-full">
            <Link href={"/events/create"}>Create new event</Link>
          </Button>
        </div>
      </section>

       <section className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full my-8">
        <Collection
          data={hostedEvents?.data}
          emptyTitle="No Events created yet"
          emptyDescription="Bana le bhai"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          totalPages={2}
          urlParamName="eventsPage"
        />
      </section>
    </>
  );
};

export default ProfilePage;
