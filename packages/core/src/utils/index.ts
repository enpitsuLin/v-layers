export * from './html'
export * from './guards'

export function objectOmit<T extends object, K extends keyof T>(
  obj: T, ...keys: (K | K[])[]
): Omit<T, K> {
  const flatKeys = keys.flat() as K[]
  const omitKV = Object.entries(obj)
    .filter(e => !flatKeys.includes(e[0] as any))
  return Object.fromEntries(omitKV) as Omit<T, K>
}
