"use client";

import { IEvent } from "@/lib/db/models/eventModel";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

interface CheckoutButtonProps {
  event: IEvent;
}

const CheckoutButton = ({ event }: CheckoutButtonProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const isOver = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {isOver ? (
        <p className="p-2 text-red-700">Event is over!!</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="rounded-full">
              <Link href={"/sign-in"}>Buy now</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
