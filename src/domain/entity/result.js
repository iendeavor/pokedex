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

/**
 * @template Value
 * @template Reason
 * @param {Result<Value, Reason>} result
 * @return {Value}
 */
export const unwrap = (result) => {
  if (result.status === "fulfilled") {
    return result.value;
  } else {
    throw Error("Failed to unwrap.");
  }
};
