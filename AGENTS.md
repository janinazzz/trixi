# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

## SDK version: pinned to 54 (do not bump)

This project is intentionally pinned to **Expo SDK 54**, not the newest SDK.

**Why:** Expo Go on the Apple App Store only ever supports one SDK at a time. As of
May 2026 the App Store build is SDK 54 — the SDK 55 build of Expo Go is still stuck
in Apple review with no confirmed date. Pinning to 54 means the app runs on the
stock App Store Expo Go on a physical iPhone today, with no dev build required.

**Rules:**
- Do **not** upgrade to SDK 55+ unless we deliberately switch off Expo Go (e.g. to a
  dev build / `eas go`). Bumping the SDK breaks Expo Go compatibility again.
- Never run `npm i <pkg>@latest`. It pulls versions for the wrong SDK and breaks the
  dependency tree. Always use `npx expo install <pkg>`, which picks the SDK 54 version.
- After any dependency change, run `npx expo install --check` (must say "up to date").

## Running on Expo Go

```bash
npm install
npx expo start -c      # -c clears the Metro cache (needed after SDK/dep changes)
```

Then scan the QR code with the App Store **Expo Go** app (iOS: Camera app; Android:
Expo Go → Scan QR code). Phone and computer must be on the same Wi-Fi, or use
`npx expo start --tunnel`.

Note: `expo-glass-effect` (liquid glass) does not render inside Expo Go — it needs a
native dev build — but it degrades gracefully rather than crashing.

## App structure

Expo Router file-based routing. Screens live in `src/app/` and global state in
`src/context/`. The `@/*` path alias maps to `src/*` (see `tsconfig.json`).

### Routes (`src/app/`)
- `index.tsx` — redirects to `/home`.
- `start.tsx` — onboarding/login: enters the name, then navigates to `/home`.
- `home.tsx` — greeting + "Tipp des Tages" card. Also exports the shared floating
  `NavBar` and the `NAV_BAR_SPACE` constant (bottom padding to clear the nav bar) —
  import these from `./home` rather than re-implementing.
- `search.tsx`, `searchResult.tsx`, `detail.tsx`, `details-a.tsx` — search flow.
- `bibliothek.tsx` — library; lists tips the user has liked.
- `profile.tsx` — profile + settings list. "Abmelden" opens a confirmation `Modal`;
  confirming clears the name and `router.replace('/start')`.
- `profileSettings.tsx` — editable profile form (Geburtstag, Geschlecht m/w/d, Ort,
  Interessen, Ziele). Interessen/Ziele are add/remove chip lists; the name field
  edits the global name.

### Global state (`src/context/`)
React Context providers, both wrapped around the `Stack` in `app/_layout.tsx`.
- `NameContext.tsx` — `useName()` → `{ name, setName }`. The single source of truth
  for the user's name, shown on home, profile, and editable in profile settings.
- `LibraryContext.tsx` — `useLibrary()` → `{ savedTips, isSaved, toggleTip }`, plus
  the exported `TIP_OF_THE_DAY` example. Liking the tip on home saves it; saved tips
  render as cards in Bibliothek.

State is in-memory only (resets on reload) — no persistence layer yet.

### Conventions
- Styling via `StyleSheet.create`; hairline borders use `#868383`, pills/cards use
  `borderRadius: 20`. Selected toggles invert to a black fill with white text.
- Screens that scroll keep content clear of the floating nav bar with
  `paddingBottom: NAV_BAR_SPACE`.
