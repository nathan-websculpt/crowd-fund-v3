import { useEffect, useState } from "react";
import { OwnerWithdrawalsRow } from "./OwnerWithdrawalsRow";
import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/Spinner";
import { GQL_OWNER_WITHDRAWALS } from "~~/helpers/getQueries";

export const OwnerWithdrawalsTable = () => {
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_OWNER_WITHDRAWALS(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
    },
    pollInterval: 10000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_OWNER_WITHDRAWALS Query Error: ", error);
  }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center w-full min-w-full gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <Spinner width="150px" height="150px" />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex gap-3 mb-3">
          <span className="my-auto text-lg">OWNER WITHDRAWALS</span>
          <select
            className="px-4 py-2 text-xl bg-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
          >
            <option value="25">Showing 25</option>
            <option value="10">Showing 10</option>
            <option value="1">Showing 1</option>
          </select>
        </div>

        <table className="table w-full text-xl table-auto bg-base-100 md:table-lg table-xs">
          <thead>
            <tr className="text-sm rounded-xl text-base-content">
              <th className="bg-primary">Owner</th>
              <th className="bg-primary">Gross Withdrawal</th>
              <th className="bg-primary">NET Withdrawal</th>
              <th className="bg-primary">CONTRACT PROFIT</th>
              <th className="bg-primary">Fund Run Title</th>
            </tr>
          </thead>
          <tbody>
            {data?.ownerWithdrawals?.map(w => (
              <OwnerWithdrawalsRow
                key={w?.id}
                owner={w?.owner}
                grossWithdrawAmount={w?.grossWithdrawAmount}
                netWithdrawAmount={w?.netWithdrawAmount}
                contractProfit={BigInt(w?.grossWithdrawAmount) - BigInt(w?.netWithdrawAmount)}
                fundRunTitle={w?.fundRun?.title}
              />
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-3 mx-5 mt-5">
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(0)}>
            <ArrowLeftIcon className="w-4 h-4" />
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span>...</span>
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(prev => prev - 1)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span className="self-center font-medium text-primary-content">Page {pageNum + 1}</span>
          <button
            className="btn btn-sm"
            // disabled={isNextButtonDisabled}
            onClick={() => setPageNum(prev => prev + 1)}
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </>
    );
  }
};
