package no.ntnu.webshop.contracts.validation.rule;

import java.util.HashMap;

import org.passay.PasswordData;
import org.passay.Rule;
import org.passay.RuleResult;

public class ShannonEntropyRule implements Rule {
  private int minimumEntropyBits;

  public ShannonEntropyRule(
      int minimumEntropyBits
  ) {
    this.minimumEntropyBits = minimumEntropyBits;
  }

  @Override
  public RuleResult validate(
      PasswordData passwordData
  ) {
    var result = new RuleResult(true);
    var entropy = this.calculateEntropy(passwordData.getPassword());

    // the calculated entropy is less than the minimum required
    if (entropy < this.minimumEntropyBits) {
      result.setValid(false);
      result.addError(
        String.format("Password must be at least %d bits of entropy, but was: %.02f", this.minimumEntropyBits, entropy),
        null
      );
    }

    return result;
  }

  /**
   * Calculates the Shannon entropy of a password. This is inspired by the implementation of the same
   * calculation in the tai-password-strength library used in the frontend.
   * 
   * @param password the password to calculate the entropy of
   * 
   * @return the entropy of the password
   */
  private float calculateEntropy(
      String password
  ) {
    var frequencyMap = new HashMap<Character, Integer>();
    var passwordLength = password.length();

    for (char currentCharacter : password.toCharArray()) {
      frequencyMap.computeIfPresent(currentCharacter, (character, count) -> count + 1);
      frequencyMap.putIfAbsent(currentCharacter, 1);
    }

    float sum = 0;

    for (int frequency : frequencyMap.values()) {
      float score = frequency / (float) passwordLength;
      sum -= score * Math.log(score);
    }

    return sum * passwordLength;
  }

}
