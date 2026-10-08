# StoryKeep – konfiguracja synchronizacji z Google Drive

1. https://console.cloud.google.com → nowy projekt.
2. „APIs & Services” → Library → włącz **Google Drive API**.
3. OAuth consent screen: typ External, uzupełnij nazwę i e-mail, w „Test users” dodaj swoje konto Google.
   (Zakres `drive.appdata` – dane trzymane w ukrytym folderze tylko tej aplikacji.)
4. Credentials → Create credentials → **OAuth client ID** → Web application.
   W „Authorized JavaScript origins” wpisz adres aplikacji, np. `https://TWOJ-LOGIN.github.io`
   (do testów lokalnych: `http://localhost:8000`).
5. Skopiuj Client ID, kliknij w aplikacji „Zaloguj przez Google” i wklej go (zapamięta się w przeglądarce).

Hosting: wrzuć `index.html` na GitHub Pages / Cloudflare Pages.
Test lokalny: `python -m http.server 8000` w tym folderze.
Logowanie nie działa z `file://`.

## Serwer pośredniczący (wyszukiwanie ISBN)
Poczytaj.pl i Biblioteka Narodowa nie pozwalają na zapytania prosto z przeglądarki.
1. dash.cloudflare.com → Workers & Pages → Create → Create Worker → nazwa `biblioteka` → Deploy.
2. Edit code → wklej zawartość `worker.js` → Deploy.
3. Skopiuj adres (np. `https://biblioteka.TWOJA-NAZWA.workers.dev`) i wpisz go w `index.html` w stałej `WORKER` (z `/` na końcu).
