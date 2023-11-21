import { Link } from "react-router-dom";
import banner from "../../assets/banner.webp";
import spin from "../../assets/SPINNERV2.svg";
import { Button } from "@/components/ui/button";
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

const HomeUserPage = () => {
  return (
    <div className="relative">
      <div className="flex fixed items-center lg:px-12 pr-6 pl-6 justify-between lg:border-border/25 border-b-border border-b lg:justify-between backdrop-blur-md bg-background/30 z-10 w-full h-14 lg:h-16">
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
      <div className="flex lg:w-[100%] w-[90%] mx-auto lg:pt-16 pt-[4.7rem]">
        <img
          className="lg:w-[100%] flex justify-center rounded-md m-auto object-fill"
          src={banner}
          alt=""
        />
      </div>

      <div className="flex mt-10 lg:mt-40 flex-col lg:flex-row items-center justify-center w-[90%] py-10 mx-auto mb-14 lg:mb-32 bg-gradient-to-r from-[#006a78] to-[#00434b] border-border/40 shadow-custom rounded-radius h-[35rem] gap-10 lg:gap-24">
        <div className="lg:w-[29rem] w-[16rem]">
          <img src={spin} className="animate-spin-slow drop-shadow-xl" alt="" />
        </div>
        <div className="flex flex-col gap-3 lg:w-[30rem] w-[20rem]">
          <p className="lg:text-5xl text-4xl text-center lg:text-left font-extrabold text-primaryforeground dark:text-primary">
            Get a Chance To Win Exciting Prizes.
          </p>
          <div className="flex gap-3 text-primaryforeground mt-6 lg:mx-0 mx-auto">
            <Link to="/generate-qr">
              <Button
                size={"lg"}
                className="bg-primaryforeground text-foreground hover:bg-primaryforeground/90"
              >
                Visitor
              </Button>
            </Link>
            <Button
              size={"lg"}
              className="text-primaryforeground dark:text-primary bg-transparent border border-border/40 shadow-custom hover:bg-primaryforeground"
            >
              Tenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUserPage;
