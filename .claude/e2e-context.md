# Kontekst frameworka e2e (wspólny dla agentów test-*)

## Stos i struktura
- Cucumber (Gherkin) + Playwright + TypeScript, transpilacja Babel (`e2e/src` → `e2e/dist`).
- Scenariusze: `e2e/src/features/**/*.feature`. Tagi `@smoke` / `@regression`, profile w `e2e/src/index.ts` (dev/smoke/regression).
- Kroki: `e2e/src/step-definitions/` (akcje) i `step-definitions/assertions/` (asercje). Kroki są generyczne i sterowane regexem.
- Selektory tylko w `e2e/config/mappings/<strona>.json` (klucz czytelny → selektor, najlepiej `[data-id='...']`).
  - Nazwa pliku mappingu = klucz strony w `e2e/config/pages.json`, łącznie ze spacjami (np. `create contact.json`).
  - `getElementLocator` szuka najpierw w mappingu bieżącej strony, potem w `common.json`.
- Strony: `e2e/config/pages.json` (`route` + `regex`). Każdy URL, na który trafia test, musi pasować do jakiegoś `regex`, inaczej `getCurrentPageId` rzuca wyjątek.
- Logika Playwright: `e2e/src/support/*-behavior.ts` / `*-helper.ts`. Kroki wołają te funkcje, a nie API Playwrighta bezpośrednio. Tylko lokatory (`page.locator(...)`), bez `page.$`/`page.click(selector)`.
- Domyślny timeout akcji lokatora = `SELECTOR_TIMEOUT` (2 s, ustawiany na kontekście w `world.ts`), nawigacji = `SCRIPT_TIMEOUT`. Ponawianie zapewnia `waitFor`.
  - Akcje są owinięte w `waitFor(...)` + `waitForSelector(...)` i logują przez `logger.log(...)`. Wzorzec: `step-definitions/check.ts`.
- Aplikacja testowana: React w `src/` (`index.js`, `Contact*.react.js`, `components/Basic*.react.js`, dane w `contacts.json`). Stan jest tylko w pamięci, a każdy scenariusz dostaje świeżą przeglądarkę.

## Zasady
- Kolejność preferencji: istniejący krok > nowy wpis w mappingu > nowa funkcja w `support/` > nowy krok.
- Brakujące `data-id` w `src/` dodajemy (zatwierdzone przez użytkownika): nazwy po angielsku, kebab-case, bez kolizji z istniejącymi.
- Nowy krok tylko wtedy, gdy żaden istniejący regex nie pasuje. Ma być generyczny i nie może kolidować z innymi (Cucumber zgłasza wtedy błąd "ambiguous").
- Zero sleepów (`I wait "N" seconds`, `waitForTimeout`), zero selektorów w `.ts`.
- Kod ma wyglądać jak sąsiedni: ten sam styl importów (ukośniki `/`), nazewnictwo, `logger.log`, `waitFor`.
- Bez commitów.

## Pułapki znane z poprzednich przebiegów
- Gherkin przycina spacje w komórkach tabeli Examples. Wartości złożone z samych spacji podawaj wprost w kroku: `with "   "`.
- Regex widoczności ma literówkę, cudzysłów na końcu: `the "x" should( not)? be displayed"`. Istniejące feature'y z niej korzystają, więc jej nie poprawiaj.
- Akcje w `support/` używają `locator(...).first()`, więc klikają pierwszy pasujący element. Po filtrowaniu listy sprawdź liczność (`I should see "1" "contact" displayed`), zanim klikniesz.
- `the "x" should be displayed"` sprawdza realną widoczność (choć jeden pasujący element widoczny, `locator.visible()`). `I should see "N" "x" displayed` liczy tylko widoczne elementy.
- W nazwach scenariuszy nie używaj `"`. Z nazwy powstaje katalog na wideo i screenshoty, a na Windows `"` jest w nim niedozwolony.
- `equal the text` porównuje surowy `textContent` przez `===`, bez trim. `equal the value` czyta `el.value`, działa też dla `<select>`.
- `SCRIPT_TIMEOUT=15000` jest dłuższy niż `waitFor` (10 s), więc nieudana asercja kończy się błędem `Wait time of 10000 ms exceeded` (z ostatnim wyjątkiem predykatu). Brak klucza w mappingu rzuca `No mapping for "x"`.
- `I click accept|dismiss on the alert dialog` rejestruje jednorazowy handler (`page.once`) dla NASTĘPNEGO okna, więc stawiaj go PRZED kliknięciem, które otwiera okno. Każde okno potrzebuje własnego kroku.
- Treść okna: `the alert dialog should( not)? contain text "..."` (stawiaj PO kliknięciu). Wszystkie okna są rejestrowane przez `dialogclosed`, także zamknięte automatycznie. Krok sprawdza ostatnie okno i po sukcesie czyści listę, więc kolejna asercja wymaga nowego okna.
- Testy zależne od zewnętrznego API (np. `BasicREST` → jsonplaceholder) oznaczaj tylko `@regression`, nigdy `@smoke`.

## Uruchamianie (macOS)
- yarn przez corepack: `corepack enable` (jednorazowo) albo `COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn ...`.
- Zależności: `yarn install` w katalogu głównym i w `e2e/`, potem `npx playwright install chromium` w `e2e/`.
- Aplikacja: `BROWSER=none PORT=3000 yarn start` w katalogu głównym. Czekaj, aż `curl localhost:3000` zwróci 200. Zatrzymaj ją po testach.
- Testy: w `e2e/` uruchom `HEADLESS=true RETRY=0 ./run_test.sh localhost <smoke|regression|dev>`. Zmienne podane w poleceniu nadpisują `env/common.env`, a `RETRY=0` jest potrzebne do wykrywania flaky.
- `run_test.sh` sam przełącza się na `corepack yarn`, gdy `yarn` nie ma w PATH.
- `run_test.sh` zwraca kod różny od 0, gdy któryś scenariusz padnie. Raport: `e2e/reports/report.json` i `cucumber-html-report.html`.
