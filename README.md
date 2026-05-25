# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Running on Expo Go

This project is pinned to **Expo SDK 54** on purpose so it runs on the Expo Go app
that's currently in the App Store.

1. Start the dev server, clearing the bundler cache:

   ```bash
   npx expo start -c
   ```

2. Install **Expo Go** from the App Store (iOS) / Play Store (Android).

3. Scan the QR code from the terminal:
   - **iOS:** scan with the built-in Camera app, then tap the banner.
   - **Android:** open Expo Go → "Scan QR code".

   Phone and computer must be on the same Wi-Fi. On locked-down networks, use a
   tunnel instead: `npx expo start --tunnel`.

### Why SDK 54 and not the newest SDK?

Expo Go only supports one SDK version at a time. As of May 2026, the App Store
Expo Go is **SDK 54** — the SDK 55 build is still waiting on Apple's review. Pinning
to SDK 54 lets the app run on a physical iPhone via the stock Expo Go with no extra
setup.

**Important:** don't run `npm i <pkg>@latest` — it installs versions for the wrong
SDK and breaks the dependency tree. Always use `npx expo install <pkg>`, then verify
with `npx expo install --check`.

> `expo-glass-effect` (liquid glass) won't render inside Expo Go; it needs a native
> dev build. It degrades gracefully rather than crashing.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
