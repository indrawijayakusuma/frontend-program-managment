import { Input } from "@/components/ui/input";
import { BsDot } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { getAllVisitor } from "@/services/visitorService";
import { showFormattedNumber } from "@/utils";

interface Provider {
  no_ktp: string;
  name: string;
  rekening: string;
  setoran: number;
}

const VisitorListPage = () => {
  const [visitor, setVisitor] = useState<Provider[]>([]);

  useEffect(() => {
    document.title = "visitor-list";

    const getVisitorData = async () => {
      try {
        const response = (await getAllVisitor()).data;
        console.log(response.data.visitor);
        setVisitor(response.data.visitor);
      } catch (error) {
        console.log(error);
      }
    };

    getVisitorData();
  }, []);

  return (
    <div className="flex flex-col gap-10 mb-10 mt-14">
      <div>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl mb-3">
          Visitors
        </h1>
        <div className="flex flex-row items-center">
          Dashboard <BsDot className="w-5 h-5 text-slate-500" />
          <span className="text-slate-500">Visitors</span>
        </div>
      </div>
      <div>
        <div className="flex justify-start pl-5 border-x border-t rounded-t-radius border-border/40 py-5">
          <Input
            className="w-[30%] py-6 rounded-radius"
            type="email"
            placeholder="Search..."
          />
        </div>
        <Table className="shadow-custom px-6 py-3 border-b">
          <TableCaption className="bg-background shadow-custom pr-10">
            <div className="flex flex-row justify-end my-5 gap-6 font-medium">
              <p>
                Row Per Page: <span className="ml-2">5</span>
              </p>
              <p>1-5 of 20</p>
              <div className="flex flex-row gap-3">
                <MdKeyboardArrowLeft className="w-6 h-6" />
                <MdKeyboardArrowRight className="w-6 h-6" />
              </div>
            </div>
          </TableCaption>
          <TableHeader className="bg-[#F4F6F8] text-slate-500 dark:bg-background">
            <TableRow className="">
              <TableHead className="w-[150px]">KTP</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rekening</TableHead>
              <TableHead className="text-right">Setoran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitor.length > 0 &&
              visitor.map((visitor) => (
                <TableRow key={visitor.no_ktp}>
                  <TableCell className="font-medium">
                    {visitor.no_ktp}
                  </TableCell>
                  <TableCell>{visitor.name}</TableCell>
                  <TableCell>{visitor.rekening}</TableCell>
                  <TableCell className="text-right">
                    {showFormattedNumber(visitor.setoran)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VisitorListPage;
