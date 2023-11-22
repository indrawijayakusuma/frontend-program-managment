/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCustomerByRedeemCode } from "@/services/customerService";
import { postWinner } from "@/services/winnerService";
import axios from "axios";
import { showErrorsMessage } from "@/utils/sweetAlert";
import { Label } from "@/components/ui/label";
import { getAllGiftByType } from "@/services/giftService";

const formSchema = z.object({
  gift: z.string({
    required_error: "Please select an gift to display.",
  }),
  media: z.instanceof(File, {
    message: "Please select an image.",
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
  const [type, setType] = useState<string>("");
  const [gift, setGift] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Winner";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getGiftsData = async () => {
      try {
        const response = (await getAllGiftByType(type)).data;
        console.log(response.data);
        setGift(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGiftsData();
  }, [type]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      media: undefined,
    },
  });

  useEffect(() => {
    const getCode = async () => {
      try {
        const result = (await getCustomerByRedeemCode(code)).data;
        setData(result.data);
        setType(result.data.type);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorsMessage(error.response?.data.message, false).then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = "/";
              }
            }
          );
        }
        setInterval(() => {
          window.location.href = "/";
        }, 7500);
      }
    };
    getCode();
  }, [code]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { gift, media } = values;
    if (data !== undefined) {
      try {
        const formData = new FormData();
        formData.append("image", media);
        formData.append("no_ktp", data.no_ktp);
        formData.append("giftId", gift);
        await postWinner(formData);
      } catch (error) {
        console.log(error);
        alert("Peserta dengan ktp tersebut sudah pernah menerima hadiah");
      }
    }
    window.location.href = "/winner";
  }

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-[90%] max-w-lg shadow-custom border border-border/40 py-10 px-12 rounded-radius">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center text-foreground">
          Winner Form
        </h1>
        <p className="text-center font-medium mt-2 text-foreground/60">
          Please fill in the form below
        </p>
        <div className="lg:mt-6 mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid w-full items-center gap-1.5">
                <Label>Name</Label>
                <Input disabled placeholder={data?.name} />
                <p className="text-[0.8rem] text-muted-foreground">
                  Input the name according to the ID card
                </p>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Account Number</Label>
                <Input disabled placeholder={data?.rekening} />
                <p className="text-[0.8rem] text-muted-foreground">
                  Input BNI account number
                </p>
              </div>
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
                        <SelectTrigger className="py-5">
                          <SelectValue placeholder="Select a gift to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card">
                        {gift.map((item) => (
                          <SelectItem key={item?.name} value={item?.id}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Input the gift that have been earned
                    </FormDescription>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Media</FormLabel>
                      <FormControl>
                        <Input
                          className="pt-2"
                          accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
                          type="file"
                          onChange={(e) =>
                            field.onChange(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="text-primaryforeground">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default WinnerFormPage;
