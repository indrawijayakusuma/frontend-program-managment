import { Link } from "react-router-dom";
import banner from "../assets/banner.webp";
import spin from "../assets/SPINNERV2.svg";
import { Button } from "@/components/ui/button";

const HomeUserPage = () => {
  return (
    <div className="">
      <nav className="border border-border/40 dark:border-border shadow-custom bg-background fixed w-full">
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
      <div className="flex lg:w-[100%] w-[90%] mx-auto pt-16">
        <img
          className="lg:w-[100%] flex justify-center rounded-md m-auto object-fill"
          src={banner}
          alt=""
        />
      </div>

      <div className="flex mt-40 flex-row items-center justify-center w-[90%] mx-auto mb-32 bg-gradient-to-r from-[#006a78] to-[#00434b] border-border/40 shadow-custom rounded-radius h-[30rem] gap-16">
        <div className="w-[26rem]">
          <img src={spin} className="animate-spin-slow" alt="" />
        </div>
        <div className="flex flex-col gap-3 w-[30rem]">
          <p className="text-5xl font-extrabold text-primaryforeground">
            Lorem ipsum dolor sit amet.
          </p>
          <div className="flex gap-3 text-primaryforeground mt-6">
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
              className="text-primaryforeground bg-transparent border border-border/40 shadow-custom hover:bg-primaryforeground"
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
