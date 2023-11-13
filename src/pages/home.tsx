/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink, Outlet } from "react-router-dom";
import { Html5Qrcode, Html5QrcodeScanType } from "html5-qrcode";
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

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: <AiOutlineDashboard className="w-6 h-6" />,
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
  let html5QrCode: Html5Qrcode;
  useEffect(() => {
    if (!html5QrCode?.getState) {
      html5QrCode = new Html5Qrcode("reader1");
      const qrCodeSuccessCallback = (decodedText: string) => {
        window.location.href = decodedText;
        html5QrCode
          .stop()
          .then(() => {
            console.log("QR Code scanning is stopped");
          })
          .catch((err: string) => {
            console.log(err);
          });
      };
      const config = {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 1000,
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        aspectRatio: 1.7777778,
      };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        (e) => {
          console.log(e);
        }
      );
    }
  }, []);

  useEffect(() => {
    document.title = "dashboard";
  }, []);

  return (
    <>
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
          <div className="flex items-center pr-3 justify-end backdrop-blur-md bg-background/30 z-10 absolute w-full h-14">
            <ModeToggle />
          </div>
          <ScrollArea className="w-full h-[100vh] text-justify px-10">
            <Outlet />
            <div className="w-full lg:w-1/2" id="reader1"></div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default HomePage;
