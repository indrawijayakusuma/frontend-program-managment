import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink, Outlet } from "react-router-dom";

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
  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-[22%] flex flex-col border-r px-5 py-10 gap-1.5">
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
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default HomePage;
