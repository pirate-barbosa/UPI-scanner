/**
 * Kiwi Rewards Checker — Determines reward eligibility based on MCC.
 *
 * Source: https://gokiwi.in/rewards-policy-v2/
 */
import { KIWI_EXCLUDED_MCCS } from '../constants/kiwi-excluded.js';

/**
 * Check whether a merchant code is eligible for Kiwi transaction rewards.
 *
 * @param  {string|null} mcc  4-digit Merchant Category Code (or null for personal QR)
 * @return {{ eligible: boolean|null, reason: string, excludedCategory: string|null }}
 */
export function checkKiwiEligibility(mcc) {
  if (!mcc) {
    return {
      eligible: null,
      reason: 'No merchant code detected. This appears to be a personal/P2P UPI QR code.',
      excludedCategory: null
    };
  }

  if (KIWI_EXCLUDED_MCCS[mcc]) {
    return {
      eligible: false,
      reason: 'This merchant category is excluded from Kiwi transaction rewards.',
      excludedCategory: KIWI_EXCLUDED_MCCS[mcc]
    };
  }

  return {
    eligible: true,
    reason: 'This merchant category is eligible for Kiwi transaction rewards (Scan & Pay: up to 1.5% cashback).',
    excludedCategory: null
  };
}
