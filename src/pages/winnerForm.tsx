/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCustomerByRedeemCode } from "@/services/customerService";
import { Label } from "@radix-ui/react-label";
import { getWinner, postWinner } from "@/services/winnerService";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  rekening: z.string().min(4, {
    message: "Rekening must be at least 4 characters.",
  }),
  gift: z.string({
    required_error: "Please select an gift to display.",
  }),
});

const WinnerFormPage = () => {
  interface Provider {
    name: string;
    no_ktp: string;
    rekening: string;
    type: string;
  }
  const { code = "" } = useParams();
  const [data, setData] = useState<Provider>();
  const [gift, setGift] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      return fetch(`http://localhost:3000/customers/${code}`)
        .then((res) => res.json())
        .then((json) => {
          return {
            name: json.data.name,
            rekening: json.data.rekening,
            gift: "",
          };
        });
    },
  });

  useEffect(() => {
    const getCode = async () => {
      try {
        const result = (await getCustomerByRedeemCode(code)).data;
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCode();
  }, [code]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, rekening, gift } = values;
    const local = JSON.parse(localStorage.getItem("winner") ?? "[]");
    const data1 = {
      name,
      rekening,
      gift,
      date: new Date(),
    };
    const arr = [...local, data1];
    localStorage.setItem("winner", JSON.stringify(arr));
    if (data !== undefined) {
      try {
        await postWinner({
          giftId: values.gift,
          no_ktp: data.no_ktp,
        });
      } catch (error) {
        alert("Peserta dengan ktp tersebut sudah pernah menerima hadiah");
      }
    }
    window.location.href = "/winner";
  }

  return (
    <div className="flex flex-col items-center min-h-screen gap-5 mt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Winner Form Page
      </h1>
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rekening"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled
                      placeholder="Rekening"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gift"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gift</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gift to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card">
                      {/* {gift.map((gift) => (
                        <SelectItem key={gift.id} value={gift.name}>
                          {gift}
                        </SelectItem>
                      ))} */}
                      <SelectItem className="hover:bg-hover" value="1">
                        voucer
                      </SelectItem>
                      <SelectItem className="hover:bg-hover" value="3">
                        payung
                      </SelectItem>
                      <SelectItem className="hover:bg-hover" value="2">
                        jam
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
            <Button type="submit" className="text-white">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default WinnerFormPage;
