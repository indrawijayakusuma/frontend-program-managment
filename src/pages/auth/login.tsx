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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { showErrorsMessage } from "@/utils/sweetAlert";
import { login } from "@/services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Rekening must be at least 10 characters.",
  }),
});

const LoginPage = () => {
  const [submite, setSubmite] = useState(false);

  useEffect(() => {
    document.title = "Login";
    window.scrollTo(0, 0);
    setSubmite(false);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    const data = {
      username,
      password,
    };
    try {
      const result = await login(data);
      localStorage.setItem("accessToken", result.data.data.accessToken);
      localStorage.setItem("refreshToken", result.data.data.refreshToken);
      setSubmite(true);
      window.location.href = "/visitor/list";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorsMessage(error.response?.data.message);
      }
    }
  }

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-[90%] max-w-lg shadow-custom border border-border/40 py-10 px-12 rounded-radius">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          LOGIN
        </h1>
        <p className="font-medium mt-2 text-foreground/60">
          Please login with valid credentials
        </p>
        <div className="lg:mt-6 mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>
                      Input the registered username
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Input the registered password
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="text-primaryforeground">
                {!submite ? (
                  "Submit"
                ) : (
                  <div className="flex items-center align-middle">
                    <div className="animate-spin text-xl mr-2">
                      <BiLoaderAlt />
                    </div>
                    prosessing...
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
