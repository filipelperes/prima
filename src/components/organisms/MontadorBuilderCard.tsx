import { CodeDecoder } from '@/components/molecules/CodeDecoder';
import { Tag } from '@/components/atoms/Tag';
import type { DecodeResult } from '@/data/decoder';
import {
  ASSET_NAMES,
  EXAMPLES_RAPIDOS,
  MONTHS,
  type MontadorExample,
  type OptionType,
  getSeriesLetter,
} from '@/components/organisms/montadorData';
import { MontadorDecodeField } from '@/components/organisms/MontadorDecodeField';

interface MontadorBuilderCardProps {
  readonly asset: string;
  readonly type: OptionType;
  readonly month: string;
  readonly strike: string;
  readonly allFilled: boolean;
  readonly generatedCode: string;
  readonly decodedExample: DecodeResult | null;
  readonly onAssetChange: (value: string) => void;
  readonly onTypeChange: (value: OptionType) => void;
  readonly onMonthChange: (value: string) => void;
  readonly onStrikeChange: (value: string) => void;
  readonly onGenerate: () => void;
  readonly onExample: (example: MontadorExample) => void;
}

export function MontadorBuilderCard(props: MontadorBuilderCardProps) {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">🧩 Montador de Opções B3</div>
      <QuickExamples onExample={props.onExample} />
      <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
        <EncoderPanel {...props} />
        <DecoderPanel {...props} />
      </div>
    </div>
  );
}

function QuickExamples({ onExample }: Pick<MontadorBuilderCardProps, 'onExample'>) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {EXAMPLES_RAPIDOS.map((ex) => (
        <button key={ex.code} onClick={() => onExample(ex)} className="bg-surface border border-border-custom rounded-sm px-2.5 py-1 cursor-pointer text-accent font-mono text-xs transition-all duration-200">
          {ex.code}
        </button>
      ))}
    </div>
  );
}

function EncoderPanel(props: MontadorBuilderCardProps) {
  return (
    <div className="bg-surface rounded-[10px] p-3.5">
      <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-3">CODIFICADOR</div>
      <AssetInput asset={props.asset} onAssetChange={props.onAssetChange} />
      <TypePicker type={props.type} onTypeChange={props.onTypeChange} />
      <MonthSelect type={props.type} month={props.month} onMonthChange={props.onMonthChange} />
      <StrikeInput strike={props.strike} onStrikeChange={props.onStrikeChange} />
      <GenerateButton allFilled={props.allFilled} onGenerate={props.onGenerate} />
      <GeneratedCodeSummary {...props} />
    </div>
  );
}

function AssetInput({ asset, onAssetChange }: Pick<MontadorBuilderCardProps, 'asset' | 'onAssetChange'>) {
  return (
    <div className="mb-2.5">
      <div className="text-[10px] text-muted mb-1">Ativo</div>
      <input list="asset-list" value={asset} onChange={(event) => onAssetChange(event.target.value.toUpperCase())} placeholder="Ex: PETR" className="w-full bg-card-custom border border-border-custom rounded-sm px-2.5 py-2 text-text font-mono text-xs outline-none" />
      <datalist id="asset-list">
        {Object.keys(ASSET_NAMES).map((code) => (
          <option key={code} value={code} label={ASSET_NAMES[code]} />
        ))}
      </datalist>
    </div>
  );
}

function TypePicker({ type, onTypeChange }: Pick<MontadorBuilderCardProps, 'type' | 'onTypeChange'>) {
  return (
    <div className="mb-2.5">
      <div className="text-[10px] text-muted mb-1">Tipo</div>
      <div className="flex gap-1.5">
        {(['CALL', 'PUT'] as const).map((optionType) => (
          <button key={optionType} onClick={() => onTypeChange(optionType)} className={getTypeButtonClass(type, optionType)}>
            {optionType}
          </button>
        ))}
      </div>
    </div>
  );
}

function getTypeButtonClass(current: OptionType, optionType: OptionType): string {
  const active = optionType === 'CALL' ? 'bg-[#00e67611] border-green text-green' : 'bg-[#ff3d5711] border-red text-red';
  const inactive = 'border-border-custom text-muted bg-transparent';
  return `flex-1 py-[7px] rounded-sm border font-mono text-xs font-bold cursor-pointer transition-all duration-200 ${current === optionType ? active : inactive}`;
}

function MonthSelect({ type, month, onMonthChange }: Pick<MontadorBuilderCardProps, 'type' | 'month' | 'onMonthChange'>) {
  return (
    <div className="mb-2.5">
      <div className="text-[10px] text-muted mb-1">Mês de vencimento</div>
      <select value={month} onChange={(event) => onMonthChange(event.target.value)} className="w-full bg-card-custom border border-border-custom rounded-sm px-2.5 py-2 text-text font-sans text-xs outline-none cursor-pointer">
        <option value="">Selecione</option>
        {MONTHS.map((item) => (
          <option key={item} value={item}>
            {item} ({getSeriesLetter(type, item)})
          </option>
        ))}
      </select>
    </div>
  );
}

function StrikeInput({ strike, onStrikeChange }: Pick<MontadorBuilderCardProps, 'strike' | 'onStrikeChange'>) {
  return (
    <div className="mb-2.5">
      <div className="text-[10px] text-muted mb-1">Strike (R$)</div>
      <input type="number" value={strike} onChange={(event) => onStrikeChange(event.target.value)} placeholder="Ex: 21" min="0" step="0.01" className="w-full bg-card-custom border border-border-custom rounded-sm px-2.5 py-2 text-text font-mono text-xs outline-none" />
    </div>
  );
}

function GenerateButton({ allFilled, onGenerate }: Pick<MontadorBuilderCardProps, 'allFilled' | 'onGenerate'>) {
  return (
    <button onClick={onGenerate} disabled={!allFilled} className={`w-full py-2.5 rounded-md border-none font-mono text-xs font-bold transition-all duration-200 ${allFilled ? 'bg-accent text-white cursor-pointer' : 'bg-border-custom text-muted cursor-not-allowed'}`}>
      Gerar Código
    </button>
  );
}

function GeneratedCodeSummary({ generatedCode, asset, type, month }: Pick<MontadorBuilderCardProps, 'generatedCode' | 'asset' | 'type' | 'month'>) {
  if (!generatedCode) return null;
  return (
    <div className="mt-3 bg-card-custom border border-accent rounded-[10px] p-3.5 text-center">
      <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-1.5">Código Gerado</div>
      <div className="text-[22px] font-bold text-accent font-mono tracking-[2px]">{generatedCode}</div>
      <div className="text-[11px] text-slate-400 mt-1.5">{asset} · {type} · {month}</div>
    </div>
  );
}

function DecoderPanel(props: MontadorBuilderCardProps) {
  return (
    <div className="bg-surface rounded-[10px] p-3.5">
      <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-3">DECODIFICADOR</div>
      <CodeDecoder />
      <DecodedExampleSummary {...props} />
    </div>
  );
}

function DecodedExampleSummary({ decodedExample, generatedCode }: Pick<MontadorBuilderCardProps, 'decodedExample' | 'generatedCode'>) {
  if (!decodedExample || !generatedCode) return null;
  return (
    <div className="mt-3 bg-card-custom border border-border-custom rounded-[10px] p-3">
      <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-2">
        Decodificação de {generatedCode}
      </div>
      <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
        <MontadorDecodeField label="Ativo" value={decodedExample.asset} color="text-accent" />
        <DecodedType type={decodedExample.type} />
        <MontadorDecodeField label="Strike" value={`R$ ${decodedExample.strike.toFixed(1)}`} color="text-yellow" />
        <MontadorDecodeField label="Vencimento" value={getExpirationLabel(decodedExample)} color="text-purple" />
      </div>
    </div>
  );
}

function DecodedType({ type }: Pick<DecodeResult, 'type'>) {
  return (
    <div>
      <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-1">Tipo</div>
      <Tag variant={type === 'CALL' ? 'green' : 'red'}>{type}</Tag>
    </div>
  );
}

function getExpirationLabel(decodedExample: DecodeResult): string {
  if (decodedExample.week !== undefined) {
    return `${decodedExample.month} — Semana ${decodedExample.week}`;
  }
  return decodedExample.month;
}
