import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getWinner } from "@/services/winnerService";
import { showFormattedDate } from "@/utils";
import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// const data = [
//   {
//     name: "name",
//     rekening: "rekening",
//     gift: "gift",
//     date: "date",
//   },
//   {
//     name: "name",
//     rekening: "rekening",
//     gift: "gift",
//     date: "date",
//   },
//   {
//     name: "name",
//     rekening: "rekening",
//     gift: "gift",
//     date: "date",
//   },
//   {
//     name: "name",
//     rekening: "rekening",
//     gift: "gift",
//     date: "date",
//   },
//   {
//     name: "name",
//     rekening: "rekening",
//     gift: "gift",
//     date: "date",
//   },
//   {
//     name: "name",
//     rekening: "rekening",
//     gift: "gift",
//     date: "date",
//   },
//   {
//     name: "name",
//     rekening: "rekening",
//     gift: "gift",
//     date: "date",
//   },
//   {
//     name: "name",
//     rekening: "rekening",
//     gift: "gift",
//     date: "date",
//   },
// ];

interface Provider {
  name: string;
  rekening: string;
  gift: string;
  date: string;
}

const WinnerPage = () => {
  const [gift, setGift] = useState<Provider[]>([]);
  useEffect(() => {
    document.title = "winner";
  }, []);

  useEffect(() => {
    const getWinnersData = async () => {
      try {
        const response = (await getWinner()).data;
        console.log(response.data);
        setGift(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getWinnersData();
  }, []);

  return (
    <div className="flex flex-col gap-10 mb-10 mt-20">
      <div>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl mb-3">
          Winners
        </h1>
        <div className="flex flex-row items-center">
          Dashboard <BsDot className="w-5 h-5 text-slate-500" />
          <span className="text-slate-500">Winners</span>
        </div>
      </div>
      <div>
        <div className="flex justify-start pl-5 border-x border-t rounded-t-radius border-border/40 py-5">
          <Input
            className="lg:w-[30%] w-[60%] py-6 rounded-radius"
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
          <ScrollArea className="w-[89vw] lg:w-full whitespace-nowrap">
            <TableHeader className="bg-[#F4F6F8] text-slate-500 dark:bg-background">
              <TableRow className="">
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead>Rekening</TableHead>
                <TableHead>Gift</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gift.length > 0 &&
                gift.map((winner) => (
                  <TableRow key={winner.date}>
                    <TableCell className="font-medium">{winner.name}</TableCell>
                    <TableCell>{winner.rekening}</TableCell>
                    <TableCell>{winner.gift}</TableCell>
                    <TableCell className="text-right">
                      {showFormattedDate(winner.date)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Table>
      </div>
    </div>
  );
};
export default WinnerPage;
