import { gql } from "@apollo/client";

//for viewing a single Fund Run
export const GQL_FUNDRUN_By_FundRunId = () => {
  return gql`
    query ($slug: Int!) {
      fundRuns(where: { fundRunId: $slug }) {
        fundRunId
        owners
        title
        description
        deadline
        target
        amountCollected
        amountWithdrawn
        status
      }
    }
  `;
};

//for viewing the Fund Runs list on /browse-fund-runs
//returns latest-first
export const GQL_FUNDRUNS_For_Display = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      fundRuns(orderBy: fundRunId, orderDirection: desc, first: $limit, skip: $offset) {
        id
        fundRunId
        owners
        title
        description
        deadline
        target
        amountCollected
        amountWithdrawn
        status
      }
    }
  `;
};

//queries page
//for viewing 3-tier table
//ALL Fund Runs
export const GQL_FUNDRUNS_Three_Tier = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      fundRuns(orderBy: fundRunId, orderDirection: desc, first: $limit, skip: $offset) {
        id
        fundRunId
        owners
        title
        description
        deadline
        target
        amountCollected
        amountWithdrawn
        status
        proposals {
          id
          proposalId
          fundRunId
          proposedBy
          amount
          to
          reason
          status
          signatures {
            id
            signer
            signature
          }
        }
      }
    }
  `;
};

//for Finalization of a Proposal
//returns all signatures for a Proposal (which are then sent to the contract)
export const GQL_SIGNATURES = () => {
  return gql`
    query ($slug1: Int!, $slug2: Int!) {
      proposals(where: { fundRunId: $slug1, proposalId: $slug2 }) {
        signatures {
          signature
        }
      }
    }
  `;
};

//for the table on Vaults page
//will not return revoked proposals
export const GQL_PROPOSALS_By_FundRunId = () => {
  return gql`
    query ($slug: Int!) {
      proposals(where: { fundRunId: $slug, status_lt: 3 }) {
        id
        proposalId
        fundRunId
        proposedBy
        amount
        to
        reason
        status
        signatures {
          id
          signer
          signature
        }
      }
    }
  `;
};

//queries page
//for viewing snapshot of latest proposals
//LATEST PROPOSALS
export const GQL_PROPOSALS_Snapshot = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        proposals(orderBy: proposalId, orderDirection: desc, first: $limit, skip: $offset) {
          id
          proposedBy
          amount
          to
          reason
          status
          fundRun {
            id
            title
            amountCollected
            amountWithdrawn
          }
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        proposals(
          where: { or: [{ proposedBy_contains: $searchBy }, { to_contains: $searchBy }] }
          orderBy: proposalId
          orderDirection: desc
          first: $limit
          skip: $offset
        ) {
          id
          proposedBy
          amount
          to
          reason
          status
          fundRun {
            id
            title
            amountCollected
            amountWithdrawn
          }
        }
      }
    `;
};

//queries page
//for viewing snapshot of latest signers
//LATEST SIGNERS
export const GQL_SIGNERS_Snapshot = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        proposalSignatures(orderBy: proposalId, orderDirection: desc, first: $limit, skip: $offset) {
          id
          proposalId
          signer
          proposal {
            id
            amount
            to
            reason
          }
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        proposalSignatures(
          where: { or: [{ signer_contains: $searchBy }, { proposal_: { to_contains: $searchBy } }] }
          orderBy: proposalId
          orderDirection: desc
          first: $limit
          skip: $offset
        ) {
          id
          proposalId
          signer
          proposal {
            id
            amount
            to
            reason
          }
        }
      }
    `;
};

//queries page
//DONATIONS ORDERED-BY FUND RUN
export const GQL_DONATIONS = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        donations(orderBy: fundRunId, orderDirection: desc, first: $limit, skip: $offset) {
          id
          donor
          amount
          fundRun {
            id
            title
          }
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        donations(
          where: { fundRun_: { title_contains_nocase: $searchBy } }
          orderBy: fundRunId
          orderDirection: desc
          first: $limit
          skip: $offset
        ) {
          id
          donor
          amount
          fundRun {
            id
            title
          }
        }
      }
    `;
};

//queries page
//OWNER-WITHDRAWALS ORDERED-BY FUND RUN
export const GQL_OWNER_WITHDRAWALS = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      ownerWithdrawals(orderBy: fundRunId, orderDirection: desc, first: $limit, skip: $offset) {
        id
        owner
        grossWithdrawAmount
        netWithdrawAmount
        fundRun {
          id
          title
        }
      }
    }
  `;
};

//queries page
//DONOR-WITHDRAWALS ORDERED-BY FUND RUN
export const GQL_DONOR_WITHDRAWALS = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      donorWithdrawals(orderBy: fundRunId, orderDirection: desc, first: $limit, skip: $offset) {
        id
        donor
        amount
        fundRun {
          id
          title
          amountCollected
          amountWithdrawn
        }
      }
    }
  `;
};
