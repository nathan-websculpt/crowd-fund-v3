const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        CrowdFund: {
          address: "0x2bdCC0de6bE1f7D2ee689a0342D76F52E8EFABa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_contractOwner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "contractOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "ContractOwnerWithdrawal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "donor",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "DonationHappened",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "donor",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "DonorWithdrawal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "id",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "target",
                  type: "uint256",
                },
              ],
              name: "FundRunCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "OwnerWithdrawal",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "proposedBy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
              ],
              name: "ProposalCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "supportedBy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "fundRunId",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
              ],
              name: "ProposalSupported",
              type: "event",
            },
            {
              inputs: [],
              name: "contractOwnerWithdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_target",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "_deadline",
                  type: "uint16",
                },
                {
                  internalType: "address[]",
                  name: "_owners",
                  type: "address[]",
                },
              ],
              name: "createFundRun",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_fundRunId",
                  type: "uint16",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "to",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "proposedBy",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "reason",
                      type: "string",
                    },
                  ],
                  internalType: "struct CrowdFund.MultiSigRequest",
                  name: "_tx",
                  type: "tuple",
                },
              ],
              name: "createMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "donateToFundRun",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "donorLogs",
              outputs: [
                {
                  internalType: "address",
                  name: "donor",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "fundRunDonorWithdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "fundRunOwnerWithdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "fundRunOwners",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "fundRuns",
              outputs: [
                {
                  internalType: "uint16",
                  name: "id",
                  type: "uint16",
                },
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "target",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountCollected",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountWithdrawn",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isActive",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "crowdFund_contractBalance",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "getDonors",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "getFundRun",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint16",
                      name: "id",
                      type: "uint16",
                    },
                    {
                      internalType: "address[]",
                      name: "owners",
                      type: "address[]",
                    },
                    {
                      internalType: "string",
                      name: "title",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "target",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountCollected",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountWithdrawn",
                      type: "uint256",
                    },
                    {
                      internalType: "address[]",
                      name: "donors",
                      type: "address[]",
                    },
                    {
                      internalType: "uint256[]",
                      name: "donations",
                      type: "uint256[]",
                    },
                    {
                      internalType: "bool",
                      name: "isActive",
                      type: "bool",
                    },
                  ],
                  internalType: "struct CrowdFund.FundRun",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getFundRuns",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint16",
                      name: "id",
                      type: "uint16",
                    },
                    {
                      internalType: "address[]",
                      name: "owners",
                      type: "address[]",
                    },
                    {
                      internalType: "string",
                      name: "title",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "target",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountCollected",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountWithdrawn",
                      type: "uint256",
                    },
                    {
                      internalType: "address[]",
                      name: "donors",
                      type: "address[]",
                    },
                    {
                      internalType: "uint256[]",
                      name: "donations",
                      type: "uint256[]",
                    },
                    {
                      internalType: "bool",
                      name: "isActive",
                      type: "bool",
                    },
                  ],
                  internalType: "struct CrowdFund.FundRun[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getNonce",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "getOwnersOfFundRun",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_fundRunId",
                  type: "uint16",
                },
              ],
              name: "getProposals",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint16",
                      name: "proposalId",
                      type: "uint16",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "to",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "proposedBy",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "reason",
                      type: "string",
                    },
                    {
                      internalType: "enum CrowdFund.ProposalStatus",
                      name: "status",
                      type: "uint8",
                    },
                  ],
                  internalType: "struct CrowdFund.MultiSigVault[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_addr",
                  type: "address",
                },
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "isOwnerOfFundRun",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "to",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "proposedBy",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "reason",
                      type: "string",
                    },
                  ],
                  internalType: "struct CrowdFund.MultiSigRequest",
                  name: "_tx",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "_nonce",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "_fundRunId",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
              ],
              name: "multisigWithdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "nonce",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfFundRuns",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numberOfMultisigProposals",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_fundRunId",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
              ],
              name: "revokeMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "signatureList",
              outputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_signature",
                  type: "bytes",
                },
                {
                  internalType: "uint16",
                  name: "_fundRunId",
                  type: "uint16",
                },
                {
                  internalType: "uint16",
                  name: "_proposalId",
                  type: "uint16",
                },
              ],
              name: "supportMultisigProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_id",
                  type: "uint16",
                },
              ],
              name: "timeLeft",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalProfitsTaken",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "vaults",
              outputs: [
                {
                  internalType: "uint16",
                  name: "proposalId",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "proposedBy",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "reason",
                  type: "string",
                },
                {
                  internalType: "enum CrowdFund.ProposalStatus",
                  name: "status",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
