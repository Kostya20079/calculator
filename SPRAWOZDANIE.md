# Sprawozdanie – Konspekt 4: Kalkulator (Pełna siatka i orientacja pozioma)

## Zadanie 5. Stan przy obrocie urządzenia

### Pytanie 1: Dlaczego wyrażenie wprowadzone przed obrotem jest widoczne po obrocie urządzenia?
**Odpowiedź:**
W React Native zmiana orientacji urządzenia (obrót ekranu) **nie niszczy komponentu ani jego drzewa**. Zmianie ulegają jedynie wymiary okna (`useWindowDimensions`), co wywołuje ponowne przeliczenie widoku (re-render) komponentu z nowym układem stylów. Stan zainicjalizowany za pomocą `useState` pozostaje nienaruszony w pamięci instancji komponentu. 

W odróżnieniu od natywnego Androida (gdzie obrót domyślnie niszczy i tworzy na nowo `Activity`, wymuszając stosowanie `rememberSaveable` lub `ViewModel`), w React Native stan komponentu przeżywa zmianę orientacji automatycznie. Należy jednak pamiętać, że stan ten nie przeżywa zamknięcia aplikacji ani ubicia procesu przez system – do tego celu potrzebna jest pamięć trwała (np. AsyncStorage lub zapis do pliku).

---

### Pytanie 2: Dlaczego klawisz π powinien wpisywać nazwę/symbol stałej, a nie liczbę 3,14159? (Zadanie 3.3 / str. 9)
**Odpowiedź:**
Wpisanie symbolu stałej (`π`) zamiast przybliżonej wartości liczbowej (`3,14159`) ma kluczowe znaczenie dla **dokładności obliczeń**:
1. Wpisanie `3,14159` to ucięcie liczby do zaledwie 5 miejsc po przecinku już na etapie wprowadzania danych, co kumuluje błędy zaokrągleń w kolejnych operacjach (mnożenie, funkcje trygonometryczne).
2. Reprezentacja symboliczna pozwala silnikowi obliczeniowemu (który powstanie w laboratorium 6) podstawić stałą z pełną precyzją podwójnej dokładności IEEE 754 (`Math.PI` – około 15-17 cyfr znaczących: `3.141592653589793`).
3. Wyrażenie z symbolem `π` jest znacznie bardziej czytelne dla użytkownika niż rozwinięcie dziesiętne.
