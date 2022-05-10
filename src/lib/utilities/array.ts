export const remove = <T>(array: T[], item: T): T[] =>
  array.filter((thing) => thing !== item)

export const add = <T>(array: T[], item: T): T[] => [...array, item]
