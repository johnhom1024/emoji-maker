/*
 * @Date: 2022-04-16 11:20:15
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}


export function reportError (error: unknown) {
  throw new Error(getErrorMessage(error));
}