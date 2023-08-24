"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    icon: { path: "/logo.svg", alt: "app logo", width: 32, height: 32 },
    to: "/",
    name: "logo",
  },
  {
    icons: [
      {
        icon: { path: "/links.svg", alt: "links", width: 20, height: 20 },
        nam: "links",
        to: "/",
      },
      {
        icon: {
          path: "/profile.svg",
          alt: "profile icon",
          width: 20,
          height: 20,
        },
        to: "/profile",
        name: "profile",
      },
    ],
    name: "links-profile",
  },
  {
    icon: {
      path: "/preview.svg",
      alt: "links preview icon",
      width: 20,
      height: 20,
    },
    to: "/preview",
    name: "preview",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="self-stretch bg-white">
      <ul className="flex items-center py-4 pl-4 pr-6">
        {links.map(({ icon, icons, name, to }) =>
          icon !== undefined ? (
            <Link key={name} href={to}>
              <Image
                src={icon.path}
                alt={icon.alt}
                width={icon.width}
                height={icon.height}
              />
            </Link>
          ) : (
            <div className="mx-auto flex" key={name}>
              {icons.map(({ icon: { path, alt, width, height }, name, to }) => (
                <Link key={name} href={to}>
                  <div
                    className={clsx(
                      "rounded-lg px-[1.69rem] py-[0.69rem]",
                      pathname === to && "bg-blue-chalk",
                    )}
                  >
                    <Image src={path} alt={alt} width={width} height={height} />
                  </div>
                </Link>
              ))}
            </div>
          ),
        )}
      </ul>
    </nav>
  );
}
