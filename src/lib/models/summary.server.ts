import * as Q from './db/queries'
import type { Summary } from './summary'

export const getSummary = async (
  type: 'locations' | 'kingdoms',
  gid: number
): Promise<Summary> => {
  const [summary] = await Q.getSummary(type, gid)

  return summary as Summary
}
