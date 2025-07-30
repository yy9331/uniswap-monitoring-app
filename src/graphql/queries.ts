import { gql } from '@apollo/client';

export const GET_TRANSFERS = gql`
    query GetTransfers($first: Int!, $skip: Int!) {
        transfers(first: $first, skip: $skip, orderBy: blockTimestamp, orderDirection: desc) {
            id
            from
            to
            amount
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`

export const GET_APPROVALS = gql`
    query GetApprovals($first: Int!, $skip: Int!) {
        approvals(first: $first, skip: $skip, orderBy: blockTimestamp, orderDirection: desc) {
            id
            owner
            spender
            amount
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`

export const GET_DELEGATE_CHANGES = gql`
    query GetDelegateChanges($first: Int!, $skip: Int!) {
        delegateChangeds(first: $first, skip: $skip, orderBy: blockTimestamp, orderDirection: desc) {
            id
            delegator
            fromDelegate
            toDelegate
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`

export const GET_SWAPS = gql`
    query GetSwaps($first: Int!, $skip: Int!) {
        swaps(first: $first, skip: $skip) {
            id
            timestamp
            token0
            token1
            amount0In
            amount1In
            amount0Out
            amount1Out
            amountUSD
            pair {
                token0Price
                token1Price
            }
        }
    }
`

export const GET_PAIR = gql`
    query GetPair($first: Int!) {
        pairs(first: $first, orderBy: reverseUSD, orderDirection: desc) {
            id
            token0
            token1
            reserve0
            reserve1
            reserveUSD
            totalSupply
        }
    }
`