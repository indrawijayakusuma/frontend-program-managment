import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink, Outlet } from "react-router-dom";
import { Html5Qrcode, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect } from "react";

const menus = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Visitor",
    path: "/visitor",
  },
  {
    name: "Merchant",
    path: "/merchant",
  },
  {
    name: "Redeem Code",
    path: "/redeem-code",
  },
  {
    name: "Winner",
    path: "/winner",
  },
];

const HomePage = () => {
  // let scanner: Html5QrcodeScanner;
  let html5QrCode: Html5Qrcode;
  useEffect(() => {
    if (!html5QrCode?.getState) {
      html5QrCode = new Html5Qrcode("reader1");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
        /* handle success */
        console.log(decodedText, decodedResult);
      };
      const config = {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        aspectRatio: 1.7777778,
      };

      // If you want to prefer back camera
      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        (e) => {
          console.log(e);
        }
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // scanner = new Html5QrcodeScanner(
      //   "reader",
      //   {
      //     qrbox: {
      //       width: 250,
      //       height: 250,
      //     },
      //     fps: 10,
      //     rememberLastUsedCamera: true,
      //     supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      //     aspectRatio: 1.7777778,
      //   },
      //   false
      // );

      // scanner.render(
      //   (result) => {
      //     scanner.clear();
      //     console.log(result);
      //   },
      //   (e) => {
      //     console.log(e);
      //   }
      // );
    }
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-[22%] md:flex flex-col border-r px-5 py-10 gap-1.5 hidden">
          <h2 className="scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight first:mt-0">
            The Program
          </h2>
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                [
                  isActive
                    ? "py-2 rounded-md pl-3 cursor-pointer bg-primary/20 text-primary font-bold"
                    : "py-2 rounded-md pl-3 hover:bg-hover cursor-pointer text-slate-500",
                ].join("")
              }
            >
              <span className="text-md font-semibold">{menu.name}</span>
            </NavLink>
          ))}
        </div>
        <div className=" grow w-full">
          <ScrollArea className="w-full h-screen text-justify py-5 px-10">
            <Outlet />
            {/*  <div className="w-full" id="reader"></div> */}
            <div className="w-full lg:w-1/2" id="reader1"></div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default HomePage;
