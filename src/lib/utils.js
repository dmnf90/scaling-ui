import { clsx } from 'clsx';

/**
 * Utility function to merge class names
 * Uses clsx for conditional class handling
 */
export function cn(...inputs) {
  return clsx(inputs);
}
