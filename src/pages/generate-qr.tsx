import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRedeemCode } from "@/services/redeemCodeService";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

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
    <>
      <nav className="bg-background border border-border/40 dark:border-border shadow-custom">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/home" className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
              className="h-8 mr-3"
              alt="BNI Logo"
            />
          </Link>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/home"
                  className=" block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/generate-qr"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#FF6600] md:p-0"
                >
                  play
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className=" flex justify-center min-h-screen mt-14">
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
    </>
  );
};

export default GenerateQrPage;
