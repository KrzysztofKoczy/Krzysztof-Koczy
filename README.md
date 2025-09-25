# Zadanie Rekrutacyjne – Etap 1

Aplikacja w Angularze 20 prezentująca listę postów z API [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com). Umożliwia filtrowanie, podgląd szczegółów z modalem, dodawanie do ulubionych oraz cachowanie danych w singleton serwisie opartym o signals.

---

## Funkcjonalności

- Wyświetlanie listy postów (tytuł, fragment treści)
- Filtrowanie po treści, użytkowniku oraz tylko ulubionych
- Modal ze szczegółami posta (pełna treść, autor, komentarze)
- Loader (spinner) przy ładowaniu danych listy i szczegółów
- Responsywny układ kart i filtrów (desktop + mobile)

---

## Stos technologiczny

- Angular 20, standalone components
- Signals do zarządzania stanem + cache w serwisie `PostsStore`
- HttpClient + RxJS do komunikacji z API
- Tailwind CSS (utility classes) + własne SCSS dla komponentów
- Change detection zoneless (`provideZonelessChangeDetection()`)

---

## Jak uruchomić projekt

### Instalacja
```bash
# 1. Sklonuj repozytorium
git clone https://github.com/KrzysztofKoczy/Krzysztof-Koczy.git
cd Krzysztof-Koczy

# 2. Zainstaluj zależności
npm install
```

### Uruchomienie aplikacji
```bash
# z użyciem Angular CLI
ng serve
# lub bez CLI
npm run start
```
Po uruchomieniu aplikacja będzie dostępna pod adresem `http://localhost:4200/`.