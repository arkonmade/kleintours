import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { LuSearch, LuTickets } from "react-icons/lu";

import "./../style/component.scss";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { IoCarSportOutline, IoInformation } from "react-icons/io5";
import { TbMap2 } from "react-icons/tb";

const solutions = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const sections = ["cars", "tours", "about", "contact"];
const menuItems = [
  {
    name: "Cars",
    link: "#cars",
    icon: IoCarSportOutline,
  },
  {
    name: "Tours",
    link: "#tours",
    icon: TbMap2,
  },
  {
    name: "About",
    link: "#about",
    icon: IoInformation,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: PhoneIcon,
  },
];

const Navbar = () => {
  const { hash } = useLocation();

  return (
    <>
      <div className="header">
        <div className="navbar">
          <div className="nav">
            <Link className="logo">
              <img
                src={assets.brand.logo}
                alt={assets.alt.text + "Logo-image"}
              />
            </Link>
            <ul className="menu">
              {sections.map((id) => (
                <li key={id}>
                  <Link
                    to={`/#${id}`}
                    className={hash === `#${id}` ? "active" : ""}
                  >
                    <span>{id}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="actions">
            <button className="search">
              <span>
                <LuSearch />
              </span>
            </button>
            <button className="book">
              <span>
                <LuTickets />
              </span>
              <span className="txt">Book Experience</span>
            </button>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <PopoverButton className={`menu-btn ${open ? "active" : ""}`}>
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar3"></span>
                  </PopoverButton>

                  <PopoverPanel
                    transition
                    className="absolute menu-item-panel left-1/5 z-10 mt-5 flex w-screen max-w-max
          -translate-x-1/5 bg-transparent p-4 transition
          data-closed:translate-y-1 data-closed:opacity-0
          data-enter:duration-200 data-enter:ease-out
          data-leave:duration-150 data-leave:ease-in"
                  >
                    <div className="w-screen max-w-[200px] overflow-hidden rounded-xl bg-[#c9a240]">
                      <div className="p-4 item-panel-list">
                        <ul className="flex flex-col gap-1">
                          {menuItems.map((item) => (
                            <li key={item.name}>
                              <Popover.Button
                                as={Link}
                                to={item.link}
                                className="group navlink flex items-center gap-3 rounded-md hover:bg-[#3a5f52]/40"
                              >
                                <span
                                  className="flex size-6 items-center justify-center rounded-md bg-[#3a5f52]/60
                      group-hover:bg-[#3a5f52] group-hover:text-[#f7f6f2]"
                                >
                                  <item.icon className="size-4" />
                                </span>
                                <span className="font-medium capitalize group-hover:text-[#f7f6f2]">
                                  {item.name}
                                </span>
                              </Popover.Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </PopoverPanel>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
