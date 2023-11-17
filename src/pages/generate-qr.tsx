import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRedeemCode } from "@/services/redeemCodeService";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiMenuAlt2 } from "react-icons/hi";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

const GenerateQrPage = () => {
  const [ktp, setKtp] = useState("");
  const [qrCode, setQrCode] = useState("");
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      ktp: { value: string };
    };
    setKtp(target.ktp.value);
  };

  useEffect(() => {
    document.title = "home";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getCode = async () => {
      if (ktp) {
        try {
          const response = (await getRedeemCode(ktp)).data;
          const data = response.data;
          setQrCode(data[0].code);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getCode();
  }, [ktp]);

  return (
    <div className="relative">
      <div className="flex fixed items-center lg:px-12 pr-6 pl-6 justify-between lg:border-border/40 dark:border-border/90 border-b-border border-b lg:justify-between backdrop-blur-md bg-background/30 z-10 w-full h-14 lg:h-16">
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
                <Link to="/home">
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link to={"/generate-qr"}>
                  <DropdownMenuItem>Play</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
          className="h-8 mr-3"
          alt="BNI Logo"
        />
        <div className="flex flex-row gap-5 items-center">
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/home"
                  className=" block py-2 text-foreground pl-3 pr-4 rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/generate-qr"
                  className="block py-2 pl-3 pr-4 text-foreground rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  play
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex h-5 items-center space-x-4 text-sm">
            <Separator orientation="vertical" className="hidden lg:block" />
            <ModeToggle />
          </div>
        </div>
      </div>

      <div className=" flex justify-center min-h-screen lg:pt-28 pt-20">
        <div className="border px-4 lg:w-[30%] w-[90%] h-full border-border/40 rounded-radius py-10 lg:px-10 shadow-custom">
          <div className="w-full flex-col">
            <h1 className="scroll-m-20 text-center text-xl font-bold tracking-tight lg:text-2xl mb-1">
              Scan QR Code
            </h1>
            <p className="font-normal text-center text-base text-slate-500 dark:text-foreground/50">
              Show this QR code to play the game
            </p>
            <div className="mt-5 h-72 w-72 bg-foreground/5  shadow-inner rounded-radius mx-auto">
              {qrCode && (
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`/winner/${qrCode}`}
                  viewBox={`0 0 256 256`}
                />
              )}
            </div>
            <div className="mt-6">
              <p className="font-normal text-sm text-slate-500 dark:text-foreground/50 mb-3">
                Input KTP to get your QR code
              </p>
              <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
                <Input name="ktp" type="text" placeholder="KTP" />
                <Button
                  type="submit"
                  className="text-primaryforeground"
                  size={"lg"}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateQrPage;
