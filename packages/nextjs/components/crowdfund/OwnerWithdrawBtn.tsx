import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface OwnerProps {
  fundRunId: number;
}

export const OwnerWithdrawBtn = (owner: OwnerProps) => {
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "fundRunOwnerWithdraw",
    args: [owner.fundRunId],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Owner Withdraw</>}
      </button>
    </>
  );
};
