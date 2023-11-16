import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllRedeemCode } from "@/services/redeemCodeService";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { BsDot } from "react-icons/bs";

interface Provider {
  code: string;
  isUsed: boolean;
  name: string;
  rekening: string;
}

const ReedemPage = () => {
  const [reedeem, setReedeem] = useState<Provider[]>([]);

  useEffect(() => {
    document.title = "reedeem page";
    const getReedeem = async () => {
      try {
        const response = (await getAllRedeemCode()).data;
        console.log(response.data);
        setReedeem(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReedeem();
  }, []);
  return (
    <div className="flex flex-col gap-10 mb-10 mt-14">
      <div>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl mb-3">
          Redeem Code
        </h1>
        <div className="flex flex-row items-center">
          Dashboard <BsDot className="w-5 h-5 text-slate-500" />
          <span className="text-slate-500">Redeem Code</span>
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
              <TableHead className="w-[150px]">Reedem code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Rekening</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reedeem.map((reedeem) => (
              <TableRow key={reedeem.code}>
                <TableCell className="font-medium">{reedeem.code}</TableCell>
                <TableCell>{reedeem.name}</TableCell>
                <TableCell>active</TableCell>
                <TableCell className="text-right">{reedeem.rekening}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default ReedemPage;
