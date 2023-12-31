import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IntegerVariant, isValidInteger } from "../scaffold-eth";
import { formatEther, isAddress, parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const CreateFundRun = () => {
  const router = useRouter();
  const userAccount = useAccount();
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [targetInput, setTargetInput] = useState<bigint>(parseEther("1"));
  const [targetDisplay, setTargetDisplay] = useState("1");
  const [deadlineInput, setDeadlineInput] = useState<number>(1);
  const [deadlineDisplay, setDeadlineDisplay] = useState("1");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isMultiSigSelected, setIsMultiSigSelected] = useState(false);
  const [walletCount, setWalletCount] = useState(1);
  const [additionalAddressOne, setAdditionalAddressOne] = useState("");
  const [additionalAddressTwo, setAdditionalAddressTwo] = useState("");
  const [ownersList, setOwnersList] = useState<string[]>([]);

  useEffect(() => {
    if (ownersList.length > 0) {
      writeAsync();
    }
  }, [ownersList]);

  useScaffoldEventSubscriber({
    contractName: "CrowdFund",
    eventName: "FundRun",
    listener: logs => {
      logs.map(log => {
        const { fundRunId, owners, title, target } = log.args;
        console.log(
          "📡 New Fund Run Event \ncreator:",
          owners,
          "\nID: ",
          fundRunId,
          "\nTitle: ",
          title,
          "\n  with a target of: ",
          formatEther(target),
        );
        if (owners !== undefined) if (userAccount.address === owners[0]) router.push(`/crowdfund/${fundRunId}`);
      });
    },
  });

  const newErr = (msg: string) => {
    notification.warning(msg, { position: "top-right", duration: 6000 });
    setErrorMsg(msg);
    setError(true);
  };

  function handleTargetInputChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0 || _v === ".") {
      setTargetInput(0n);
      setTargetDisplay(_v);
    } else if (isValidInteger(IntegerVariant.UINT256, _v, false)) {
      setTargetInput(parseEther(_v));
      setTargetDisplay(_v);
    }
  }

  function handleDeadlineChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0) {
      setDeadlineInput(0);
      setDeadlineDisplay(_v);
    } else if (isValidInteger(IntegerVariant.UINT256, _v, true)) {
      setDeadlineInput(parseInt(_v));
      setDeadlineDisplay(_v);
    }
  }

  const handleMultisigSelection = () => {
    const selection = !isMultiSigSelected;
    setIsMultiSigSelected(selection);
    if (selection) setWalletCount(2);
    else setWalletCount(1);
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "CrowdFund",
    functionName: "createFundRun",
    args: [titleInput, descInput, targetInput, deadlineInput, ownersList],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const validateThenWrite = () => {
    setErrorMsg("");
    setError(false);
    // validate Fund Run data
    if (titleInput.trim() === "" || descInput.trim() === "") {
      newErr("Please provide a Title and a Description.");
      return;
    } else if (targetInput <= 0 || deadlineInput <= 0) {
      newErr("A goal and a deadline are both required fields.");
      return;
    }

    // validate MULTISIG Fund Run data
    if (isMultiSigSelected) {
      if (walletCount === 2) {
        if (!isAddress(additionalAddressOne)) {
          newErr("Please provide a VALID address for your co-owner.");
          return;
        }
        if (additionalAddressOne === userAccount.address) {
          newErr("You input your own wallet address as the co-owner ... please select a different address.");
          return;
        }
      } else if (walletCount === 3) {
        if (!isAddress(additionalAddressOne) || !isAddress(additionalAddressTwo)) {
          newErr("Please provide VALID addresses for BOTH of your co-owners.");
          return;
        }
        if (additionalAddressOne === additionalAddressTwo) {
          newErr("The two co-owners are the same -- they must be different wallets.");
          return;
        }
        if (additionalAddressOne === userAccount.address || additionalAddressTwo === userAccount.address) {
          newErr("You input your own wallet address as one of the co-owners ... please select a different address.");
          return;
        }
      }
    }

    // validation complete
    const oList: string[] = [];
    if (userAccount?.address !== undefined) {
      oList.push(userAccount.address);
      if (isMultiSigSelected) {
        if (walletCount === 2) oList.push(additionalAddressOne);
        else if (walletCount === 3) {
          oList.push(additionalAddressOne);
          oList.push(additionalAddressTwo);
        }
      }
      setOwnersList(oList);
    }
  };

  return (
    <>
      <div className="px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto sm:max-w-11/12 md:w-9/12 sm:rounded-lg sm:px-10">
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2 sm:gap-5">
            <div className="flex justify-end mb-5">
              <Link href="/crowdfund/browse-fund-runs" passHref className="btn btn-sm btn-primary">
                View Other Fund Runs
              </Link>
              <button className="ml-5 btn btn-sm btn-primary" onClick={() => router.back()}>
                Back
              </button>
            </div>
            {error ? (
              <div className="flex justify-center">
                <p className="whitespace-pre-line">{errorMsg}</p>
              </div>
            ) : (
              <></>
            )}
            {/* up-and-down */}
            <label className="text-lg font-bold">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
            />{" "}
            <label className="text-lg font-bold">Description</label>
            <textarea
              placeholder="Description"
              className="px-3 py-3 border rounded-lg bg-base-200 border-base-300 textarea"
              value={descInput}
              onChange={e => setDescInput(e.target.value)}
            />
            {/* ^^^ up-and-down ^^^ */}
            {/* side-by-side on desktop, up-and-down on phone */}
            <div className="sm:gap-5 sm:flex sm:flex-row">
              <div className="flex flex-col">
                <label className="text-lg font-bold">Minimum Goal</label>
                <input
                  placeholder="Target Amount"
                  className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
                  value={targetDisplay}
                  onChange={e => handleTargetInputChange(e.target.value)}
                />
              </div>

              <div className="flex flex-col mt-4 sm:mt-0">
                <label className="text-lg font-bold">Deadline (mins from now)</label>
                <input
                  placeholder="Deadline"
                  className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
                  value={deadlineDisplay}
                  onChange={e => handleDeadlineChange(e.target.value)}
                />
              </div>
            </div>
            {/* ^^^ side-by-side on desktop, up-and-down on phone ^^^^ */}
            <label className="text-lg font-bold">Is this a Multisig Fund Run?</label>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Multisig?</span>
                <input type="checkbox" className="checkbox checkbox-accent" onChange={handleMultisigSelection} />
              </label>
            </div>
            {isMultiSigSelected && (
              <>
                <label className="text-lg font-bold">Total Number of Addresses</label>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">2 Addresses</span>
                    <input
                      value="2"
                      type="radio"
                      name="addresses"
                      className="radio checked:bg-accent"
                      checked={walletCount === 2}
                      onChange={e => setWalletCount(parseInt(e.target.value))}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">3 Addresses</span>
                    <input
                      value="3"
                      type="radio"
                      name="addresses"
                      className="radio checked:bg-accent"
                      checked={walletCount === 3}
                      onChange={e => setWalletCount(parseInt(e.target.value))}
                    />
                  </label>
                </div>
              </>
            )}
            {walletCount > 1 && (
              <>
                <label className="text-lg font-bold">Extra Address One</label>
                <input
                  type="text"
                  placeholder="First Additional Address"
                  className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
                  value={additionalAddressOne}
                  onChange={e => setAdditionalAddressOne(e.target.value)}
                />
                {walletCount > 2 && (
                  <>
                    <label className="text-lg font-bold">Extra Address Two</label>
                    <input
                      type="text"
                      placeholder="Second Additional Address"
                      className="px-3 py-3 border rounded-lg bg-base-200 border-base-300"
                      value={additionalAddressTwo}
                      onChange={e => setAdditionalAddressTwo(e.target.value)}
                    />
                  </>
                )}
              </>
            )}
            <button
              className="w-10/12 mx-auto md:w-3/5 btn btn-primary"
              onClick={() => validateThenWrite()}
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Start My Fund</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
