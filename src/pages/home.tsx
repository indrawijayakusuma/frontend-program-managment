/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "@/components/mode-toggle";
import { FaUsers } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { GiTrophyCup } from "react-icons/gi";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineStorefront } from "react-icons/md";
import { HiQrcode } from "react-icons/hi";
import { BiQrScan } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { HiMenuAlt2 } from "react-icons/hi";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: <AiOutlineDashboard className="w-6 h-6" />,
  },
  {
    name: "QR Code Scanner",
    path: "/scan-qr",
    icon: <BiQrScan className="w-6 h-6" />,
  },
  {
    name: "Visitor",
    path: "/",
    icon: <FaUsers className="w-6 h-6" />,
    children: [
      {
        id: 1,
        name: "List",
        path: "/visitor/list",
        icon: <BsDot className="w-6 h-6" />,
      },
      {
        id: 2,
        name: "Create",
        path: "/visitor/create",
        icon: <BsDot className="w-6 h-6" />,
      },
    ],
  },
  {
    name: "Merchant",
    path: "/merchant",
    icon: <MdOutlineStorefront className="w-7 h-7" />,
    children: [
      {
        id: 1,
        name: "List",
        path: "/merchant/list",
        icon: <BsDot className="w-6 h-6" />,
      },
      {
        id: 2,
        name: "Create",
        path: "/merchant/create",
        icon: <BsDot className="w-6 h-6" />,
      },
    ],
  },
  {
    name: "Redeem Code",
    path: "/redeem-code",
    icon: <HiQrcode className="w-6 h-6" />,
  },
  {
    name: "Winner",
    path: "/winner",
    icon: <GiTrophyCup className="w-6 h-6" />,
  },
];

const HomePage = () => {
  useEffect(() => {
    document.title = "dashboard";
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-[22%] md:flex flex-col border-r px-5 py-10 gap-1.5 hidden">
        <img
          src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
          className="w-36 mb-8 mx-auto"
          alt="BNI Logo"
        />

        {menus.map((menu) =>
          menu.children && menu.children.length > 0 ? (
            <Accordion
              key={menu.name}
              type="single"
              collapsible
              className="w-full pl-3"
            >
              <AccordionItem value="item-1">
                <div className="flex items-center text-slate-500 dark:text-foreground/50">
                  {menu.icon}
                  <div className="w-full ml-4">
                    <AccordionTrigger className="no-underline">
                      {menu.name}
                    </AccordionTrigger>
                  </div>
                </div>
                <AccordionContent className="light:bg-slate-50 align-bottom ">
                  <div className="flex flex-col gap-2">
                    {menu.children.map((child) => (
                      <NavLink
                        key={child.id}
                        to={child.path}
                        className={({ isActive }) =>
                          [
                            isActive
                              ? "py-[0.65rem] rounded-md pl-3 cursor-pointer bg-primary/10 text-primary font-bold"
                              : "py-[0.65rem] rounded-md pl-3 hover:bg-hover cursor-pointer text-slate-500 dark:text-foreground/50",
                          ].join("")
                        }
                      >
                        <div className="flex flex-row items-center">
                          {child.icon}
                          <span className="text-sm font-medium ml-4">
                            {child.name}
                          </span>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                [
                  isActive
                    ? "py-[0.65rem] rounded-md pl-3 cursor-pointer bg-primary/10 text-primary font-bold"
                    : "py-[0.65rem] rounded-md pl-3 hover:bg-hover cursor-pointer text-slate-500 dark:text-foreground/50",
                ].join("")
              }
            >
              <div className="flex flex-row items-center">
                {menu.icon}
                <span className="text-sm font-medium ml-4">{menu.name}</span>
              </div>
            </NavLink>
          )
        )}
      </div>
      <div className="grow w-full relative">
        <div className="flex items-center pr-8 pl-8 justify-between lg:border-border/25 border-b-border border-b lg:justify-end backdrop-blur-md bg-background/30 z-10 absolute w-full h-14">
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <div>
                  <HiMenuAlt2 className="w-7 h-7" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to="">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <Link to={"/scan-qr"}>
                    <DropdownMenuItem>QR Code Scanner</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Visitor</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-background z-50">
                        <Link to={"/visitor/list"}>
                          <DropdownMenuItem>List</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link to={"/visitor/create"}>
                          <DropdownMenuItem>Create</DropdownMenuItem>
                        </Link>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Merchant</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-background z-50">
                        <Link to={"/merchant/list"}>
                          <DropdownMenuItem>List</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link to={"/merchant/create"}>
                          <DropdownMenuItem>Create</DropdownMenuItem>
                        </Link>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Link to={"/redeem-code"}>
                  <DropdownMenuItem>Redeem Code</DropdownMenuItem>
                </Link>
                <Link to={"/winner"}>
                  <DropdownMenuItem>Winner</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ModeToggle />
        </div>
        <ScrollArea className="w-full h-[100vh] text-justify lg:px-10 px-5">
          <Outlet />
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomePage;
