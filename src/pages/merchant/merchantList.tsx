/* eslint-disable @typescript-eslint/no-explicit-any */
import TableListMerchant from "@/components/fragments/TableListMerchant";
import { DashboardViewLayout } from "@/components/layout/DashboardViewLayout";
import { getAllMerchant } from "@/services/merchantService";
import { useEffect, useState } from "react";

interface Provider {
  merchants: Array<any>;
  totalRows: number;
  startIndex: number;
  endIndex: number;
  totalPage: number;
}

const MerchantListPage = () => {
  const [dataMerchant, setDataMerchant] = useState<Provider>({
    merchants: [],
    totalRows: 0,
    startIndex: 0,
    endIndex: 0,
    totalPage: 0,
  });
  const [pageControl, setPageControl] = useState(1);
  const [params, setParams] = useState("");
  const [limit] = useState(10);

  useEffect(() => {
    document.title = "Merchant";
    const getMerchantData = async () => {
      try {
        const response = (
          await getAllMerchant(params, { page: pageControl, limit })
        ).data;
        setDataMerchant(response.data.merchants);
      } catch (error) {
        setDataMerchant({
          merchants: [],
          totalRows: 0,
          startIndex: 0,
          endIndex: 0,
          totalPage: 0,
        });
      }
    };

    getMerchantData();
  }, [params, pageControl, limit]);

  const pageControlHandler = (arrow: string) => {
    if (arrow === "left") {
      setPageControl(pageControl - 1);
    } else {
      setPageControl(pageControl + 1);
    }
  };

  return (
    <DashboardViewLayout title="Merchant">
      <TableListMerchant
        dataTable={dataMerchant}
        setParam={setParams}
        pageControlHandler={pageControlHandler}
        setPageControl={setPageControl}
        limit={limit}
      />
    </DashboardViewLayout>
  );
};

export default MerchantListPage;
