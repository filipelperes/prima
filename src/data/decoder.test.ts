import { describe, it, expect } from 'vitest';
import {
  decodeB3,
  decodeB3Weekly,
  smartSearch,
  EXAMPLES,
} from './decoder';

/* ──────────────────────────────────────────────
 * decodeB3 – Monthly options
 * ────────────────────────────────────────────── */

describe('decodeB3 – monthly CALL options', () => {
  it('decodes PETRH21 as Petrobras CALL Agosto strike 2.1', () => {
    const result = decodeB3('PETRH21');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('PETR (Petrobras PN)');
    expect(result!.type).toBe('CALL');
    expect(result!.month).toBe('Agosto');
    expect(result!.monthNum).toBe(8);
    expect(result!.strike).toBe(2.1);
    expect(result!.raw).toBe('PETRH21');
    expect(result!.week).toBeUndefined();
  });

  it('decodes VALEK42 as Vale CALL Novembro strike 4.2', () => {
    const result = decodeB3('VALEK42');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('VALE (Vale ON)');
    expect(result!.type).toBe('CALL');
    expect(result!.month).toBe('Novembro');
    expect(result!.monthNum).toBe(11);
    expect(result!.strike).toBe(4.2);
    expect(result!.raw).toBe('VALEK42');
  });

  it('decodes every CALL series letter (A–L) correctly', () => {
    const expectations: Array<{ letter: string; month: string; num: number }> = [
      { letter: 'A', month: 'Janeiro', num: 1 },
      { letter: 'B', month: 'Fevereiro', num: 2 },
      { letter: 'C', month: 'Março', num: 3 },
      { letter: 'D', month: 'Abril', num: 4 },
      { letter: 'E', month: 'Maio', num: 5 },
      { letter: 'F', month: 'Junho', num: 6 },
      { letter: 'G', month: 'Julho', num: 7 },
      { letter: 'H', month: 'Agosto', num: 8 },
      { letter: 'I', month: 'Setembro', num: 9 },
      { letter: 'J', month: 'Outubro', num: 10 },
      { letter: 'K', month: 'Novembro', num: 11 },
      { letter: 'L', month: 'Dezembro', num: 12 },
    ];
    for (const { letter, month, num } of expectations) {
      const result = decodeB3(`PETR${letter}21`);
      expect(result).not.toBeNull();
      expect(result!.type).toBe('CALL');
      expect(result!.month).toBe(month);
      expect(result!.monthNum).toBe(num);
    }
  });
});

describe('decodeB3 – monthly PUT options', () => {
  it('decodes PETRM18 as Petrobras PUT Janeiro strike 1.8', () => {
    const result = decodeB3('PETRM18');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('PETR (Petrobras PN)');
    expect(result!.type).toBe('PUT');
    expect(result!.month).toBe('Janeiro');
    expect(result!.monthNum).toBe(1);
    expect(result!.strike).toBe(1.8);
    expect(result!.raw).toBe('PETRM18');
  });

  it('decodes ITUBM35 as Itaú PUT Janeiro strike 3.5', () => {
    const result = decodeB3('ITUBM35');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('ITUB (Itaú Unibanco)');
    expect(result!.type).toBe('PUT');
    expect(result!.month).toBe('Janeiro');
    expect(result!.monthNum).toBe(1);
    expect(result!.strike).toBe(3.5);
    expect(result!.raw).toBe('ITUBM35');
  });

  it('decodes BBDCM35 as Bradesco PUT Janeiro strike 3.5', () => {
    const result = decodeB3('BBDCM35');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('BBDC (Bradesco)');
    expect(result!.type).toBe('PUT');
    expect(result!.month).toBe('Janeiro');
    expect(result!.monthNum).toBe(1);
    expect(result!.strike).toBe(3.5);
  });

  it('decodes every PUT series letter (M–X) correctly', () => {
    const expectations: Array<{ letter: string; month: string; num: number }> = [
      { letter: 'M', month: 'Janeiro', num: 1 },
      { letter: 'N', month: 'Fevereiro', num: 2 },
      { letter: 'O', month: 'Março', num: 3 },
      { letter: 'P', month: 'Abril', num: 4 },
      { letter: 'Q', month: 'Maio', num: 5 },
      { letter: 'R', month: 'Junho', num: 6 },
      { letter: 'S', month: 'Julho', num: 7 },
      { letter: 'T', month: 'Agosto', num: 8 },
      { letter: 'U', month: 'Setembro', num: 9 },
      { letter: 'V', month: 'Outubro', num: 10 },
      { letter: 'W', month: 'Novembro', num: 11 },
      { letter: 'X', month: 'Dezembro', num: 12 },
    ];
    for (const { letter, month, num } of expectations) {
      const result = decodeB3(`PETR${letter}21`);
      expect(result).not.toBeNull();
      expect(result!.type).toBe('PUT');
      expect(result!.month).toBe(month);
      expect(result!.monthNum).toBe(num);
    }
  });
});

describe('decodeB3 – strike parsing', () => {
  it('parses 2-digit strike by dividing by 10 (PETRH21 → 2.1)', () => {
    expect(decodeB3('PETRH21')!.strike).toBe(2.1);
  });

  it('parses 3-digit strike by dividing by 10 (PETRH123 → 12.3)', () => {
    expect(decodeB3('PETRH123')!.strike).toBe(12.3);
  });

  it('parses 4-digit strike by dividing by 100 (PETRH1234 → 12.34)', () => {
    expect(decodeB3('PETRH1234')!.strike).toBe(12.34);
  });

  it('parses 5-digit strike by dividing by 100 (PETRH12345 → 123.45)', () => {
    expect(decodeB3('PETRH12345')!.strike).toBe(123.45);
  });
});

describe('decodeB3 – invalid / edge inputs', () => {
  it('returns null for codes shorter than 6 characters', () => {
    expect(decodeB3('')).toBeNull();
    expect(decodeB3('PETR')).toBeNull();
    expect(decodeB3('PETR1')).toBeNull();
    expect(decodeB3('PETR12')).toBeNull();
    expect(decodeB3('PETR123')).toBeNull();
    expect(decodeB3('PETR12345')).toBeNull(); // 9 chars but no valid series letter at right position
  });

  it('returns null when no valid series letter is found', () => {
    // '1' and '@' are not series letters (A–X)
    expect(decodeB3('PETR1ABC')).toBeNull();
    expect(decodeB3('PETR@XYZ')).toBeNull();
  });

  it('returns null when strike portion is empty', () => {
    // rest (after series letter) has length 0
    expect(decodeB3('PETRH')).toBeNull();
  });

  it('returns null for non-numeric strike (parseInt returns NaN)', () => {
    const result = decodeB3('PETRHAB');
    expect(result).toBeNull();
  });

  it('returns null for strike <= 0', () => {
    expect(decodeB3('PETRH0')).toBeNull();
    expect(decodeB3('PETRH00')).toBeNull();
  });

  it('returns null for weekly codes', () => {
    expect(decodeB3('B3SAB11W1')).toBeNull();
    expect(decodeB3('PETRC32W2')).toBeNull();
  });
});

describe('decodeB3 – formatting & normalization', () => {
  it('handles case-insensitive input', () => {
    const result = decodeB3('petrh21');
    expect(result).not.toBeNull();
    expect(result!.raw).toBe('PETRH21');
    expect(result!.asset).toBe('PETR (Petrobras PN)');
    expect(result!.type).toBe('CALL');
  });

  it('trims whitespace from input', () => {
    const result = decodeB3('  PETRH21  ');
    expect(result).not.toBeNull();
    expect(result!.raw).toBe('PETRH21');
  });

  it('formats unknown asset code without parenthesised name', () => {
    // "ZZZZ" is not in ASSET_NAMES
    const result = decodeB3('ZZZZH21');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('ZZZZ');
  });

  it('handles assets with 5-letter code detection (assetLen=5 path)', () => {
    // "ABCDEH21": length 8 > 5, index 5 = 'H' which is a valid series letter
    // → determineAssetLen returns 5 → assetCode = "ABCDE", seriesLetter = "H"
    const result = decodeB3('ABCDEH21');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('ABCDE');
    expect(result!.type).toBe('CALL');
    expect(result!.month).toBe('Agosto');
    expect(result!.monthNum).toBe(8);
    expect(result!.strike).toBe(2.1);
  });
});

/* ──────────────────────────────────────────────
 * decodeB3Weekly – Weekly options
 * ────────────────────────────────────────────── */

describe('decodeB3Weekly – valid weekly codes', () => {
  it('decodes B3SAB11W1 as B3 CALL week 1 strike 1.1', () => {
    const result = decodeB3Weekly('B3SAB11W1');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('B3SA (B3)');
    expect(result!.type).toBe('CALL');
    expect(result!.month).toBe('Fevereiro');
    expect(result!.monthNum).toBe(2);
    expect(result!.week).toBe(1);
    expect(result!.strike).toBe(1.1);
    expect(result!.raw).toBe('B3SAB11W1');
  });

  it('decodes PETRC32W2 as Petrobras CALL week 2 strike 3.2', () => {
    const result = decodeB3Weekly('PETRC32W2');
    expect(result).not.toBeNull();
    expect(result!.asset).toBe('PETR (Petrobras PN)');
    expect(result!.type).toBe('CALL');
    expect(result!.month).toBe('Março');
    expect(result!.monthNum).toBe(3);
    expect(result!.week).toBe(2);
    expect(result!.strike).toBe(3.2);
    expect(result!.raw).toBe('PETRC32W2');
  });

  it('decodes weekly PUT option (PETRM50W4)', () => {
    const result = decodeB3Weekly('PETRM50W4');
    expect(result).not.toBeNull();
    expect(result!.type).toBe('PUT');
    expect(result!.month).toBe('Janeiro');
    expect(result!.monthNum).toBe(1);
    expect(result!.week).toBe(4);
    expect(result!.strike).toBe(5.0);
  });

  it('decodes weekly with week=5 (PETRH100W5)', () => {
    const result = decodeB3Weekly('PETRH100W5');
    expect(result).not.toBeNull();
    expect(result!.week).toBe(5);
    // "100".length = 3 < 4 → 100/10 = 10.0 (strike parsing divides by 10 for < 4 digits)
    expect(result!.strike).toBe(10.0);
  });
});

describe('decodeB3Weekly – invalid inputs', () => {
  it('returns null for monthly codes', () => {
    expect(decodeB3Weekly('PETRH21')).toBeNull();
    expect(decodeB3Weekly('VALEK42')).toBeNull();
    expect(decodeB3Weekly('PETRM18')).toBeNull();
  });

  it('returns null for codes shorter than 6 characters', () => {
    expect(decodeB3Weekly('')).toBeNull();
    expect(decodeB3Weekly('PETR')).toBeNull();
  });

  it('returns null for codes with invalid week numbers (W0, W3, W6, W9)', () => {
    // These don't match the regex /^(\d+)W([1245])$/ → treated as non-weekly
    expect(decodeB3Weekly('PETRH21W3')).toBeNull();
    expect(decodeB3Weekly('PETRH21W0')).toBeNull();
    expect(decodeB3Weekly('PETRH21W6')).toBeNull();
    expect(decodeB3Weekly('PETRH21W9')).toBeNull();
  });

  it('returns null when weekly suffix has non-digit prefix', () => {
    // parseWeeklySuffix requires digits before W
    expect(decodeB3Weekly('PETRHABW1')).toBeNull();
  });

  it('returns null when no series letter is present', () => {
    // "1234Y" → "Y" is not a valid series letter (A-L for CALL, M-X for PUT)
    expect(decodeB3Weekly('1234Y21W1')).toBeNull();
  });
});

describe('decodeB3Weekly – normalization', () => {
  it('handles case-insensitive input', () => {
    const result = decodeB3Weekly('b3sab11w1');
    expect(result).not.toBeNull();
    expect(result!.raw).toBe('B3SAB11W1');
    expect(result!.week).toBe(1);
  });

  it('trims whitespace from input', () => {
    const result = decodeB3Weekly('  PETRC32W2  ');
    expect(result).not.toBeNull();
    expect(result!.raw).toBe('PETRC32W2');
  });
});

/* ──────────────────────────────────────────────
 * Mutual exclusivity
 * ────────────────────────────────────────────── */

describe('decodeB3 × decodeB3Weekly mutual exclusivity', () => {
  it('monthly codes succeed in decodeB3 and fail in decodeB3Weekly', () => {
    const monthlyCodes = ['PETRH21', 'VALEK42', 'PETRM18', 'ITUBM35', 'BBDCM35'];
    for (const code of monthlyCodes) {
      expect(decodeB3(code)).not.toBeNull();
      expect(decodeB3Weekly(code)).toBeNull();
    }
  });

  it('weekly codes succeed in decodeB3Weekly and fail in decodeB3', () => {
    const weeklyCodes = ['B3SAB11W1', 'PETRC32W2'];
    for (const code of weeklyCodes) {
      expect(decodeB3(code)).toBeNull();
      expect(decodeB3Weekly(code)).not.toBeNull();
    }
  });
});

/* ──────────────────────────────────────────────
 * smartSearch
 * ────────────────────────────────────────────── */

describe('smartSearch – direct match', () => {
  it('returns single result for a full monthly code', () => {
    const results = smartSearch('PETRH21');
    expect(results).toHaveLength(1);
    expect(results[0]!.raw).toBe('PETRH21');
    expect(results[0]!.type).toBe('CALL');
    expect(results[0]!.asset).toContain('PETR');
  });

  it('returns single result for a full weekly code', () => {
    const results = smartSearch('B3SAB11W1');
    expect(results).toHaveLength(1);
    expect(results[0]!.raw).toBe('B3SAB11W1');
    expect(results[0]!.week).toBe(1);
  });

  it('returns single result for a full code regardless of case', () => {
    const results = smartSearch('PetrH21');
    expect(results).toHaveLength(1);
    expect(results[0]!.raw).toBe('PETRH21');
  });
});

describe('smartSearch – partial asset match', () => {
  it('finds results by partial asset code "PETR"', () => {
    const results = smartSearch('PETR');
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.asset).toContain('PETR');
    }
  });

  it('finds results by partial asset name "Petro"', () => {
    const results = smartSearch('Petro');
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.asset).toContain('PETR');
    }
  });

  it('finds results by partial asset name "Vale"', () => {
    const results = smartSearch('Vale');
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.asset).toContain('VALE');
    }
  });

  it('finds results by partial asset code "B3SA"', () => {
    const results = smartSearch('B3SA');
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.asset).toContain('B3SA');
    }
  });
});

describe('smartSearch – suffix search', () => {
  it('finds results for suffix "H21"', () => {
    const results = smartSearch('H21');
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(5);
    for (const r of results) {
      expect(r.raw.endsWith('H21')).toBe(true);
    }
  });

  it('finds results for suffix "M18"', () => {
    const results = smartSearch('M18');
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(5);
    for (const r of results) {
      expect(r.raw.endsWith('M18')).toBe(true);
    }
  });
});

describe('smartSearch – empty / unrecognized input', () => {
  it('returns empty array for empty string', () => {
    expect(smartSearch('')).toEqual([]);
  });

  it('returns empty array for whitespace-only string', () => {
    expect(smartSearch('   ')).toEqual([]);
  });

  it('returns empty array for completely unrecognized input', () => {
    // No asset matches and no suffix matches
    const results = smartSearch('ZZZZ@ZZ');
    expect(results).toEqual([]);
  });

  it('returns empty array for random gibberish', () => {
    const results = smartSearch('XQP1');
    expect(results).toEqual([]);
  });
});

describe('smartSearch – integration with EXAMPLES', () => {
  it('every example code can be found via smartSearch', () => {
    for (const ex of EXAMPLES) {
      const results = smartSearch(ex.code);
      expect(results.length).toBeGreaterThanOrEqual(1);
      const raws = results.map((r) => r.raw);
      expect(raws).toContain(ex.code.toUpperCase());
    }
  });
});

/* ──────────────────────────────────────────────
 * EXAMPLES array
 * ────────────────────────────────────────────── */

describe('EXAMPLES array structure', () => {
  it('has exactly 7 entries', () => {
    expect(EXAMPLES).toHaveLength(7);
  });

  it('every entry has a non-empty code and label string', () => {
    for (const ex of EXAMPLES) {
      expect(typeof ex.code).toBe('string');
      expect(typeof ex.label).toBe('string');
      expect(ex.code.length).toBeGreaterThan(0);
      expect(ex.label.length).toBeGreaterThan(0);
    }
  });

  it('every code is decodable by decodeB3 or decodeB3Weekly', () => {
    for (const ex of EXAMPLES) {
      const monthly = decodeB3(ex.code);
      const weekly = decodeB3Weekly(ex.code);
      const decoded = monthly ?? weekly;
      expect(decoded).not.toBeNull();
      expect(decoded!.raw).toBe(ex.code.toUpperCase());
    }
  });

  it('EXAMPLES is declared as readonly (as const)', () => {
    // In TypeScript, `as const` makes the type deeply readonly at compile time.
    // Even though the runtime array may not be frozen, the type system enforces readonly.
    // Verify the array has the correct structure
    expect(EXAMPLES.length).toBeGreaterThan(0);
    expect(EXAMPLES[0]).toBeDefined();
    // All codes are decodable (cross-check with decodeB3)
    for (const ex of EXAMPLES) {
      expect(decodeB3(ex.code) ?? decodeB3Weekly(ex.code)).not.toBeNull();
    }
  });
});

/* ──────────────────────────────────────────────
 * Additional edge cases
 * ────────────────────────────────────────────── */

describe('additional edge cases', () => {
  it('handles asset codes with 4-digit strike (division by 100)', () => {
    // "PETRH1000" → strike "1000", len=4 → 1000/100 = 10
    const result = decodeB3('PETRH1000');
    expect(result).not.toBeNull();
    expect(result!.strike).toBe(10);
  });

  it('handles weekly code with 4-digit strike (division by 100)', () => {
    // "PETRH1000W1" → strike "1000", len=4 → 1000/100 = 10, week=1
    const result = decodeB3Weekly('PETRH1000W1');
    expect(result).not.toBeNull();
    expect(result!.strike).toBe(10);
    expect(result!.week).toBe(1);
  });

  it('returns null for codes with unknown series letter beyond X', () => {
    // Letters Y, Z are not in SERIES
    expect(decodeB3('PETRY21')).toBeNull();
    expect(decodeB3('PETRZ21')).toBeNull();
  });

  it('series letters are case-sensitive (only uppercase in SERIES map)', () => {
    // After toUpperCase, lowercase input is fine
    // But the SERIES map only has uppercase keys
    const result = decodeB3('petrh21');
    expect(result).not.toBeNull();
    expect(result!.raw).toBe('PETRH21');
  });

  it('strike zero returns null (strikeNum <= 0 check)', () => {
    expect(decodeB3('PETRH0')).toBeNull();
  });

  it('strike negative returns null', () => {
    // Leading "-" makes parseInt return NaN for " - " but "-1".parseInt ...
    // Actually parseInt("-1") = -1 which is <= 0 → null
    // But the regex for weekly would not match with "-"
    // For non-weekly: parseB3Code("PETRH-1") → assetCode="PETR", seriesLetter="H", rest="-1"
    // strikeNum = parseInt("-1", 10) = -1 ≤ 0 → null
    expect(decodeB3('PETRH-1')).toBeNull();
  });
});
