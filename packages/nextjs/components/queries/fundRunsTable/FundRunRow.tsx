import { useState } from "react";
import { ProposalsSubTable } from "./ProposalsSubTable";
import { formatEther } from "viem";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FundRunStatus } from "~~/components/crowdfund/FundRunStatus";
import { TProposal } from "~~/helpers/getTypes";

interface FundRunRowProps {
  id: string;
  status: number;
  fundRunId: number;
  owners: string[];
  title: string;
  description: string;
  target: bigint;
  donated: bigint;
  withdrawn: bigint;
  proposals: TProposal[];
  proposalsPageNum: number;
  setProposalsPageNum: CallableFunction;
}

export const FundRunRow = (fr: FundRunRowProps) => {
  const [rowOpen, setRowOpen] = useState(false);

  return (
    <>
      <tr>
        {fr?.owners?.length == 1 ? (
          <td></td>
        ) : (
          <td className="cursor-pointer" onClick={() => setRowOpen(!rowOpen)}>
            <svg
              className={`w-6 h-6 z-40  ${rowOpen ? "rotate-90" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 7l6 5-6 5V7z" fill="#ffffff" />
            </svg>
          </td>
        )}

        <td>
          <FundRunStatus status={fr?.status} />
        </td>
        <td className="text-center">{fr?.fundRunId.toString()}</td>
        <td>{fr?.title}</td>
        <td>{fr?.description}</td>
        <td className="text-center">{formatEther(fr?.target)}</td>
        <td className="text-center">{formatEther(fr?.donated)}</td>
        <td className="text-center">{formatEther(fr?.withdrawn)}</td>
      </tr>
      <tr className={` ${rowOpen ? "rowOpen" : "hidden"} `}>
        {/* drillable, nested table */}
        <td colSpan={8}>
          <ProposalsSubTable proposals={fr?.proposals} />

          <div className="flex justify-end gap-3 mx-5 mt-5">
            <button className="btn btn-sm" disabled={!fr.proposalsPageNum} onClick={() => fr.setProposalsPageNum(0)}>
              <ArrowLeftIcon className="w-4 h-4" />
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <span>...</span>
            <button
              className="btn btn-sm"
              disabled={!fr.proposalsPageNum}
              onClick={() => fr.setProposalsPageNum(prev => prev - 1)}
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <span className="self-center font-medium text-primary-content">Page {fr.proposalsPageNum + 1}</span>
            <button
              className="btn btn-sm"
              // disabled={isNextButtonDisabled}
              onClick={() => fr.setProposalsPageNum(prev => prev + 1)}
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
