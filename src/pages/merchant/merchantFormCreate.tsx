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
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { BsDot } from "react-icons/bs";
import { showErrorsMessage, showSuccessMessage } from "@/utils/sweetAlert";
import { postMerchant } from "@/services/merchantService";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  rekening: z.string().min(5, {
    message: "Rekening must be at least 10 characters.",
  }),
  merchantName: z.string().min(2, {
    message: "Merchant Name must be at least 2 characters.",
  }),
  noBooth: z.number().min(1, {
    message: "Booth must be fill.",
  }),
  ktp: z
    .string()
    .min(16, {
      message: "KTP must be at least 16 characters.",
    })
    .max(16, {
      message: "KTP must be at most 16 characters.",
    }),
});

const MerchantFormCreatePage = () => {
  useEffect(() => {
    document.title = "Visitor-create";
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rekening: "",
      merchantName: "",
      noBooth: undefined,
      ktp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, rekening, merchantName, noBooth, ktp } = values;
    const data = {
      no_ktp: ktp,
      name,
      rekening,
      merchantName,
      noBooth,
    };
    console.log(data);
    try {
      await postMerchant(data);
      showSuccessMessage("merchant has been saved");
      setInterval(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      showErrorsMessage("Data dengan NIK tersebut sudah terdaftar!");
    }
  }

  return (
    <div className="flex flex-col gap-10 mb-10 mt-20">
      <div>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl mb-3">
          Merchant Form
        </h1>
        <div className="flex flex-row items-center">
          Dashboard <BsDot className="w-5 h-5 text-slate-500" />
          <span className="text-slate-500">Create a New Merchant</span>
        </div>
      </div>
      <div className="w-[100%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="lg:grid lg:grid-cols-3 gap-2">
              <div className="flex flex-col gap-1 lg:text-left text-center">
                <p className="text-lg font-bold">Personal Information</p>
                <p className="text-sm font-medium text-foreground/50">
                  Input name, KTP, and account number..
                </p>
              </div>
              <div className="col-span-2 p-6 rounded-radius shadow-custom bg-card flex flex-col gap-6 border border-border/40">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Input the name according to the ID card
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ktp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KTP</FormLabel>
                      <FormControl>
                        <Input
                          className="appearance-none"
                          type="number"
                          placeholder="KTP"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Input 16-digit of ID card number
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
                          type="number"
                          placeholder="Rekening"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Input BNI account number
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-3 gap-2">
              <div className="flex flex-col gap-1 lg:text-left text-center">
                <p className="text-lg font-bold">Merchant Information</p>
                <p className="text-sm font-medium text-foreground/50">
                  Input your merchant information..
                </p>
              </div>
              <div className="col-span-2 border p-6 rounded-radius shadow-custom bg-card flex flex-col gap-6 border-border/40">
                <FormField
                  control={form.control}
                  name="merchantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Merchant Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Merchant Name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Input merchant name</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="noBooth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booth Number</FormLabel>
                      <FormControl>
                        <Input
                          className="appearance-none"
                          type="number"
                          placeholder="Booth Number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Input booth number</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="text-primaryforeground py-5 px-10"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MerchantFormCreatePage;
