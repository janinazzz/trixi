# Trixi

Trixi is a small mobile app made with Expo and React Native. It shows tips
("Tipp des Tages"), lets you search them by category and save the ones you like
in your library. It's a student project, so it's still work in progress.

## What it can do

- Start screen where you type your name
- Home with a greeting and the tip of the day
- Search with categories (Rezepte, Events, Haushalt, Hobbies, Gesundheit)
- Bibliothek (library) with saved tips and a filter
- Profile with some settings (calendar sync, logout, ...)

The bottom bar (search / home / library) is custom, the routing is done with
expo-router (file-based, one file per screen in `src/app`).

## How to run it

You need Node and the Expo Go app on your phone.

```bash
npm install
npx expo start -c
```

Then scan the QR code from the terminal:

- iPhone: scan it with the normal Camera app
- Android: open Expo Go and scan it there

Your phone and your laptop have to be on the same Wi-Fi. If that doesn't work,
try `npx expo start --tunnel`.

### About the Expo SDK version

We are on Expo SDK 54 on purpose. The Expo Go app in the App Store only supports
one SDK at a time, and right now (May 2026) that's 54 — the SDK 55 version is
still waiting to be approved by Apple. So 54 is the one that actually runs on a
real iPhone without extra setup.

Because of that: don't install stuff with `npm i something@latest`, it pulls the
version for the wrong SDK and breaks the project. Use `npx expo install something`
instead and check with `npx expo install --check`.

(Small thing: `expo-glass-effect` doesn't render inside Expo Go, it needs a real
dev build, but it doesn't crash the app.)

## Folder structure

```
src/app/          the screens (file-based routing)
  start.tsx       enter your name
  home.tsx        home + the shared NavBar
  search.tsx      search + categories
  bibliothek.tsx  saved tips
  profile.tsx     profile + settings
  ...
assets/images/    icons and images
```

## Built with

- Expo SDK 54 / React Native
- expo-router
- TypeScript
