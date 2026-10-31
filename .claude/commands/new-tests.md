---
description: Napisz nowe testy e2e zespołem agentów (architekt → weryfikator → programista → weryfikator → tester)
argument-hint: <funkcjonalność / strona / komponent do pokrycia>
---

Napisz nowe testy e2e w `e2e/` dla funkcjonalności: $ARGUMENTS

Jeśli argument jest pusty, porównaj komponenty w `src/` z istniejącymi `e2e/src/features/**`, zaproponuj obszary bez pokrycia i zapytaj mnie, który wybrać.

Kontekst frameworka: `.claude/e2e-context.md`.

## Przepływ
Każdego agenta uruchamiaj narzędziem Agent z odpowiednim `subagent_type`. Agenci startują bez pamięci, więc w prompcie przekaż im wynik poprzedniego etapu. Dłuższy plan zapisz do pliku w scratchpadzie i podaj ścieżkę.

1. **test-architect**: przekaż funkcjonalność do pokrycia, odbierz plan.
2. **test-verifier, runda A**: przekaż ścieżkę do planu.
   - Przy `CHANGES REQUIRED`: poprawki z gotowym tekstem wprowadź do planu sam, a poprawki merytoryczne odeślij do Architekta.
   - Po 2 iteracjach bez `APPROVED` przerwij i zapytaj mnie.
3. **test-programmer**: przekaż zatwierdzony plan.
4. **test-verifier, runda B**: code review diffu względem HEAD i planu. Iteracje jak w kroku 2, poprawki odsyłaj do Programisty.
5. **test-tester**: przekaż listę nowych scenariuszy i plan.
   - FAIL z winy testu odeślij do Programisty, potem znowu runda B i Tester.
   - Błąd aplikacji albo środowiska trafia do raportu.

Decyzje należące do mnie (zakres, zmiany poza testami, np. w konfiguracji lub aplikacji) zbieraj przez AskUserQuestion. Nie podejmuj ich za mnie. Wyjątek: dodawanie brakujących `data-id` (nazwy po angielsku) w `src/` jest z góry zatwierdzone. Architekt planuje je, a Programista wdraża.

## Raport końcowy
- dodane scenariusze i pliki,
- nowe kroki (jeśli są),
- wyniki: tabela 3 przebiegów, smoke, test mutacyjny,
- otwarte problemy: braki w aplikacji, ryzyka, sprawy środowiskowe.

Nie commituj.
