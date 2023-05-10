export const __columns = process?.stdout?.columns ?? 120

export enum LogLevel {
  ACCESS,
  INFO,
  WARNING,
  ERROR,
  DEBUG,
}
