/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Html5Qrcode, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect, useState } from "react";
import { BsDot, BsQrCodeScan } from "react-icons/bs";

const Scanqr = () => {
  const [scan, setScan] = useState(0);

  let html5QrCode: Html5Qrcode;

  useEffect(() => {
    document.title = "Scan qr-code";
  }, []);

  const scanCLickHandler = () => {
    html5QrCode = new Html5Qrcode("reader1");
    const qrCodeSuccessCallback = (decodedText: string) => {
      window.location.href = decodedText;
      html5QrCode
        .stop()
        .then(() => {
          console.log("QR Code scanning is stopped");
        })
        .catch((err: string) => {
          console.log(err);
        });
    };
    const config = {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 1000,
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      aspectRatio: 0.9,
    };

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback,
      (e) => {
        console.log(e);
      }
    );
    setScan(html5QrCode.getState());
  };

  return (
    <>
      <div className="mt-20">
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl mb-3">
          Visitors
        </h1>
        <div className="flex flex-row items-center">
          Dashboard <BsDot className="w-5 h-5 text-slate-500" />
          <span className="text-slate-500">Visitors</span>
        </div>
      </div>
      <div className="mt-14 w-full flex flex-col items-center">
        <p className="lg:hidden text-xl font-medium lg:text-2xl text-center mb-6">
          Scan QR Code
        </p>
        <div className="flex lg:w-[30%] w-[90%] border border-border/40 py-4 rounded-radius shadow-custom">
          <div className="flex w-[17rem] h-[19rem] justify-center mx-auto rounded-radius relative">
            {scan === 0 && (
              <BsQrCodeScan className="w-[23rem] h-[12rem] my-auto" />
            )}
            <div className="w-full absolute" id="reader1"></div>
          </div>
        </div>
        <div className="lg:mt-5 mt-6 flex flex-col items-center gap-1">
          <p className="text-base font-normal text-center">
            Click start to Scan
          </p>
          <Button
            onClick={scanCLickHandler}
            className="mx-auto px-10 text-primaryforeground"
            size={"lg"}
          >
            Start
          </Button>
        </div>
      </div>
    </>
  );
};

export default Scanqr;
