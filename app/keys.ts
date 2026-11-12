export type KeyRole = 'digit' | 'operator' | 'equals' | 'clear' | 'function';

export type Key = {
  label: string;
  value?: string;
  role: KeyRole;
  // How many columns the key spans. Defaults to one.
  span?: number;
  accessibilityLabel?: string;
};

export const BASIC: Key[][] = [
  [
    { label: 'AC', role: 'clear', accessibilityLabel: 'Wyczyść wszystko' },
    { label: '()', role: 'operator', accessibilityLabel: 'Nawiasy' },
    { label: '%', value: '%', role: 'operator', accessibilityLabel: 'Procent' },
    { label: '÷', value: '/', role: 'operator', accessibilityLabel: 'Dzielenie' },
  ],
  [
    { label: '7', role: 'digit', accessibilityLabel: '7' },
    { label: '8', role: 'digit', accessibilityLabel: '8' },
    { label: '9', role: 'digit', accessibilityLabel: '9' },
    { label: '×', value: '*', role: 'operator', accessibilityLabel: 'Mnożenie' },
  ],
  [
    { label: '4', role: 'digit', accessibilityLabel: '4' },
    { label: '5', role: 'digit', accessibilityLabel: '5' },
    { label: '6', role: 'digit', accessibilityLabel: '6' },
    { label: '−', value: '-', role: 'operator', accessibilityLabel: 'Odejmowanie' },
  ],
  [
    { label: '1', role: 'digit', accessibilityLabel: '1' },
    { label: '2', role: 'digit', accessibilityLabel: '2' },
    { label: '3', role: 'digit', accessibilityLabel: '3' },
    { label: '+', value: '+', role: 'operator', accessibilityLabel: 'Dodawanie' },
  ],
  [
    { label: '0', role: 'digit', accessibilityLabel: '0' },
    { label: ',', value: ',', role: 'digit', accessibilityLabel: 'Przecinek' },
    { label: '⌫', role: 'clear', accessibilityLabel: 'Cofnij' },
    { label: '=', role: 'equals', accessibilityLabel: 'Równa się' },
  ],
];

export const EXTENDED: Key[][] = [
  [
    { label: 'x²', value: '^2', role: 'function', accessibilityLabel: 'Kwadrat' },
    { label: '√', value: '√', role: 'function', accessibilityLabel: 'Pierwiastek kwadratowy' },
  ],
  [
    { label: 'xʸ', value: '^', role: 'function', accessibilityLabel: 'Potęga' },
    { label: '1/x', value: '1/', role: 'function', accessibilityLabel: 'Odwrotność' },
  ],
  [
    { label: 'π', value: 'π', role: 'function', accessibilityLabel: 'Liczba Pi' },
    { label: 'e', value: 'e', role: 'function', accessibilityLabel: 'Liczba Eulera' },
  ],
];
