export type ContractCallParam = bigint | boolean | string | SignatureTypeEnum | TokenStruct | IdsProofStruct | FillStateParamsStruct | SegmentStruct | CallStruct | ContractCallParam[]

export type RpcMethodCallParam = number | boolean | string

export type SegmentParamValue = ContractCallParam | OracleJSON | TokenJSON | IdsProofJSON | FillStateParamsJSON | BitJSON

export type SegmentParamJSON = boolean | string | number | SignatureTypeEnum | OracleJSON | TokenJSON | IdsProofJSON | FillStateParamsJSON | BitJSON

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

export type BlockState = 'MINED' | 'NOT_MINED'

export enum NonceState {
    USED = 'USED',
    NOT_USED = 'NOT_USED'
}

export type RunsType = 'ONCE' | 'UNTIL_CANCELLED'

export enum PriceOperator {
    GREATER_THAN = 'gt',
    LESS_THAN = 'lt'
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

export type SegmentFunctionName = 
  'useBit' |
  'marketSwapExactInput' |
  'requireBitUsed' |
  'requireBitNotUsed' |
  'requireBlockNotMined' |
  'requireBlockMined' |
  'requireUint256LowerBound' |
  'requireUint256UpperBound' |
  'limitSwapExactInput' |
  'blockInterval'

export type SegmentType =
  'swap' |
  'require'

export type PriceCurveType =
  'flat' |
  'linear' |
  'quadratic'

export type ConditionType =
  'price' |
  'interval' |
  'block' |
  'nonce'

export type ActionType =
  'limitSwap' |
  'marketSwap'


export type ConditionArgs =
  PriceConditionArgs |
  IntervalConditionArgs |
  BlockConditionArgs |
  NonceConditionArgs

export type ActionArgs =
  LimitSwapActionArgs |
  MarketSwapActionArgs

export interface ConditionArgsBase {
  type: ConditionType
}

export interface TokenWithDecimalsArgs extends TokenArgs {
  decimals: BigIntish;
}

export interface PriceConditionArgs extends ConditionArgsBase {
  operator: `${PriceOperator}`
  tokenA: TokenWithDecimalsArgs
  tokenB: TokenWithDecimalsArgs
  price: number
  twapInterval?: BigIntish
  twapFeePool?: BigIntish
}

export interface IntervalConditionArgs extends ConditionArgsBase {
  id: BigIntish
	interval: BigIntish
	startBlock?: BigIntish
	maxIntervals?: BigIntish
}

export interface BlockConditionArgs extends ConditionArgsBase {
  state: BlockState
  blockNumber: BigIntish
}

export interface NonceConditionArgs extends ConditionArgsBase {
  state: `${NonceState}`
  nonce: BigIntish
}

export interface ActionArgsBase {
  type: ActionType
}

export interface MarketSwapActionArgs extends ActionArgsBase {
  owner: string
  tokenIn: string | TokenArgs
  tokenOut: string | TokenArgs
  tokenInAmount: BigIntish
  feePercent: number
  feeMinTokenOut?: BigIntish
}

export interface LimitSwapActionArgs extends ActionArgsBase {
  owner: string
  tokenIn: string | TokenArgs
  tokenOut: string | TokenArgs
  tokenInAmount: BigIntish
  tokenOutAmount?: BigIntish
  price?: number
}

export type IntentReplay = {
  nonce: BigIntish
  runs: RunsType
}

export type IntentSegmentArgs = {
  replay?: IntentReplay
  expiryBlock?: BigIntish
  conditions?: ConditionArgs[]
  actions: ActionArgs[]
}

export type IntentArgs = {
  segments: IntentSegmentArgs[]
  replay?: IntentReplay
  expiryBlock?: BigIntish
}

export type SegmentArgs = {
  functionName: SegmentFunctionName
  params: Record<string, SegmentParamValue>
  data?: string
  requiresUnsignedCall?: boolean
}

export type IntentGroupIntentArgs = {
  segments: SegmentArgs[]
}

export type IntentGroupArgs = {
  intents: IntentGroupIntentArgs[]
  beforeCalls?: any[]
  afterCalls?: any[]
  segmentsContract?: string,
  data?: string
}

export type SignedIntentGroupArgs = {
  signer: string
  chainId: number
  signature: string
  intentGroup: IntentGroupArgs
  intentGroupContract?: string
  signatureType?: SignatureType
  eip712Data?: EIP712TypedData
  account?: string
}

export type SegmentJSON = {
  functionName: SegmentFunctionName
  params: Record<string, SegmentParamJSON>
  data: string
  requiresUnsignedCall: boolean
}

export type IntentGroupIntentJSON = {
  segments: SegmentJSON[]
}

export type IntentGroupJSON = {
  intents: IntentGroupIntentJSON[]
  beforeCalls: any[]
  afterCalls: any[]
  segmentsContract: string,
  data: string
}

export type SignedIntentGroupJSON = {
  eip712Data: EIP712TypedData
  account: string
  chainId: number
  signer: string
  signatureType: SignatureType
  signature: string
  intentGroup: IntentGroupJSON
  intentGroupContract: string
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

export type SegmentStruct = {
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
  ZERO_INTENTS: 'IntentGroup must have at least 1 intent',
  WRONG_NUMBER_OF_SWAPS: 'All intents must have exactly 1 swap',
  SIGNATURE_MISMATCH: 'Signer address does not match recovered address from signature',
  ACCOUNT_MISMATCH: 'Account address is not owned by signer',
  HASH_MISMATCH: 'Hash does not match intentGroup data'
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

export type SegmentParamType = {
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

export type SegmentResponse = {
  functionName: SegmentFunctionName
  params: Record<string, SegmentParamValue>
  requiresUnsignedCall: boolean
}

export type IntentResponse = {
  segments: SegmentResponse[]
}

export type IntentGroupResponse = {
  intents: IntentResponse[]
  beforeCalls: any[]
  afterCalls: any[]
  segmentsContract: string
}

export type SwapRequestInclude = 'required_transactions' | 'estimates' | 'routes' | 'bytes'
export type IntentGroupRequestInclude = 'required_transactions' | 'estimates' | 'routes' | 'cancel' 
export type SignedIntentGroupRequestsInclude = 'events' | IntentGroupRequestInclude

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

export interface RequireBlockMinedRequest extends RequireCheckRequest {
  blockNumber: BigIntish
}

export interface RequireBlockMinedResponse extends RequireCheckResponse {
  currentBlock: string
}

export interface UseBitRequest extends RequireCheckRequest {
  signer: string
  bitmapIndex: BigIntish
  bit: BigIntish
}

export interface UseBitResponse extends RequireCheckResponse {
  bitUsed: boolean
}

export interface MarketSwapExactInputIntentResponse extends MarketSwapExactInputResponse {
  intentIndex: number
}

export interface MarketSwapExactOutputIntentResponse extends MarketSwapExactOutputResponse {
  intentIndex: number
}

export interface LimitSwapExactInputIntentResponse extends LimitSwapExactInputResponse {
  intentIndex: number
}

export interface LimitSwapExactOutputIntentResponse extends LimitSwapExactOutputResponse {
  intentIndex: number
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

interface IntentGroupRequestBase {
  signer?: string
  chainId?: BigIntish
  signatureType?: SignatureType
  gasPrice?: BigIntish
  include?: IntentGroupRequestInclude[]
}

export type IntentGroupIntentSwapResponse = (
  MarketSwapExactInputIntentResponse |
  MarketSwapExactOutputIntentResponse |
  LimitSwapExactInputIntentResponse |
  LimitSwapExactOutputIntentResponse
)

export interface IntentGroupMetadata {
  hash: string
  swaps?: IntentGroupIntentSwapResponse[] | ProcessError
  requiredTransactions?: (ApprovalResponse | TransactionResponse)[] | ProcessError
  cancel?: TransactionResponse | ProcessError
	eip712Data?: EIP712TypedData | ProcessError
  eip1271Data?: {} | ProcessError
}

export interface IntentGroupDataRequest extends IntentGroupRequestBase {
  intentGroup: IntentGroupArgs
}

export interface IntentGroupDataResponse extends IntentGroupMetadata {
  intentGroup: IntentGroupResponse
}

export interface StopMarketExactInputIntentGroupRequest extends IntentGroupRequestBase {
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

export interface StopMarketExactOutputIntentGroupRequest extends IntentGroupRequestBase {
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

export type IntentGroupType = 'stop_market' | 'stop_limit' | 'limit' | 'market' | 'custom'
export type IntentGroupStatus = 'open' | 'filled' | 'cancelled' | 'expired'
export type IntentGroupSortBy = 'created_time'
export type IntentGroupSortDirection = 'asc' | 'desc'

export interface SignedIntentGroupsRequest {
  limit?: number
  offset?: number
  signer?: string
  hash?: string
  segments?: SegmentFunctionName[]
  tokens?: TokenArgs[]
  signatureType?: SignatureType[]
  status?: IntentGroupStatus[]
  sortBy?: IntentGroupSortBy
  sortDirection?: IntentGroupSortDirection
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

export type IntentGroupEventType = 'create' | 'swap' | 'expire' | 'cancel' | 'unknown'

export interface IntentGroupEventResponse {
  eventType: IntentGroupEventType
  success: boolean
  intentIndex?: number
  transaction?: MinedTransaction
}

export interface SignedIntentGroupResponse extends IntentGroupMetadata {
  createdAt: string
  expiryTime?: string | ProcessError
  intentGroup: IntentGroupResponse
  intentGroupType: IntentGroupType
  signer: string
  signature: string
  signatureType: SignatureType
  chainId: string
  intentGroupContract: string
  tokens: Record<string, TokenJSON[]>
  events?: IntentGroupEventResponse[]
}

export interface SignedIntentGroupsResponse {
  count: number
  intentGroups: SignedIntentGroupResponse[]
}

export interface SubmitIntentGroupRequest {
  intentGroup: IntentGroupArgs
  signer: string
  signature: string
  signatureType?: SignatureType
  intentGroupContract?: string
  chainId?: BigIntish
}

export interface SubmitIntentGroupResponse {
  hash: string
}
