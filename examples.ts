import { StrategyDbParam } from "./src/strategies/db/StrategyParams";

const USDC_address = '0x111'
const WETH_address = '0x222'
const p = 1_000
const oracle_USDC_ETH =  '0x333'
const ownerAddress =  '0x444'

const stopLossPrimitives = [
  {  
    data: 'replay bit test data',
    requiresUnsigendCall: true,
    orderIndex: 1,
    functionName: 'replay bit testFunction',
    functionSignature: 'replay bit testSignature',
    functionSignedParams: {                    
      bitmapIndex: 0,
      bit: 1
  }},
  {  
    data: 'expiry test data',
    requiresUnsigendCall: true,
    orderIndex: 1,
    functionName: 'expiry testFunction',
    functionSignature: 'expiry testSignature',
    functionSignedParams: {     
      blockNumber: 16802111
  }},
  {  
    data: 'UniV3TWAP test data',
    requiresUnsigendCall: true,
    orderIndex: 1,
    functionName: 'UniV3TWAP testFunction',
    functionSignature: 'UniV3TWAP testSignature',
    functionSignedParams: {  
      oracle: { // UniV3TWAP
        baseToken: USDC_address,
        quoteToken: WETH_address,
        time: 1000,
        feePool: 500
      },
      price: p
  }},
  {  
    data: 'market swap test data',
    requiresUnsigendCall: true,
    orderIndex: 1,
    functionName: 'market swap testFunction',
    functionSignature: 'market swap testSignature',
    functionSignedParams: {      
      oracle: oracle_USDC_ETH,
      owner: ownerAddress,
      tokenIn: USDC_address,
      tokenOut: WETH_address,
      tokenInAmount: 3000_000000, // 3k USDC
      feePercent: 1_0000, // 1% fee
      feeMin: 0
  }},
]

const strategyParm: StrategyDbParam = { 
  accountAddress: '0xfdc57bf6ea6a3bfd1d53167e4f98dd4ccf967e9f', 
  signature: '0x0', 
  signerAddress: '0x3bc8dE4CF6c075Fb8e24A954EC1D1B12bDcbF336', 
  strategyHash: '0x123', 
  chainId: '1', 
  messageCallType: 'metaDelegateCall', 
  primitiveTarget: 'primitiveTarget',
  sigType: 'EIP712',
  orders: [
    { primitives: stopLossPrimitives }
  ]
}

// db.Strategies.createOrSelect(strategyParm) -> Retunrn Strategy id (INT, autoincrement)