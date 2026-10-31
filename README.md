# Testing Talks Hub React App

Aplikacja React (lista kontaktów + playground komponentów MUI) z testami e2e w Cucumber + Playwright w katalogu `e2e/`.

## Wymagania

- Node.js 18 lub nowszy
- Yarn 1 (przez corepack: `corepack enable`, albo przy każdym poleceniu `corepack yarn ...`)
- macOS, Linux albo Windows z Git Bash / WSL (`run_test.sh` to skrypt bash)

## Uruchomienie strony

```bash
yarn install
yarn start
```

Aplikacja wstaje pod http://localhost:3000. Bez otwierania przeglądarki i na innym porcie:

```bash
BROWSER=none PORT=3000 yarn start
```

Stan aplikacji trzymany jest tylko w pamięci, więc odświeżenie strony przywraca dane z `src/contacts.json`.

## Testy e2e

### Instalacja (jednorazowo)

```bash
cd e2e
yarn install
npx playwright install chromium
```

### Uruchomienie

1. W jednym terminalu uruchom aplikację (`yarn start` w katalogu głównym) i poczekaj, aż http://localhost:3000 odpowiada.
2. W drugim terminalu:

```bash
cd e2e
./run_test.sh <środowisko> <profil>
```

| Argument | Wartości | Znaczenie |
|---|---|---|
| środowisko | `localhost`, `production` | adres z `config/hosts.json` i zmienne z `env/<środowisko>.env` |
| profil | `smoke`, `regression`, `dev` | uruchamia scenariusze z tagiem `@smoke`, `@regression` lub `@dev` |

Przykłady:

```bash
./run_test.sh localhost smoke                            # szybki zestaw
./run_test.sh localhost regression                       # pełny zestaw
HEADLESS=true RETRY=0 ./run_test.sh localhost regression # bez okna przeglądarki i bez ponowień
```

Scenariusz otagowany nazwą środowiska (np. `@production`) zostaje pominięty na pozostałych środowiskach.

### Ustawienia

Wartości domyślne są w `e2e/env/common.env`. Zmienna podana przed poleceniem je nadpisuje.

| Zmienna | Domyślnie | Opis |
|---|---|---|
| `HEADLESS` | `false` | `true` uruchamia przeglądarkę bez okna |
| `RETRY` | `1` | liczba ponowień nieudanego scenariusza; `0` przy szukaniu niestabilnych testów |
| `PARALLEL` | `3` | liczba równoległych workerów |
| `UI_AUTOMATION_BROWSER` | `chromium` | `chromium`, `firefox` lub `webkit` (zainstaluj przez `npx playwright install <nazwa>`) |
| `EMULATION` | `browser` | nazwa urządzenia Playwright, np. `iPhone 13` |
| `DEVTOOLS` | `false` | `true` otwiera DevTools (tylko Chromium) |

### Wyniki

- Kod wyjścia `run_test.sh` jest różny od 0, gdy któryś scenariusz padnie.
- `e2e/reports/report.json` to surowy raport Cucumbera.
- `e2e/reports/cucumber-html-report.html` to raport HTML, generowany po nieudanym przebiegu. Dołączone są w nim screenshot, logi konsoli i błędy JS strony.
- `e2e/reports/videos/` i `e2e/reports/screenshots/` zawierają nagrania i zrzuty ekranu scenariuszy.

## Struktura testów

```
e2e/
├── config/
│   ├── hosts.json        # środowiska → adres
│   ├── pages.json        # strony → route + regex URL
│   └── mappings/         # selektory per strona (<strona>.json) + common.json
├── env/                  # common.env + <środowisko>.env
└── src/
    ├── features/         # scenariusze Gherkin (.feature)
    ├── step-definitions/ # generyczne kroki (akcje i assertions/)
    └── support/          # logika Playwrighta wołana przez kroki
```

Selektory trzymamy tylko w `config/mappings/`, najlepiej w postaci `[data-id='...']`. Konwencje i znane pułapki opisuje `.claude/e2e-context.md`.

## Rozwiązywanie problemów

- **`yarn: command not found`**: uruchom `corepack enable`. `run_test.sh` sam przełącza się na `corepack yarn`, ale `yarn start` i `yarn install` tego nie robią.
- **Port 3000 zajęty**: zatrzymaj poprzednią instancję (`lsof -ti :3000 | xargs kill`) albo uruchom aplikację z innym `PORT`. Testy na `localhost` zakładają jednak port 3000.
- **Brak przeglądarki Playwrighta**: w `e2e/` uruchom `npx playwright install chromium`.
- **`No mapping for "x" on page "y"`**: brakuje klucza w `config/mappings/<strona>.json` albo w `common.json`.
