import TableListWinner from "@/components/fragments/TableListWinner";
import { DashboardViewLayout } from "@/components/layout/DashboardViewLayout";
import { getWinner } from "@/services/winnerService";
import { useEffect, useState } from "react";

interface Provider {
  name: string;
  rekening: string;
  gift: string;
  date: string;
}

const WinnerListPage = () => {
  const [gift, setGift] = useState<Provider[]>([]);
  useEffect(() => {
    document.title = "winner";
  }, []);

  useEffect(() => {
    const getWinnersData = async () => {
      try {
        const response = (await getWinner()).data;
        console.log(response.data);
        setGift(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getWinnersData();
  }, []);

  return (
    <DashboardViewLayout title="Winner">
      <TableListWinner dataTables={gift} />
    </DashboardViewLayout>
  );
};
export default WinnerListPage;
