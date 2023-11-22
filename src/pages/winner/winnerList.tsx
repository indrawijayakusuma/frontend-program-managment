/* eslint-disable @typescript-eslint/no-explicit-any */
import TableListWinner from "@/components/fragments/TableListWinner";
import { DashboardViewLayout } from "@/components/layout/DashboardViewLayout";
import { getWinner } from "@/services/winnerService";
import { useEffect, useState } from "react";

interface Provider {
  winners: Array<any>;
  totalRows: number;
  startIndex: number;
  endIndex: number;
  totalPage: number;
}

const WinnerListPage = () => {
  const [dataGift, setDataGift] = useState<Provider>({
    winners: [],
    totalRows: 0,
    startIndex: 0,
    endIndex: 0,
    totalPage: 0,
  });

  const [pageControl, setPageControl] = useState(1);
  const [params, setParams] = useState("");
  const [limit] = useState(10);

  useEffect(() => {
    document.title = "winner";
  }, []);

  useEffect(() => {
    const getWinnersData = async () => {
      try {
        const response = (await getWinner(params, { page: pageControl, limit }))
          .data;
        setDataGift(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getWinnersData();
  }, [params, pageControl, limit]);

  const pageControlHandler = (arrow: string) => {
    if (arrow === "left") {
      setPageControl(pageControl - 1);
    } else {
      setPageControl(pageControl + 1);
    }
  };

  return (
    <DashboardViewLayout title="Winner">
      <TableListWinner
        dataTable={dataGift}
        setParam={setParams}
        pageControlHandler={pageControlHandler}
        setPageControl={setPageControl}
        limit={limit}
      />
    </DashboardViewLayout>
  );
};
export default WinnerListPage;
