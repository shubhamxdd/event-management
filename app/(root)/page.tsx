import Events from "./Events";
import Hero from "./Hero";

export default function Home() {
  return (
    <>
      <section className="bg-gray-50 bg-dotted-pattern bg-contain py-5 md:py10">
        <Hero />
      </section>
      <section
        id="events"
        className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full my-8 flex flex-col gap-8 md:gap-12"
      >
        <Events />
      </section>
    </>
  );
}
