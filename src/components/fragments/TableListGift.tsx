/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { postGift } from "@/services/giftService";
import { showErrorsMessage, showSuccessMessage } from "@/utils/sweetAlert";
import axios from "axios";

interface Props {
  dataTables: Array<any>;
  onReload: () => void;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select an email to display.",
  }),
});

const TableListGift: React.FC<Props> = ({ dataTables, onReload }) => {
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  useEffect(() => {
    if (submit) {
      showSuccessMessage("Gift has been added");
      form.reset();
      onReload();
      setSubmit(false);
    }
  }, [submit, form, onReload]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      await postGift(data);
      setSubmit(true);
      setOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorsMessage(error.response?.data.message, false);
      }
    }
  }
  return (
    <div>
      <div className="flex justify-start pl-5 border-x border-t rounded-t-radius border-border/40 py-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2 py-5">
              <MdAddBox /> Add new gift
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-[90%]">
            <DialogHeader>
              <DialogTitle>Add Gift</DialogTitle>
              <DialogDescription>Add new gift to the list</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormDescription>Input the gift name</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="py-[1.329rem]">
                            <SelectValue placeholder="Select gift type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background">
                          <SelectItem value="visitor">Visitor</SelectItem>
                          <SelectItem value="merchant">Merchant</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select a gift type for customer or visitor
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" className="text-primaryforeground">
                    Submit
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Table className="shadow-custom px-6 py-3 border-b">
        <ScrollArea className="w-[89vw] lg:w-full whitespace-nowrap">
          <TableHeader className="bg-[#F4F6F8] text-slate-500 dark:bg-background">
            <TableRow className="">
              <TableHead className="w-[200px]">No</TableHead>
              <TableHead className="w-96">Name</TableHead>
              <TableHead className="text-right">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataTables.length > 0 &&
              dataTables.map((gift, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{gift.name}</TableCell>
                  <TableCell className="text-right">{gift.type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Table>
    </div>
  );
};

export default TableListGift;
