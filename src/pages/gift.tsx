import TableListGift from "@/components/fragments/TableListGift";
import { DashboardViewLayout } from "@/components/layout/DashboardViewLayout";
import { getAllGift } from "@/services/giftService";
import { useEffect, useState } from "react";

interface Provider {
  name: string;
  type: string;
}
const GiftPage = () => {
  const [gift, setGift] = useState<Provider[]>([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getAllGiftData = async () => {
      const result = await getAllGift();
      setGift(result.data.data);
    };
    getAllGiftData();
  }, [reload]);

  useEffect(() => {
    document.title = "Gift";
  }, []);

  const onReloadHandler = () => {
    setReload(!reload);
  };

  return (
    <DashboardViewLayout title="Gift">
      <TableListGift dataTables={gift} onReload={onReloadHandler} />
    </DashboardViewLayout>
  );
};

export default GiftPage;
