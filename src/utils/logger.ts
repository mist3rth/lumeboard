/**
 * Custom Logger pour le mode développement (SHIELD PRO)
 * S'assure de ne rien afficher en production.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = {
  dev: (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.log("[DEV]", ...args);
    }
  },
  warn: (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.warn("[WARN]", ...args);
    }
  },
  error: (...args: any[]) => {
    console.error("[ERROR]", ...args);
  }
};
