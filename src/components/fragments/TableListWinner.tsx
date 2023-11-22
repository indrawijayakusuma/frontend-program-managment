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
import { Button } from "../ui/button";
import { useState } from "react";

interface Provider {
  winners: Array<any>;
  totalRows: number;
  startIndex: number;
  endIndex: number;
  totalPage: number;
}

interface Props {
  dataTable: Provider;
  setParam: (param: string) => void;
  pageControlHandler: (arrow: string) => void;
  setPageControl: (page: number) => void;
  limit: number;
}

const TableListWinner: React.FC<Props> = ({
  dataTable,
  setParam,
  pageControlHandler,
  setPageControl,
  limit,
}) => {
  const [search, setSearch] = useState("");
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParam(search);
    setPageControl(1);
  };
  return (
    <div>
      <div className="flex justify-start pl-5 border-x border-t rounded-t-radius border-border/40 py-5">
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex flex-row items-center gap-2"
        >
          <Input
            className="lg:w-[30%] w-[60%]  rounded-radius"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="submit"
            size={"lg"}
            className="text-primaryforeground px-5"
          >
            Submit
          </Button>
        </form>
      </div>
      <Table className="shadow-custom px-6 py-3 border-b">
        <ScrollArea className="w-[89vw] lg:w-full whitespace-nowrap">
          <TableCaption className="bg-background shadow-custom pr-10">
            <div className="flex flex-row justify-end my-5 gap-6 font-medium">
              <p>
                Row Per Page: <span className="ml-2">{limit}</span>
              </p>
              <p>
                <span>{`${dataTable.startIndex} - ${dataTable.endIndex}`}</span>{" "}
                of {dataTable.totalRows}
              </p>
              <div className="flex flex-row gap-3">
                <button
                  disabled={dataTable.startIndex === 1 ? true : false}
                  className={dataTable.startIndex === 1 ? "text-muted" : ""}
                  onClick={() => pageControlHandler("left")}
                >
                  <MdKeyboardArrowLeft className="w-6 h-6" />
                </button>
                <button
                  disabled={
                    dataTable.endIndex === dataTable.totalRows ? true : false
                  }
                  className={
                    dataTable.endIndex === dataTable.totalRows
                      ? "text-muted"
                      : ""
                  }
                  onClick={() => pageControlHandler("rigt")}
                >
                  <MdKeyboardArrowRight className="w-6 h-6" />
                </button>
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
            {dataTable.winners.length > 0 &&
              dataTable.winners.map((winner) => (
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
