import { Link, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { getWinnerByKtp } from "@/services/winnerService";
import axios from "axios";
import { showErrorsMessage } from "@/utils/sweetAlert";

interface Winner {
  name: string;
  image: string;
  gift: string;
}

export const WinnerCardUser = () => {
  const { ktp = "" } = useParams();
  const [winner, setWinner] = useState<Winner>();

  useEffect(() => {
    const getWinner = async () => {
      try {
        const response = (await getWinnerByKtp(ktp)).data;
        const { name, image, gift } = response.data;
        setWinner({ name, image, gift });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorsMessage(error.response?.data.message, false).then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = "/home";
              }
            }
          );
        }
      }
    };
    getWinner();
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

      <div className="flex justify-center min-h-screen items-center">
        <div className="border px-4 lg:w-[30%] w-[90%] h-full border-border/40 dark:border-border/90 rounded-radius py-9 lg:px-10 shadow-custom">
          <div className="w-full flex-col">
            <h1 className="scroll-m-20 text-center text-xl font-bold tracking-tight lg:text-4xl mb-6">
              Winner
            </h1>
            <div className="mt-5 h-72 w-72 bg-foreground/5 shadow-inner rounded-radius mx-auto flex items-center justify-center">
              <div
                className="h-[16rem] w-[16rem] rounded-xl  bg-center bg-cover"
                style={{ backgroundImage: `url('${winner?.image}')` }}
              ></div>
            </div>
            <h1 className="scroll-m-20 text-center text-xl font-bold tracking-tight lg:text-2xl mt-6">
              {winner?.name} 🎉
            </h1>
            <p className="text-center text-base font-medium text-foreground dark:text-foreground/50">
              Congratulations you've got an {winner?.gift}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
