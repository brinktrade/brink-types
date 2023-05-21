export type ContractCallParam = bigint | boolean | string | SignatureTypeEnum | TokenStruct | IdsProofStruct | PrimitiveStruct | CallStruct | ContractCallParam[]

export type RpcMethodCallParam = number | boolean | string

export type PrimitiveParamValue = ContractCallParam | OracleJSON | TokenJSON

export type PrimitiveParamJSON = boolean | string | number | SignatureTypeEnum | IdsProofJSON | OracleJSON | TokenJSON

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

export type PrimitiveFunctionName = 
  'useBit' |
  'marketSwapExactInput' |
  'requireBlockNotMined' |
  'requireUint256LowerBound'

export type PrimitiveType =
  'swap' |
  'require'

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
  value: bigint,
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

export interface TransactionResponse extends TransactionData {
	functionSignature: string
	params: ContractCallParam[]
}

export interface ApprovalResponse {
  approvalContract: string
  token: TokenJSON
  requiredAllowance: bigint
  currentAllowance: bigint
	minTx?: TransactionResponse
  maxTx?: TransactionResponse
}

export type RouteSegment = {
	to: string
	data: string
	tokenIn: TokenJSON
	tokenOut: TokenJSON
	tokenInAmount: bigint
	tokenOutAmount: bigint
  gas: bigint
}

export type TokenValue = {[key: string]: bigint}

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
export type StrategyRequestInclude = 'required_transactions' | 'estimates' | 'routes' | 'cancel' | 'eip712_data' | 'eip1271_data'
export type SignedStrategyRequestsInclude = 'events' | StrategyRequestInclude

interface SwapResponse {
  requiredTransactions?: (ApprovalResponse | TransactionResponse)[]
  routes?: RouteSegment[]
  bytes?: string
}

export interface MarketSwapExactInputRequest {
	tokenIn: TokenJSON
	tokenOut: TokenJSON
  tokenInAmount: bigint
  feePercent: bigint
  feeMinTokenOut: bigint
  signer?: string
  include?: SwapRequestInclude[]
}

export interface MarketSwapExactInputResponse extends SwapResponse {
  estimates?: MarketSwapInputEstimate
}

export interface MarketSwapExactOutputRequest {
	tokenIn: TokenJSON
	tokenOut: TokenJSON
  tokenInAmount: bigint
  feePercent: bigint
  feeMinTokenOut: bigint
  signer?: string
  include?: SwapRequestInclude[]
}

export interface MarketSwapExactOutputResponse extends SwapResponse {
  estimates?: MarketSwapOutputEstimates
}

export interface LimitSwapExactInputRequest {
	tokenIn: TokenJSON
	tokenOut: TokenJSON
  tokenInAmount: bigint
  priceCurve: OracleJSON
  signer: string
  include?: SwapRequestInclude[]
}

export interface LimitSwapExactInputResponse extends SwapResponse {
  estimates?: LimitSwapInputEstimates
}

export interface LimitSwapExactOutputRequest {
	tokenIn: TokenJSON
	tokenOut: TokenJSON
  tokenOutAmount: bigint
  priceCurve: OracleJSON
  signer: string
  include?: SwapRequestInclude[]
}

export interface LimitSwapExactOutputResponse extends SwapResponse {
  estimates?: LimitSwapOutputEstimates
}

export interface RequireCheckRequest {
  chainId?: number
}

export interface RequireCheckResponse {
  success: boolean
  bytes: string
}

export interface RequireBlockNotMinedRequest extends RequireCheckRequest {
  blockNumber: bigint
}

export interface RequireBlockNotMinedResponse extends RequireCheckResponse {
  currentBlock: bigint
}

export interface RequireUint256LowerBoundRequest extends RequireCheckRequest {
  oracle: OracleJSON
  lowerBound: bigint
}

export interface RequireUint256LowerBoundResponse extends RequireCheckResponse {
  oracleValue: bigint
}

export interface UseBitRequest extends RequireCheckRequest {
  signer: string
  bitmapIndex: number
  bit: number
}

export interface UseBitResponse extends RequireCheckResponse {
  bitUsed: boolean
}

export interface StrategyDataRequest {
  strategy: StrategyJSON
  signer: string
  chainId?: bigint
  include?: StrategyRequestInclude[]
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

export type StrategyOrderSwapResponse = (
  MarketSwapExactInputOrderResponse |
  MarketSwapExactOutputOrderResponse |
  LimitSwapExactInputOrderResponse |
  LimitSwapExactOutputOrderResponse
)

export interface StrategyMetadata {
  hash: string
  swaps?: StrategyOrderSwapResponse[]
  requiredTransactions?: (ApprovalResponse | TransactionResponse)[]
  cancel?: TransactionResponse
	eip712Data?: EIP712TypedData
  eip1271Data?: {}
}

interface StrategyRequestBase {
  signer?: string
  chainId?: bigint
  signatureType?: SignatureType
  include?: StrategyRequestInclude[]
}

export interface CreateStrategyRequest extends StrategyRequestBase {
	strategy: StrategyJSON
}

export interface CreateStrategyResponse extends StrategyMetadata {
  strategy: StrategyResponse
}

export interface CreateStopMarketExactInputStrategyRequest extends StrategyRequestBase {
	tokenIn: TokenJSON
  tokenOut: TokenJSON
  tokenInAmount: bigint
  triggerPrice: bigint
  feePercent: bigint
  feeMinTokenOut: bigint
	bitmapIndex: bigint
  bit: bigint
  expiry: bigint
}

export interface CreateStopMarketExactOutputStrategyRequest extends StrategyRequestBase {
	tokenIn: TokenJSON
  tokenOut: TokenJSON
  tokenOutAmount: bigint
  triggerPrice: bigint
  feePercent: bigint
  feeMinTokenIn: bigint
	bitmapIndex: bigint
  bit: bigint
  expiry: bigint
}

export type StrategyType = 'stop_market' | 'stop_limit' | 'limit' | 'market' | 'custom'
export type StrategyStatus = 'open' | 'filled' | 'cancelled' | 'expired'
export type StrategySort =
  'created_time' |
  'last_transaction_block' |
  'first_transaction_block' |
  'expiry_block' |
  'cancelled_block' |
  'filled_block'
export type StrategySortBy = 'asc' | 'desc'

export interface SignedStrategiesRequest {
  limit?: number
  offset?: number
  signer?: string
  hash?: string
  primitives?: PrimitiveFunctionName[]
  tokens?: TokenJSON[]
  signatureType?: SignatureType[]
  status?: StrategyStatus[]
  sort?: StrategySort
  sortBy?: StrategySortBy
  include?: SignedStrategyRequestsInclude[]
}

export type MinedTransaction = {
  hash: string
  blockNumber: bigint
  blockTimestamp: bigint
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
  strategy: StrategyResponse
  strategyType: StrategyType
  signer: string
  signature: string
  signatureType: SignatureType
  chainId: bigint
  strategyContract: string
  tokens: TokenJSON[]
  events?: StrategyEventResponse[]
}

export interface SignedStrategiesResponse {
  count: number
  strategies: SignedStrategyResponse[]
}

export interface SubmitStrategyRequest {
  strategy: StrategyJSON
  signer: string
  signature: string
  signatureType?: SignatureType
  strategyContract?: string
  chainId?: bigint
}

export interface SubmitStrategyResponse {
  hash: string
}
