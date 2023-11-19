import { useEffect, useState } from "react";
import { getAllVisitor } from "@/services/visitorService";
import { DashboardViewLayout } from "@/components/layout/DashboardViewLayout";
import TableListVisitor from "@/components/fragments/TableListVisitor";

interface Provider {
  no_ktp: string;
  name: string;
  rekening: string;
  setoran: number;
}
const VisitorListPage = () => {
  const [visitor, setVisitor] = useState<Provider[]>([]);

  useEffect(() => {
    document.title = "visitor-list";

    const getVisitorData = async () => {
      try {
        const response = (await getAllVisitor()).data;
        console.log(response.data.visitor);
        setVisitor(response.data.visitor);
      } catch (error) {
        console.log(error);
      }
    };

    getVisitorData();
  }, []);

  return (
    <DashboardViewLayout title="Visitor">
      <TableListVisitor dataTables={visitor} />
    </DashboardViewLayout>
  );
};

export default VisitorListPage;
