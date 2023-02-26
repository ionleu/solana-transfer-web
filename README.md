# Solana Transfer History

Transfer, display all Solana transactions and details

### Demo

Checkout the demo [here](https://solana-transfer-web.web.app/)

## Highlights

<img src="https://i.ibb.co/mzLk9bN/Screenshot-2023-02-26-at-9-40-07-AM.png" />

### Responsiveness

<img src="https://i.ibb.co/VYkqbxR/Screenshot-2023-02-26-at-9-46-02-AM.png" />

## Summary

- SPA app using React (no server side);
- Pulls data from [devnet Solana](https://api.devnet.solana.com/), using [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter);
- Doesn't use any 3rd party UI components;
- Deployed to https://solana-transfer-web.web.app
- Packages used:
  - React 18.2 with TypeScript;
  - [Bulma CSS](https://bulma.io/) for styling;
  - [Redux Toolkit](https://redux-toolkit.js.org/) for global state management;
  - [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Stylelint](https://stylelint.io/) for automatic enforcement of basic code hygiene;
  - [npm](https://www.npmjs.com/) for package management.

## Local development workflows

| Task           | Command                  |
| -------------- | ------------------------ |
| Run dev server | `npm i && npm run start` |

## Known deficiences

- Using `localStore` as a database to store the user transactions;
- Simple search transaction mechanism;
- No unit tests, E2E tests and stories coverage;
- Hard-coded UI theme, missing light mode support.

## Improvements

- Use Algolia to store the transactions;
- Use Algolia for search feature;
- Implement Storybook for component-centered development;
- Add unit testing using Jest or Playwright;
- Add component testing using Cypress or Playwright;
- Add E2E tests suites that support Solana Wallet;
- Add Vite for bundling/HMR;
- Add conventional commiting rule using hasky;
- Add GitHub actions to follow Git flow branching strategy;
- Add to the GitHub actions reles to run the build, unit testing and Sonar checking.
