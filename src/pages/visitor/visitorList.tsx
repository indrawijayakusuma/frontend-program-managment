/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAllVisitor } from "@/services/visitorService";
import { DashboardViewLayout } from "@/components/layout/DashboardViewLayout";
import TableListVisitor from "@/components/fragments/TableListVisitor";

interface Provider {
  visitors: Array<any>;
  totalRows: number;
  startIndex: number;
  endIndex: number;
  totalPage: number;
}

const VisitorListPage = () => {
  const [dataVisitor, setDataVisitor] = useState<Provider>({
    visitors: [],
    totalRows: 0,
    startIndex: 0,
    endIndex: 0,
    totalPage: 0,
  });
  const [pageControl, setPageControl] = useState(1);
  const [params, setParams] = useState("");
  const [limit] = useState(10);

  useEffect(() => {
    document.title = "visitor-list";

    const getVisitorData = async () => {
      try {
        const response = (
          await getAllVisitor(params, { page: pageControl, limit })
        ).data;
        console.log(response.data.visitor);
        setDataVisitor(response.data.visitor);
      } catch (error) {
        console.log(error);
      }
    };

    getVisitorData();
  }, [params, pageControl, limit]);

  const pageControlHandler = (arrow: string) => {
    if (arrow === "left") {
      setPageControl(pageControl - 1);
    } else {
      setPageControl(pageControl + 1);
    }
  };

  return (
    <DashboardViewLayout title="Visitor">
      <TableListVisitor
        dataTable={dataVisitor}
        setParam={setParams}
        pageControlHandler={pageControlHandler}
        setPageControl={setPageControl}
        limit={limit}
      />
    </DashboardViewLayout>
  );
};

export default VisitorListPage;
