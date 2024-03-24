import Link from "next/link";
import Logo from "./Logo";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between">
        <Link href={"/"} className="w-36">
          <Logo />
        </Link>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full px-5 py-1">
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
