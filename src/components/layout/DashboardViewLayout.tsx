import { BsDot } from "react-icons/bs";
interface Props {
  title: string;
  children: React.ReactNode;
}

export const DashboardViewLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-10 mb-10 mt-20">
      <div>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl mb-3">
          {title}
        </h1>
        <div className="flex flex-row items-center">
          Dashboard <BsDot className="w-5 h-5 text-slate-500" />
          <span className="text-slate-500">{title}</span>
        </div>
      </div>
      {children}
    </div>
  );
};
