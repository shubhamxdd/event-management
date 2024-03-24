"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();
  const headerLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create Event",
      href: "/events/create",
    },
    {
      label: "My Profile",
      href: "/profile",
    },
  ];
  return (
    <ul className="md:flex md:justify-between md:items-center flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link, i) => {
        const isActive = pathname === link.href;
        return (
          <li
            key={i}
            className={`${
              isActive
                ? "font-semibold flex justify-center items-center text-[16px] leading-[24px] whitespace-nowrap "
                : ""
            }`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
