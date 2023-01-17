# Norigin media frontend test

Since I didn't have the full week data, I reimagined the EPG design using a custom look & feel.

I've used Vite as dev environment and production bundler. For unit testing I've added Vitest because it comes handy when already using Vite.

This package has this available commands:

- `npm run start` -> Tweaks the mock api and starts both the API server and the dev environment
- `npm run start:mock-api` -> Starts the API server
- `npm run dev` -> Starts the dev environment
- `npm run build` -> Creates a production ready bundle
- `npm run preview` -> Starts a server using the previous build
- `npm run test` -> Uses vitest to run all unit tests
- `npm run coverage` -> Creates a coverage folder with detailed coverage info for unit tests

## Installation

Run `npm install` to install all dependencies first

## How to start

Simply run `npm run start` and go to https://localhost:3000

## Features

- Dev environment with real time updates
- Dev & production builds (Vite uses esbuild under the hood)
- React + TypeScript
- Tailwind CSS
- Unit tests & coverage using Vitest
- Web + SmartTV EPG reusing the same components

## JS Libraries

- React router -> to manage navigation
- React query -> to control async ops like http requests
- Axios -> http client
- Date-fns -> date utilities
- norigin-spatial-navigation -> to handle keyboard focus & navigation
- Headless UI -> to create simple transitions
