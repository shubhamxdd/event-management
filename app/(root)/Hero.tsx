import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
      <div className="flex flex-col justify-center gap-8">
        <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">
          Making Your Events Unforgettable
        </h1>
        <p className="text-[20px] font-normal leading-[30px] tracking-[2%] md:font-normal md:text-[24px] md:leading-[36px]">
          From corporate events to intimate gatherings, we provide seamless
          organization and memorable experiences.
        </p>
        <Button
          size={"lg"}
          className="w-full sm:w-fit rounded-full h-[54px]"
          asChild
        >
          <Link href={"#events"}>Explore now</Link>
        </Button>
      </div>
      <Image
        src={"/assets/images/hero.png"}
        alt="Hero image"
        className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] my-20"
        height={1000}
        width={1000}
      />
    </div>
  );
};

export default Hero;
