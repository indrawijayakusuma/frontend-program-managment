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
  useEffect(() => {}, []);

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
    try {
      await postVisitor(data);
      console.log(data);
      window.location.href = "/visitor";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen gap-5 mt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Visitor Page
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
              name="rekening"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Rekening" {...field} />
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
            <Button type="submit" className="text-white">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default VisitorPage;
