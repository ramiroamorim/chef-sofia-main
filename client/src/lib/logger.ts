/**
 * Development-only logger utility
 * Prevents console.log statements from running in production
 */

const isDev = !import.meta.env.PROD;

export const logger = {
  log: (...args: any[]) => {
    if (isDev) console.log(...args);
  },
  warn: (...args: any[]) => {
    if (isDev) console.warn(...args);
  },
  error: (...args: any[]) => {
    if (isDev) console.error(...args);
  },
  debug: (...args: any[]) => {
    if (isDev) console.debug(...args);
  },
  info: (...args: any[]) => {
    if (isDev) console.info(...args);
  }
};
