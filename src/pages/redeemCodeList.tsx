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
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "reedeem page";
    const getReedeem = async () => {
      try {
        const response = (await getAllRedeemCode(search)).data;
        console.log(response.data);
        setReedeem(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReedeem();
  }, [search]);
  return (
    <DashboardViewLayout title="Redeem Code">
      <TableListRedeemCode dataTables={reedeem} setSearch={setSearch} />
    </DashboardViewLayout>
  );
};
export default ReedemCodeListPage;
