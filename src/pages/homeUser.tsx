import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import QRCode from "react-qr-code";

const HomeUserPage = () => {
  const [ktp, setKtp] = useState("");
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      ktp: { value: string };
    };
    setKtp(target.ktp.value);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        QR CODE
      </h1>
      <div className="mt-10">
        {ktp && (
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={ktp}
            viewBox={`0 0 256 256`}
          />
        )}
      </div>
      <div className="mt-10">
        <form onSubmit={onSubmitHandler} className="flex gap-2">
          <Input name="ktp" type="text" placeholder="No ktp" />
          <Button type="submit" className="text-white">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HomeUserPage;
