import TableListMerchant from "@/components/fragments/TableListMerchant";
import { DashboardViewLayout } from "@/components/layout/DashboardViewLayout";
import { getAllMerchant } from "@/services/merchantService";
import { useEffect, useState } from "react";

interface Provider {
  noKtp: string;
  name: string;
  rekening: string;
  merchantName: string;
  noBooth: number;
}

const MerchantListPage = () => {
  const [merchant, setMerchant] = useState<Provider[]>([]);

  useEffect(() => {
    document.title = "Merchant";
    const getMerchantData = async () => {
      try {
        const response = (await getAllMerchant()).data;
        console.log(response.data.merchants);
        setMerchant(response.data.merchants);
      } catch (error) {
        console.log(error);
      }
    };

    getMerchantData();
  }, []);

  return (
    <DashboardViewLayout title="Merchant">
      <TableListMerchant dataTables={merchant} />
    </DashboardViewLayout>
  );
};

export default MerchantListPage;
