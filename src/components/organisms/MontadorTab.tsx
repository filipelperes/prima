import { useCallback, useState } from 'react';
import { decodeB3, decodeB3Weekly, type DecodeResult } from '@/data/decoder';
import { MontadorBuilderCard } from '@/components/organisms/MontadorBuilderCard';
import { MontadorReferenceCards } from '@/components/organisms/MontadorReferenceCards';
import type { MontadorExample, OptionType } from '@/components/organisms/montadorData';
import { getSeriesLetter } from '@/components/organisms/montadorData';

export function MontadorTab() {
  const [asset, setAsset] = useState('');
  const [type, setType] = useState<OptionType>('CALL');
  const [month, setMonth] = useState('');
  const [strike, setStrike] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [decodedExample, setDecodedExample] = useState<DecodeResult | null>(null);
  const allFilled = asset.length > 0 && month.length > 0 && strike.length > 0;

  const generateCode = useCallback(() => {
    if (!allFilled) return;
    const code = `${asset.toUpperCase()}${getSeriesLetter(type, month)}${Math.round(parseFloat(strike))}`;
    setGeneratedCode(code);
    setDecodedExample(decodeB3(code) ?? decodeB3Weekly(code));
  }, [asset, type, month, strike, allFilled]);

  const handleExample = useCallback((example: MontadorExample) => {
    setAsset(example.asset);
    setType(example.type);
    setMonth(example.month);
    setStrike(String(example.strike));
    setGeneratedCode(example.code);
    setDecodedExample(decodeB3(example.code) ?? decodeB3Weekly(example.code));
  }, []);

  return (
    <>
      <MontadorBuilderCard
        asset={asset}
        type={type}
        month={month}
        strike={strike}
        allFilled={allFilled}
        generatedCode={generatedCode}
        decodedExample={decodedExample}
        onAssetChange={setAsset}
        onTypeChange={setType}
        onMonthChange={setMonth}
        onStrikeChange={setStrike}
        onGenerate={generateCode}
        onExample={handleExample}
      />
      <MontadorReferenceCards />
    </>
  );
}
