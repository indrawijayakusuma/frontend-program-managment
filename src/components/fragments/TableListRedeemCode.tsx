/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { useState } from "react";

interface Props {
  dataTables: Array<any>;
  setSearch: any;
}

const TableListRedeemCode: React.FC<Props> = ({ dataTables, setSearch }) => {
  const [inputField, setInputField] = useState("");
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputField);
    setSearch(inputField);
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
            value={inputField}
            onChange={(e) => setInputField(e.target.value)}
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
          <TableHeader className="bg-[#F4F6F8] text-slate-500 dark:bg-background">
            <TableRow className="">
              <TableHead className="w-[150px]">Reedem code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Rekening</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataTables.length > 0 &&
              dataTables.map((reedeem) => (
                <TableRow key={reedeem.code}>
                  <TableCell className="font-medium">{reedeem.code}</TableCell>
                  <TableCell>{reedeem.name}</TableCell>
                  <TableCell>active</TableCell>
                  <TableCell className="text-right">
                    {reedeem.rekening}
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

export default TableListRedeemCode;
