import { useMemo } from 'react';

export const PasswordStrengthCodes = [
  'VERY_WEAK',
  'WEAK',
  'REASONABLE',
  'STRONG',
  'VERY_STRONG',
] as const;

export type PasswordStrengthCode = (typeof PasswordStrengthCodes)[number];

export const MINIMUM_ENTROPY_BITS = 24;

// Note:
// The entropy is calculated using Shannon entropy.
// It is inspired by tai-password-strength, but it increased the bundle size the
// app by ~500KB which seems too much for such a small feature. 
// the cause of this was the inclusion of common passwords and trigraphs

/**
 * Calculates and returns a password's entropy using Shannon's formula.
 *
 * @param password the password to calculate the entropy for
 *
 * @returns the password's entropy
 */
export const calculateEntropy = (password: string) => {
  const frequencyMap = new Map<string, number>();
  const passwordLength = password.length;

  for (let i = 0; i < passwordLength; i++) {
    const char = password[i];
    const frequency = frequencyMap.get(char) || 0;
    frequencyMap.set(char, frequency + 1);
  }

  let sum = 0;

  frequencyMap.forEach((frequency) => {
    const score = frequency / passwordLength;
    sum -= score * Math.log(score);
  })

  return sum * passwordLength;
};

/**
 * Returns the password strength code based on the entropy.
 *
 * @param entropy the password's entropy
 * @returns the password strength code
 */
export const getStrength = (entropy: number): PasswordStrengthCode => {
  if (entropy <= 12) {
    return 'VERY_WEAK';
  } else if (entropy <= 24) {
    return 'WEAK';
  } else if (entropy <= 36) {
    return 'REASONABLE';
  } else if (entropy <= 48) {
    return 'STRONG';
  } else {
    return 'VERY_STRONG';
  }
};

/**
 * Reusable hook to calculate the strength of a password.
 *
 * @param password the password to calculate the strength for
 *
 * @returns the password's entropy, strength and charsets
 */
const usePasswordStrength = (password: string) => {
  return useMemo(() => {
    const entropy = calculateEntropy(password);
    const strength = getStrength(entropy);
    const length = password.length;

    const charsets = {
      numbers: /\d/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
    };

    return {
      entropy,
      strength,
      charsets,
      length
    };
  }, [password]);
};

export default usePasswordStrength;
