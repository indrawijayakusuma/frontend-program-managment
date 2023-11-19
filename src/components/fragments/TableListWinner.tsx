/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
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
import { showFormattedDate } from "@/utils/dataFormater";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  dataTables: Array<any>;
}

const TableListWinner: React.FC<Props> = ({ dataTables }) => {
  return (
    <div>
      <div className="flex justify-start pl-5 border-x border-t rounded-t-radius border-border/40 py-5">
        <Input
          className="lg:w-[30%] w-[60%] py-6 rounded-radius"
          type="email"
          placeholder="Search..."
        />
      </div>
      <Table className="shadow-custom px-6 py-3 border-b">
        <ScrollArea className="w-[89vw] lg:w-full whitespace-nowrap">
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
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead>Rekening</TableHead>
              <TableHead>Gift</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataTables.length > 0 &&
              dataTables.map((winner) => (
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
  );
};

export default TableListWinner;
