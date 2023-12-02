export type ContractCallParam = bigint | boolean | string | SignatureTypeEnum | TokenStruct | IdsProofStruct | FillStateParamsStruct | SegmentStruct | CallStruct | ContractCallParam[]

export type RpcMethodCallParam = number | boolean | string

export type SegmentParamValue = ContractCallParam | OracleJSON | TokenJSON | IdsProofJSON | FillStateParamsJSON | BitJSON

export type SegmentParamJSON = boolean | string | number | SignatureTypeEnum | OracleJSON | TokenJSON | IdsProofJSON | FillStateParamsJSON | BitJSON

export type BigIntish = bigint | string | number

export enum SignatureTypeEnum {
  EIP712 = 0,
  EIP1271 = 1
}

export enum SignatureType {
    EIP712 = 'EIP712',
    EIP1271 = 'EIP1271'
}

export enum TokenStandard {
  ERC20 = 0,
  ERC721 = 1,
  ERC1155 = 2,
  ETH = 3
}

export enum BlockState {
    MINED = 'MINED',
    NOT_MINED = 'NOT_MINED'
}

export enum NonceState {
    USED = 'USED',
    NOT_USED = 'NOT_USED'
}

export enum RunsType {
    ONCE = 'ONCE',
    UNTIL_CANCELLED = 'UNTIL_CANCELLED'
}

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
  tokenA: string | TokenWithDecimalsArgs
  tokenB: string | TokenWithDecimalsArgs
  price: number
  twapInterval?: BigIntish
  twapFeePool?: BigIntish
}

export interface IntervalConditionArgs extends ConditionArgsBase {
  id: BigIntish
	interval: BigIntish
	startBlock?: BigIntish  | null
	maxIntervals?: BigIntish | null
}

export interface BlockConditionArgs extends ConditionArgsBase {
  state: `${BlockState}`
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
  owner: string;
  tokenIn: string | TokenArgs;
  tokenOut: string | TokenArgs;
  tokenInAmount: BigIntish;
  fee: number;
  twapInterval?: BigIntish | null
  twapFeePool?: BigIntish | null
}

export interface LimitSwapActionArgs extends ActionArgsBase {
  id: BigIntish
  owner: string
  tokenIn: string | TokenArgs
  tokenOut: string | TokenArgs
  tokenInAmount: BigIntish
  tokenOutAmount?: BigIntish | null
  price?: number
}

export type IntentReplay = {
  nonce: BigIntish
  runs: `${RunsType}`
}

export type IntentDefinitionArgs = {
  chainId?: number | null
  replay?: IntentReplay | null
  expiryBlock?: BigIntish | null
  conditions?: ConditionArgs[] | null
  actions: ActionArgs[]
}

export type DeclarationDefinitionArgs = {
  chainId: number
  intents: IntentDefinitionArgs[]
  replay?: IntentReplay | null
  expiryBlock?: BigIntish
}

export type SegmentArgs = {
  functionName: SegmentFunctionName
  params: Record<string, SegmentParamValue>
  data?: string | null
  requiresUnsignedCall?: boolean | null
}

export type IntentArgs = {
  segments: SegmentArgs[]
}

export type DeclarationArgs = {
  intents: IntentArgs[]
  beforeCalls?: any[]
  afterCalls?: any[]
  segmentsContract?: string | null,
  data?: string | null
}

export type SignedDeclarationArgs = {
  signer: string
  chainId: number
  signature: string
  declaration: DeclarationArgs
  declarationContract: string
  signatureType?: `${SignatureType}`
  eip712Data?: EIP712TypedData | null
  account?: string | null
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
  signatureType: `${SignatureType}`
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
  source?: string
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
  buyer?: string | null
  gasPrice?: BigIntish | null
  include?: SwapRequestInclude[] | null
}

export interface MarketSwapExactInputResponse extends SwapResponse {
  estimates?: MarketSwapInputEstimate | ProcessError | null
}

export interface MarketSwapExactOutputRequest {
	tokenIn: TokenArgs
	tokenOut: TokenArgs
  tokenInAmount: BigIntish
  feePercent: BigIntish
  feeMinTokenOut: BigIntish
  buyer?: string | null
  gasPrice?: BigIntish | null
  include?: SwapRequestInclude[] | null
}

export interface MarketSwapExactOutputResponse extends SwapResponse {
  estimates?: MarketSwapOutputEstimates
}

export interface LimitSwapExactInputRequest {
	tokenIn: TokenArgs
	tokenOut: TokenArgs
  tokenInAmount: BigIntish
  priceCurve: OracleJSON
  buyer?: string | null
  gasPrice?: BigIntish | null
  include?: SwapRequestInclude[] | null
}

export interface LimitSwapExactInputResponse extends SwapResponse {
  estimates?: LimitSwapInputEstimates | ProcessError
}

export interface LimitSwapExactOutputRequest {
	tokenIn: TokenArgs
	tokenOut: TokenArgs
  tokenOutAmount: BigIntish
  priceCurve: OracleJSON
  buyer?: string | null
  gasPrice?: BigIntish | null
  include?: SwapRequestInclude[] | null
}

export interface LimitSwapExactOutputResponse extends SwapResponse {
  estimates?: LimitSwapOutputEstimates | ProcessError
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

// API BASE TYPES
export type RoutingSource = 'odos' | 'uniswap'

export type DeclarationStatus =
  'open' |
  'filled' |
  'cancelled' |
  'expired'

export type DeclarationSortBy = 'created_time'
export type IntentSwapResponse = 
  MarketSwapExactInputIntentResponse |
  MarketSwapExactOutputIntentResponse |
  LimitSwapExactInputIntentResponse |
  LimitSwapExactOutputIntentResponse

export interface DeclarationMetadata {
  hash: string
  swaps?: IntentSwapResponse[] | ProcessError
  requiredTransactions?: (ApprovalResponse | TransactionResponse)[] | ProcessError
  cancel?: TransactionResponse | ProcessError
	eip712Data?: EIP712TypedData | ProcessError
  eip1271Data?: {} | ProcessError
}

export interface NoncesResponse {
  nonce: BigIntish
  bit: Bit
}

export interface IntentNonceResponse  extends NoncesResponse {
  segmentIndex: number
}

export interface DeclarationNonceResponse extends IntentNonceResponse {
  intentIndex: number
}

export interface TransactionHashResponse {
  hash: string
}

export interface DeclarationTransactionHashResponse extends TransactionHashResponse {
  intentIndex: number
}

export interface TokenResponse {
  paramName: string
  tokenData: TokenJSON
}

export interface IntentTokenResponse  extends TokenResponse {
  segmentIndex: number
}

export interface DeclarationTokenResponse extends IntentTokenResponse {
  intentIndex: number
}

export interface SignedDeclarationResponse extends DeclarationMetadata {
  createdAt: string
  expiryTime?: string | ProcessError
  declaration: DeclarationResponse
  signer: string
  signature: string
  signatureType: `${SignatureType}`
  chainId: string
  declarationContract: string
  tokens: DeclarationTokenResponse[]
  nonces: DeclarationNonceResponse[]
  transactions: DeclarationTransactionHashResponse[]
  events?: DeclarationEventResponse[]
  source?: string
}

export interface RequireCheckResponse {
  success: boolean
  bytes: string
}
export interface TWapRequest {
  tokenA: string
  tokenB: string
  interval: BigIntish
}

export interface OracleCall {
  oracleAddress: string
  oracleParams: string
}

export interface OracleResponse {
  oracleValue: BigIntish
}
export interface multichainRequest {
  chainId: number
}

export interface multiSignatureRequest {
  signer: string,
  signatureType: `${SignatureType}`,
}
export interface SortedRequest {
  sortBy?: string | null
  sortDirection?: 'asc' | 'desc' | null
}
export interface PaginatedRequest {
  limit?: number | null
  offset?: number | null
}

export interface PaginatedResponse {
  count: number
}
export interface RoutingRequest {
  sources?: RoutingSource[] | null
  buyer?: string | null
  include?: 'estimates' | 'routes' | null
}

export interface RoutingResponse {
  estimates?: LimitSwapInputEstimates
  routes?: RouteSegment[]
}

// SIGNERS
// GET signers/:address/account/v1
export interface GetSignersAccountV1Request extends multichainRequest {}
export interface GetSignersAccountV1Response {
  account: string
  deployed: boolean
  deploymentTransaction: string
}

// GET /signers/:address/cancel/v1
export interface GetSignersCancelV1Request extends multichainRequest {
  nonce: BigIntish
}
export interface GetSignersCancelV1Response {
  data: string, 
  functionSignature: string, 
  params: string[], 
  to: string 
  value: 0 
}

// GET /signers/:address/cancelWithSignature/v1
export interface GetSignersCancelWithSignatureV1Request {
  nonce: BigIntish
  signature: string
}
export type GetSignersCancelWithSignatureV1Response = TransactionResponse
// GET /signers/:address/delegateCall/v1
export interface GetSignersDelegateCallV1Request {
  data: string
  to: string
}

export interface GetSignersEIP712TypedDataV1Request {
  nonce: BigIntish
  chainId: number
}

export type GetSignersEIP712TypedDataV1Response = EIP712TypedData

export type GetSignersDelegateCallV1Response = TransactionResponse

// GET /signers/:address/externalCall/v1
export interface GetSignersExternalCallV1Request {
  data: string
  to: string
  value: string
}
export type GetSignersExternalCallV1Response = TransactionResponse

// GET /signers/:address/metaDelegateCall/v1
export interface GetSignersMetaDelegateCallV1Request {
  data: string
  to: string
  deployAccount: boolean
  signature: string
  unsignedData: string
}
export type GetSignersMetaDelegateCallV1Response = TransactionResponse

// GET /signers/:address/nonce/v1
export interface GetSignersNonceV1Request extends multichainRequest {
  nonce: BigIntish
}
export interface GetSignersNonceV1Response {
  usedByIntents: string[]
  usedOnChain: boolean
}

// GET signers/:address/nonces/v1
export interface GetSignersNoncesV1Request extends multichainRequest {
  count: number
}
export interface GetSignersNoncesV1Response {
  nonces: BigIntish[]
}

// SEGMENTS
// GET /segments/blockInterval/v1
export interface GetSegmentsBlockIntervalV1Request {
  signer: string
  id: BigIntish
  initialStart: BigIntish
  intervalMinSize: BigIntish
  maxIntervals: BigIntish
}
export interface GetSegmentsBlockIntervalV1Response extends RequireCheckResponse {
  intervalReady: boolean
  intervalReadyBlock: BigIntish
  currentBlockNumber: BigIntish
  maxIntervalsExceeded: boolean
  state: {
    start: BigIntish
    counter: BigIntish
  }  
}

// GET /segments/limitSwapExactInput/v1
export interface GetSegmentsLimitSwapExactInputV1Request extends RoutingRequest {
  priceCurveParams: string
  priceCurveAddress: string
  tokenIn: string
  tokenInAmount: string
  tokenOut: string
}
export interface GetSegmentsLimitSwapExactInputV1Response extends RoutingResponse {}

// GET segments/marketSwapExactInput/v1
export interface GetSegmentsMarketSwapExactInputV1Request extends RoutingRequest {
  tokenIn: string
  tokenInAmount: string
  tokenOut: string
  feePercent: string
  feeMinTokenOut: string
}
export interface GetSegmentsMarketSwapExactInputV1Response extends RoutingResponse {}

// GET /segments/useBit/v1
export interface GetSegmentsUseBitV1Request {
  bitmapIndex: BigIntish
  bit: BigIntish
  signer: string
}

export interface GetSegmentsUseBitV1Response extends RequireCheckResponse {
  bitUsed: boolean
}

// GET /segments/requireBlockNotMined/v1
export interface GetSegmentsRequireBlockNotMinedV1Request {
  blockNumber: BigIntish
}
export interface GetSegmentsRequireBlockNotMinedV1Response extends RequireCheckResponse {
  currentBlock: BigIntish
}

// GET /segments/requireUint256LowerBound/v1
export interface GetSegmentsRequireUint256LowerBoundV1Request extends OracleCall {
  lowerBound: BigIntish
}
export interface GetSegmentsRequireUint256LowerBoundV1Response extends OracleResponse, RequireCheckResponse {}

// INTENTS
// GET /intents/declarations/:hash/v1
export interface GetIntentsDeclarationsV1Request {
  includes?: SignedDeclarationRequestsInclude[] | null
}
export type GetIntentsDeclarationsV1Response = SignedDeclarationResponse

// GET /intents/declarations/find/v1
export interface GetIntentsDeclarationsFindV1Request extends PaginatedRequest, SortedRequest {
  hash?: string | null
  signatureType?: string | null
  signer?: string | null
  source: string
  tokenAddress: string | string[]
  includes?: SignedDeclarationRequestsInclude[] | null
}
export interface GetIntentsDeclarationsFindV1Response extends PaginatedResponse {
  declarations: SignedDeclarationResponse[]
}
// GET /intents/:intentId/v1
export interface GetIntentsV1Request {
  includes?: SwapRequestInclude[] | null
}

export interface GetIntentsV1Response { 
  createdTime: string
  declarationHash: string,
  intentId: string,
  intentIndex: number,
  requeueTime: string,
  segments: SegmentResponse[],
  status: { message: 'Not implemented' },
  transactions: TransactionHashResponse[],
  nonces: IntentNonceResponse[],
  tokens: IntentTokenResponse[],
}

// GET /intents/compile/v1
export interface GetIntentsCompileV1Request extends multichainRequest, multiSignatureRequest {
  declaration: DeclarationArgs | DeclarationDefinitionArgs
  include?: DeclarationRequestInclude[] | null
}
export interface GetIntentsCompileV1Response {
  declaration: DeclarationResponse
  requiredTransactions?: (ApprovalResponse | TransactionResponse)[] | ProcessError
  cancel?: TransactionResponse | ProcessError
	eip712Data?: EIP712TypedData | ProcessError
  eip1271Data?: {} | ProcessError
}

// GET /intents/find/v1
export interface GetIntentsFindV1Request extends PaginatedRequest, SortedRequest, multichainRequest {
  creationTimeAfter?: string | null
  creationTimeBefore?: string | null
  requeueTimeAfter?: string | null
  requeueTimeBefore?: string | null

}
export interface GetIntentsFindV1Response extends PaginatedResponse {
  intents: {
    intentId: number
    declarationId: number
    declarationIndex: number
    requeueTime: number
    declarationHash: string
  }[]
}

// POST /intents/submit/v1
export interface PostIntentsSubmitV1Request extends SignedDeclarationArgs {
  source?: string | null
}

export interface PostIntentsSubmitV1Response {
  hash: string
}

// ORACLES
// GET /oracles/uint256Oracle/value/v1
export interface GetOraclesUint256OracleValueV1Request extends OracleCall {}
export interface GetOraclesUint256OracleValueV1Response extends OracleResponse {}

// GET /oracles/uniV3TWAP/v1
export interface GetOraclesUniV3TWAPV1Request extends TWapRequest {
  fee: number
}
export interface GetOraclesUniV3TWAPV1Response extends OracleCall {}

// GET /oracles/uniV3TWAP/price/v1
export interface GetOraclesUniV3TWAPPriceV1Request extends TWapRequest {}
export interface GetOraclesUniV3TWAPPriceV1Response {
  fee: BigIntish
  poolAddress: string
  priceDecimal: number
  priceUintX96: string
}
