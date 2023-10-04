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

export type IntentDefinitionArgs = {
  replay?: IntentReplay
  expiryBlock?: BigIntish
  conditions?: ConditionArgs[]
  actions: ActionArgs[]
}

export type DeclarationDefinitionArgs = {
  intents: IntentDefinitionArgs[]
  replay?: IntentReplay
  expiryBlock?: BigIntish
}

export type SegmentArgs = {
  functionName: SegmentFunctionName
  params: Record<string, SegmentParamValue>
  data?: string
  requiresUnsignedCall?: boolean
}

export type IntentArgs = {
  segments: SegmentArgs[]
}

export type DeclarationArgs = {
  intents: IntentArgs[]
  beforeCalls?: any[]
  afterCalls?: any[]
  segmentsContract?: string,
  data?: string
}

export type SignedDeclarationArgs = {
  signer: string
  chainId: number
  signature: string
  declaration: DeclarationArgs
  declarationContract?: string
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

export type IntentJSON = {
  segments: SegmentJSON[]
}

export type DeclarationJSON = {
  intents: IntentJSON[]
  beforeCalls: any[]
  afterCalls: any[]
  segmentsContract: string,
  data: string
}

export type SignedDeclarationJSON = {
  eip712Data: EIP712TypedData
  account: string
  chainId: number
  signer: string
  signatureType: SignatureType
  signature: string
  declaration: DeclarationJSON
  declarationContract: string
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
  ZERO_INTENTS: 'Declaration must have at least 1 intent',
  WRONG_NUMBER_OF_SWAPS: 'All intents must have exactly 1 swap',
  SIGNATURE_MISMATCH: 'Signer address does not match recovered address from signature',
  ACCOUNT_MISMATCH: 'Account address is not owned by signer',
  HASH_MISMATCH: 'Hash does not match declaration data'
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

export type DeclarationResponse = {
  intents: IntentResponse[]
  beforeCalls: any[]
  afterCalls: any[]
  segmentsContract: string
}

export type SwapRequestInclude = 'required_transactions' | 'estimates' | 'routes' | 'bytes'
export type DeclarationRequestInclude = 'required_transactions' | 'estimates' | 'routes' | 'cancel' 
export type SignedDeclarationRequestsInclude = 'events' | DeclarationRequestInclude

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

interface DeclarationRequestBase {
  signer?: string
  chainId?: BigIntish
  signatureType?: SignatureType
  gasPrice?: BigIntish
  include?: DeclarationRequestInclude[]
}

export type IntentSwapResponse = (
  MarketSwapExactInputIntentResponse |
  MarketSwapExactOutputIntentResponse |
  LimitSwapExactInputIntentResponse |
  LimitSwapExactOutputIntentResponse
)

export interface DeclarationMetadata {
  hash: string
  swaps?: IntentSwapResponse[] | ProcessError
  requiredTransactions?: (ApprovalResponse | TransactionResponse)[] | ProcessError
  cancel?: TransactionResponse | ProcessError
	eip712Data?: EIP712TypedData | ProcessError
  eip1271Data?: {} | ProcessError
}

export interface DeclarationDataRequest extends DeclarationRequestBase {
  declaration: DeclarationArgs
}

export interface DeclarationDataResponse extends DeclarationMetadata {
  declaration: DeclarationResponse
}

export interface StopMarketExactInputDeclarationRequest extends DeclarationRequestBase {
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

export interface StopMarketExactOutputDeclarationRequest extends DeclarationRequestBase {
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

export type DeclarationType = 'stop_market' | 'stop_limit' | 'limit' | 'market' | 'custom'
export type DeclarationStatus = 'open' | 'filled' | 'cancelled' | 'expired'
export type DeclarationSortBy = 'created_time'
export type DeclarationSortDirection = 'asc' | 'desc'

export interface SignedDeclarationsRequest {
  limit?: number
  offset?: number
  signer?: string
  hash?: string
  segments?: SegmentFunctionName[]
  tokens?: TokenArgs[]
  signatureType?: SignatureType[]
  status?: DeclarationStatus[]
  sortBy?: DeclarationSortBy
  sortDirection?: DeclarationSortDirection
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

export type DeclarationEventType = 'create' | 'swap' | 'expire' | 'cancel' | 'unknown'

export interface DeclarationEventResponse {
  eventType: DeclarationEventType
  success: boolean
  intentIndex?: number
  transaction?: MinedTransaction
}

export interface SignedDeclarationResponse extends DeclarationMetadata {
  createdAt: string
  expiryTime?: string | ProcessError
  declaration: DeclarationResponse
  declarationType: DeclarationType
  signer: string
  signature: string
  signatureType: SignatureType
  chainId: string
  declarationContract: string
  tokens: Record<string, TokenJSON[]>
  events?: DeclarationEventResponse[]
}

export interface SignedDeclarationsResponse {
  count: number
  declarations: SignedDeclarationResponse[]
}

export interface SubmitDeclarationRequest {
  declaration: DeclarationArgs
  signer: string
  signature: string
  signatureType?: SignatureType
  declarationContract?: string
  chainId?: BigIntish
}

export interface SubmitDeclarationResponse {
  hash: string
}
