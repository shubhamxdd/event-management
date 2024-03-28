import { getEvent } from "@/actions/event";

const EventPage = async ({ params: { id } }: { params: { id: string } }) => {
  const event = await getEvent(id);

  console.log(event);

  return <div>EventPage</div>;
};

export default EventPage;
