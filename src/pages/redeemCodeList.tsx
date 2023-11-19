import { getAllRedeemCode } from "@/services/redeemCodeService";
import { useEffect, useState } from "react";
import { DashboardViewLayout } from "@/components/layout/DashboardViewLayout";
import TableListRedeemCode from "@/components/fragments/TableListRedeemCode";

interface Provider {
  code: string;
  isUsed: boolean;
  name: string;
  rekening: string;
}

const ReedemCodeListPage = () => {
  const [reedeem, setReedeem] = useState<Provider[]>([]);

  useEffect(() => {
    document.title = "reedeem page";
    const getReedeem = async () => {
      try {
        const response = (await getAllRedeemCode()).data;
        console.log(response.data);
        setReedeem(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReedeem();
  }, []);
  return (
    <DashboardViewLayout title="Visitor">
      <TableListRedeemCode dataTables={reedeem} />
    </DashboardViewLayout>
  );
};
export default ReedemCodeListPage;
