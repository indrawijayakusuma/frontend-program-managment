import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { postVisitor } from "@/services/visitorService";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  rekening: z.string().min(10, {
    message: "Rekening must be at least 10 characters.",
  }),
  setoran: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1, {
      message: "Setoran must be at least 1.",
    })
  ),
  ktp: z.string().min(10, {
    message: "ktp must be at least 10 characters.",
  }),
});

const VisitorPage = () => {
  useEffect(() => {
    document.title = "visitor";
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rekening: "",
      setoran: 0,
      ktp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, rekening, setoran, ktp } = values;
    const data = {
      no_ktp: ktp,
      name,
      rekening,
      setoran,
    };
    console.log(data);
    try {
      await postVisitor(data);
      window.location.href = "/visitor/create";
    } catch (error) {
      console.log(error);
      alert("data sudah di input");
    }
  }

  return (
    <div className="flex flex-col gap-10 mb-10 mt-14">
      <div>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl mb-3">
          Visitors
        </h1>
        <div className="flex flex-row items-center">
          Dashboard <BsDot className="w-5 h-5 text-slate-500" />
          <span className="text-slate-500">Create a New Visitor</span>
        </div>
      </div>
      <div className="w-[100%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="lg:grid lg:grid-cols-3 gap-2">
              <div className="flex flex-col gap-1 lg:text-left text-center">
                <p className="text-lg font-bold">Personal Information</p>
                <p className="text-sm font-medium text-foreground/50">
                  Input your real name and KTP number..
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
                        This is your public display name.
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
                        <Input type="number" placeholder="Ktp" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-3 gap-2">
              <div className="flex flex-col gap-1 lg:text-left text-center">
                <p className="text-lg font-bold">Account Information</p>
                <p className="text-sm font-medium text-foreground/50">
                  Input your account number and Deposit..
                </p>
              </div>
              <div className="col-span-2 border p-6 rounded-radius shadow-custom bg-card flex flex-col gap-6 border-border/40">
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
                        This is your public display name.
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="setoran"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setoran</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Setoran" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
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
export default VisitorPage;
