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
