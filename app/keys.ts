export type KeyRole = 'digit' | 'operator' | 'equals' | 'clear' | 'function';

export type Key = {
  label: string;
  role: KeyRole;
  // How many columns the key spans. Defaults to one.
  span?: number;
  accessibilityLabel?: string;
};

export const BASIC: Key[][] = [
  [
    { label: 'AC', role: 'clear', accessibilityLabel: 'Wyczyść wszystko' },
    { label: '()', role: 'operator', accessibilityLabel: 'Nawiasy' },
    { label: '%', role: 'operator', accessibilityLabel: 'Procent' },
    { label: '÷', role: 'operator', accessibilityLabel: 'Dzielenie' },
  ],
  [
    { label: '7', role: 'digit', accessibilityLabel: '7' },
    { label: '8', role: 'digit', accessibilityLabel: '8' },
    { label: '9', role: 'digit', accessibilityLabel: '9' },
    { label: '×', role: 'operator', accessibilityLabel: 'Mnożenie' },
  ],
  [
    { label: '4', role: 'digit', accessibilityLabel: '4' },
    { label: '5', role: 'digit', accessibilityLabel: '5' },
    { label: '6', role: 'digit', accessibilityLabel: '6' },
    { label: '−', role: 'operator', accessibilityLabel: 'Odejmowanie' },
  ],
  [
    { label: '1', role: 'digit', accessibilityLabel: '1' },
    { label: '2', role: 'digit', accessibilityLabel: '2' },
    { label: '3', role: 'digit', accessibilityLabel: '3' },
    { label: '+', role: 'operator', accessibilityLabel: 'Dodawanie' },
  ],
  [
    { label: '0', role: 'digit', accessibilityLabel: '0' },
    { label: ',', role: 'digit', accessibilityLabel: 'Przecinek' },
    { label: '⌫', role: 'clear', accessibilityLabel: 'Cofnij' },
    { label: '=', role: 'equals', accessibilityLabel: 'Równa się' },
  ],
];

export const EXTENDED: Key[][] = [
  [
    { label: 'x²', role: 'function', accessibilityLabel: 'Kwadrat' },
    { label: '√', role: 'function', accessibilityLabel: 'Pierwiastek kwadratowy' },
  ],
  [
    { label: 'xʸ', role: 'function', accessibilityLabel: 'Potęga' },
    { label: '1/x', role: 'function', accessibilityLabel: 'Odwrotność' },
  ],
  [
    { label: 'π', role: 'function', accessibilityLabel: 'Liczba Pi' },
    { label: 'e', role: 'function', accessibilityLabel: 'Liczba Eulera' },
  ],
];
