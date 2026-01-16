export const safeJsonParse = <T = any>(str: string): T | string => {
  try {
    return JSON.parse(str)
  } catch {
    return str
  }
}
