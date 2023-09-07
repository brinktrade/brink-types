export type ContractCallParam = bigint | boolean | string | SignatureTypeEnum | TokenStruct | IdsProofStruct | FillStateParamsStruct | PrimitiveStruct | CallStruct | ContractCallParam[]

export type RpcMethodCallParam = number | boolean | string

export type PrimitiveParamValue = ContractCallParam | OracleJSON | TokenJSON | IdsProofJSON | FillStateParamsJSON | BitJSON

export type PrimitiveParamJSON = boolean | string | number | SignatureTypeEnum | OracleJSON | TokenJSON | IdsProofJSON | FillStateParamsJSON | BitJSON

export type BigIntish = bigint | string | number

export enum SignatureTypeEnum {
  EIP712 = 0,
  EIP1271 = 1
}

export type SignatureType = 'EIP712' | 'EIP1271'

export enum TokenStandard {
  ERC20 = 0,
  ERC721 = 1,
  ERC1155 = 2,
  ETH = 3
}

export type TokenArgs = {
  address: string
  standard?: TokenStandard
  idsMerkleRoot?: string
  id?: BigIntish
  disallowFlagged?: boolean
}

export type TokenStruct = {
  addr: string
  standard: TokenStandard
  idsMerkleRoot: string
  id: bigint
  disallowFlagged: boolean
}

export type TokenJSON = {
  address: string
  standard: TokenStandard
  idsMerkleRoot: string
  id: string
  disallowFlagged: boolean
}

export type IdsProofArgs = {
  ids: BigIntish[]
  merkleProof_hashes: string[]
  merkleProof_flags: boolean[]
  statusProof_lastTransferTimes: BigIntish[]
  statusProof_timestamps: BigIntish[]
  statusProof_signatures: string[];
}

export type IdsProofStruct = {
  ids: bigint[]
  merkleProof_hashes: string[]
  merkleProof_flags: boolean[]
  statusProof_lastTransferTimes: bigint[]
  statusProof_timestamps: bigint[]
  statusProof_signatures: string[];
}

export type IdsProofJSON = {
  ids: string[]
  merkleProof_hashes: string[]
  merkleProof_flags: boolean[]
  statusProof_lastTransferTimes: string[]
  statusProof_timestamps: string[]
  statusProof_signatures: string[];
}

export type BitArgs = {
  index: BigIntish
  value: BigIntish
}

export type BitJSON = {
  index: string
  value: string
}

export type FillStateParamsArgs = {
  id: BigIntish
  startX96: BigIntish
  sign: boolean
}

export type FillStateParamsStruct = {
  id: bigint
  startX96: bigint
  sign: boolean
}

export type FillStateParamsJSON = {
  id: string
  startX96: string
  sign: boolean
}

export type TokenAmount = {
  token: TokenJSON
  amount: string
}

export type Bit = {
  index: bigint
  value: bigint
}

export type PrimitiveFunctionName = 
  'useBit' |
  'marketSwapExactInput' |
  'requireBlockNotMined' |
  'requireUint256LowerBound' |
  'limitSwapExactInput' |
  'blockInterval'

export type PrimitiveType =
  'swap' |
  'require'

export type PriceCurveType =
  'flat' |
  'linear' |
  'quadratic'

export type PrimitiveArgs = {
  functionName: PrimitiveFunctionName
  params: Record<string, PrimitiveParamValue>
  data?: string
  requiresUnsignedCall?: boolean
}

export type OrderArgs = {
  primitives: PrimitiveArgs[]
}

export type StrategyArgs = {
  orders: OrderArgs[]
  beforeCalls?: any[]
  afterCalls?: any[]
  primitivesContract?: string,
  data?: string
}

export type SignedStrategyArgs = {
  signer: string
  chainId: number
  signature: string
  strategy: StrategyArgs
  strategyContract?: string
  signatureType?: SignatureType
  eip712Data?: EIP712TypedData
  account?: string
}

export type PrimitiveJSON = {
  functionName: PrimitiveFunctionName
  params: Record<string, PrimitiveParamJSON>
  data: string
  requiresUnsignedCall: boolean
}

export type OrderJSON = {
  primitives: PrimitiveJSON[]
}

export type StrategyJSON = {
  orders: OrderJSON[]
  beforeCalls: any[]
  afterCalls: any[]
  primitivesContract: string,
  data: string
}

export type SignedStrategyJSON = {
  eip712Data: EIP712TypedData
  account: string
  chainId: number
  signer: string
  signatureType: SignatureType
  signature: string
  strategy: StrategyJSON
  strategyContract: string
}

export type EIP712Domain = {
  name: string
  version: string
  chainId: number
  verifyingContract: string
}

export type EIP712TypedData = {
  types: Record<string, ParamType[]>
  domain: EIP712Domain
  value: Record<string, string>
  hash: string
}

export type PrimitiveStruct = {
  data: string
  requiresUnsignedCall: boolean
}

export type CallStruct = {
  targetContract: string
  data: string
}

export type ValidationResult = {
  valid: boolean
  reason?: InvalidReason
  message?: string
}

export type InvalidReason = keyof typeof invalidReasonMessages

export const invalidReasonMessages = {
  ZERO_ORDERS: 'Strategy must have at least 1 order',
  WRONG_NUMBER_OF_SWAPS: 'All orders must have exactly 1 swap',
  SIGNATURE_MISMATCH: 'Signer address does not match recovered address from signature',
  ACCOUNT_MISMATCH: 'Account address is not owned by signer',
  HASH_MISMATCH: 'Hash does not match strategy data'
}

export type TransactionData = {
  to: string,
  data: string,
  value: string,
}

export type CallData = {
  to: string,
  data: string
}

export type ParamType = {
  name: string
  type: string
  calldata?: boolean
}

export type PrimitiveParamType = {
  name: string
  type: string
  signed: boolean
}

export type RpcMethodCall = {
  method: string,
  params: RpcMethodCallParam[]
}

export type OracleJSON = {
  address: string
  params: string
}

export type PriceCurveJSON = {
  address: string
  params: string
}

export interface ProcessError {
  message: string;
}

export interface TransactionResponse extends TransactionData {
	functionSignature: string
	params: ContractCallParam[]
}

export interface ApprovalResponse {
  owner: string,
  spender: string
  token: TokenJSON
  requiredAllowance: string
  currentAllowance: string
	minTx?: TransactionResponse
  maxTx?: TransactionResponse
}

export type RouteSegment = {
	to: string
	data: string
	tokenIn: TokenJSON
	tokenOut: TokenJSON
	tokenInAmount: string
	tokenOutAmount: string
  gas: string
}

export type TokenValue = {[key: string]: string}

export interface MarketSwapOutputEstimates {
	cost: TokenValue
	fee: TokenValue
  output: TokenValue
}

export interface MarketSwapInputEstimate {
	cost: TokenValue
	fee: TokenValue
  input: TokenValue
}

export interface LimitSwapOutputEstimates {
	cost: TokenValue
	marketOutput: TokenValue
  limitOutput: TokenValue
  price: number
}

export interface LimitSwapInputEstimates {
	cost: TokenValue
	marketInput: TokenValue
  limitInput: TokenValue
  price: number
}

export type PrimitiveResponse = {
  functionName: PrimitiveFunctionName
  params: Record<string, PrimitiveParamValue>
  requiresUnsignedCall: boolean
}

export type OrderResponse = {
  primitives: PrimitiveResponse[]
}

export type StrategyResponse = {
  orders: OrderResponse[]
  beforeCalls: any[]
  afterCalls: any[]
  primitivesContract: string
}

export type SwapRequestInclude = 'required_transactions' | 'estimates' | 'routes' | 'bytes'
export type StrategyRequestInclude = 'required_transactions' | 'estimates' | 'routes' | 'cancel' 
export type SignedStrategyRequestsInclude = 'events' | StrategyRequestInclude

interface SwapResponse {
  requiredTransactions?: (ApprovalResponse | TransactionResponse)[] | ProcessError
  routes?: RouteSegment[] | ProcessError
  bytes?: string | ProcessError
}

export interface MarketSwapExactInputRequest {
	tokenIn: TokenArgs
	tokenOut: TokenArgs
  tokenInAmount: BigIntish
  feePercent: BigIntish
  feeMinTokenOut: BigIntish
  buyer?: string
  gasPrice?: BigIntish
  include?: SwapRequestInclude[]
}

export interface MarketSwapExactInputResponse extends SwapResponse {
  estimates?: MarketSwapInputEstimate | ProcessError
}

export interface MarketSwapExactOutputRequest {
	tokenIn: TokenArgs
	tokenOut: TokenArgs
  tokenInAmount: BigIntish
  feePercent: BigIntish
  feeMinTokenOut: BigIntish
  buyer?: string
  gasPrice?: BigIntish
  include?: SwapRequestInclude[]
}

export interface MarketSwapExactOutputResponse extends SwapResponse {
  estimates?: MarketSwapOutputEstimates
}

export interface LimitSwapExactInputRequest {
	tokenIn: TokenArgs
	tokenOut: TokenArgs
  tokenInAmount: BigIntish
  priceCurve: OracleJSON
  buyer?: string
  gasPrice?: BigIntish
  include?: SwapRequestInclude[]
}

export interface LimitSwapExactInputResponse extends SwapResponse {
  estimates?: LimitSwapInputEstimates | ProcessError
}

export interface LimitSwapExactOutputRequest {
	tokenIn: TokenArgs
	tokenOut: TokenArgs
  tokenOutAmount: BigIntish
  priceCurve: OracleJSON
  buyer?: string
  gasPrice?: BigIntish
  include?: SwapRequestInclude[]
}

export interface LimitSwapExactOutputResponse extends SwapResponse {
  estimates?: LimitSwapOutputEstimates | ProcessError
}

export interface RequireCheckRequest {
  chainId?: number
}

export interface RequireCheckResponse {
  success: boolean
  bytes: string
}

export interface RequireBlockNotMinedRequest extends RequireCheckRequest {
  blockNumber: BigIntish
}

export interface RequireBlockNotMinedResponse extends RequireCheckResponse {
  currentBlock: string
}

export interface RequireUint256LowerBoundRequest extends RequireCheckRequest {
  oracle: OracleJSON
  lowerBound: BigIntish
}

export interface RequireUint256LowerBoundResponse extends RequireCheckResponse {
  oracleValue: string
}

export interface UseBitRequest extends RequireCheckRequest {
  signer: string
  bitmapIndex: BigIntish
  bit: BigIntish
}

export interface UseBitResponse extends RequireCheckResponse {
  bitUsed: boolean
}

export interface MarketSwapExactInputOrderResponse extends MarketSwapExactInputResponse {
  orderIndex: number
}

export interface MarketSwapExactOutputOrderResponse extends MarketSwapExactOutputResponse {
  orderIndex: number
}

export interface LimitSwapExactInputOrderResponse extends LimitSwapExactInputResponse {
  orderIndex: number
}

export interface LimitSwapExactOutputOrderResponse extends LimitSwapExactOutputResponse {
  orderIndex: number
}

export interface BlockIntervalRequest extends RequireCheckRequest {
  signer: string
  id: BigIntish
  initialStart: BigIntish
  intervalMinSize: BigIntish
  maxIntervals: BigIntish
}

export interface BlockIntervalResponse extends RequireCheckResponse {
  intervalReady: boolean
  maxIntervalsExceeded: boolean
  start: number
  counter: number
}

interface StrategyRequestBase {
  signer?: string
  chainId?: BigIntish
  signatureType?: SignatureType
  gasPrice?: BigIntish
  include?: StrategyRequestInclude[]
}

export type StrategyOrderSwapResponse = (
  MarketSwapExactInputOrderResponse |
  MarketSwapExactOutputOrderResponse |
  LimitSwapExactInputOrderResponse |
  LimitSwapExactOutputOrderResponse
)

export interface StrategyMetadata {
  hash: string
  swaps?: StrategyOrderSwapResponse[] | ProcessError
  requiredTransactions?: (ApprovalResponse | TransactionResponse)[] | ProcessError
  cancel?: TransactionResponse | ProcessError
	eip712Data?: EIP712TypedData | ProcessError
  eip1271Data?: {} | ProcessError
}

export interface StrategyDataRequest extends StrategyRequestBase {
  strategy: StrategyArgs
}

export interface StrategyDataResponse extends StrategyMetadata {
  strategy: StrategyResponse
}

export interface StopMarketExactInputStrategyRequest extends StrategyRequestBase {
	tokenIn: TokenArgs
  tokenOut: TokenArgs
  tokenInAmount: BigIntish
  triggerPrice: BigIntish
  feePercent: BigIntish
  feeMinTokenOut: BigIntish
	bitmapIndex: BigIntish
  bit: BigIntish
  expiry: BigIntish
}

export interface StopMarketExactOutputStrategyRequest extends StrategyRequestBase {
	tokenIn: TokenArgs
  tokenOut: TokenArgs
  tokenOutAmount: BigIntish
  triggerPrice: BigIntish
  feePercent: BigIntish
  feeMinTokenIn: BigIntish
	bitmapIndex: BigIntish
  bit: BigIntish
  expiry: BigIntish
}

export type StrategyType = 'stop_market' | 'stop_limit' | 'limit' | 'market' | 'custom'
export type StrategyStatus = 'open' | 'filled' | 'cancelled' | 'expired'
export type StrategySortBy = 'created_time'
export type StrategySortDirection = 'asc' | 'desc'

export interface SignedStrategiesRequest {
  limit?: number
  offset?: number
  signer?: string
  hash?: string
  primitives?: PrimitiveFunctionName[]
  tokens?: TokenArgs[]
  signatureType?: SignatureType[]
  status?: StrategyStatus[]
  sortBy?: StrategySortBy
  sortDirection?: StrategySortDirection
  gasPrice?: BigIntish
}

export type MinedTransaction = {
  hash: string
  blockNumber: string
  blockTimestamp: string
  success: boolean
  data: string
  functionSignature?: string
	params?: ContractCallParam[]
}

export type StrategyEventType = 'create' | 'swap' | 'expire' | 'cancel' | 'unknown'

export interface StrategyEventResponse {
  eventType: StrategyEventType
  success: boolean
  orderIndex?: number
  transaction?: MinedTransaction
}

export interface SignedStrategyResponse extends StrategyMetadata {
  createdAt: string
  expiryTime?: string | ProcessError
  strategy: StrategyResponse
  strategyType: StrategyType
  signer: string
  signature: string
  signatureType: SignatureType
  chainId: string
  strategyContract: string
  tokens: Record<string, TokenJSON[]>
  events?: StrategyEventResponse[]
}

export interface SignedStrategiesResponse {
  count: number
  strategies: SignedStrategyResponse[]
}

export interface SubmitStrategyRequest {
  strategy: StrategyArgs
  signer: string
  signature: string
  signatureType?: SignatureType
  strategyContract?: string
  chainId?: BigIntish
}

export interface SubmitStrategyResponse {
  hash: string
}
