export const hookABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "decimals",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
        ],
        internalType: "struct TokenParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "deployPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
