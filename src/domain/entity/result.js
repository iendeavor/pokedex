/**
 * @template Value
 * @typedef FulfilledResult
 * @property {'fulfilled'} status
 * @property {Value} value
 */

/**
 * @template Reason
 * @typedef RejectedResult
 * @property {'rejected'} status
 * @property {Reason} reason
 */

/**
 * @template Value
 * @template Reason
 * @typedef {FulfilledResult<Value> | RejectedResult<Reason>} Result
 */
