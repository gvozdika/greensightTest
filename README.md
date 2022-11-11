# RWBP

![Логотип RWBP](public/logo.svg)

**React Webpack Blank Project** используется в качестве фронтенд-платформы для построения изоморфных веб-приложений на React.

## Goals

1. **Isomorphic App** - изоморфное приложение, которое работает и на клиенте и на сервере
1. **Server Side Rendering** - первичный рендер выполняется на сервере для поддержки SEO и повышения скорости загрузки страниц
1. **Single Page Application** - современное приложение с единой точкой входа и клиентским роутингом
1. **Code Splitting** - разбиение бандла для динамической загрузки только необходимого кода
1. **Dev & Prod Mods** - 2 вида сборки с фокусом на удобство разработки на dev и максимумом производительности на prod
1. **Hot Module Replacement** - обновление страницы без полной перезагрузки при изменении js/css кода в dev mode
1. **Component Driven Development** - разработка статических компонентов в изоляции от основного приложения

## Features

-   📦 Webpack v4
-   😎 React (with hooks support)
-   📕 Storybook with docs addon and mdx support
-   🚀 Full Typescript support
-   🔥 SSR with Express Server
-   🔥 HMR with SSR in dev mode
-   🔥 Code Splitting with React Universal Component
-   🔥 CSS in JS styling with Emotion and Polished
-   ✅ Babel v7 + only needed polyfills
-   ✅ Client Routing with Reach Router
-   ✅ Redux Starter Kit (Redux, Redux-thunk, Reselect, Immer, Redux Devtools)
-   ✅ Linting: ESLint + Prettier
-   ✅ Long term caching
-   ✅ Head management with React Helmet
-   ✅ Unit and integration tests with Jest & RTL

## Usage

Удостоверьтесь, что версии `node` и `yarn` на вашей машине соответствуют версиям из поля `engines` `package.json`.
Управление версиями `node` можно проиводить через [nvm](https://github.com/nvm-sh/nvm) / [nvm-windows](https://github.com/coreybutler/nvm-windows), `yarn` обновляется через скачивание установщика с [их сайта](https://yarnpkg.com/en/docs/install#windows-stable).

❗️️ Для установки зависимостей на проекте используется пакетный менеджер `yarn` - все зависимости ставятся через него, и сохраняются в `package.json`. `npm` параллельно с `yarn` не использовать. Файл `yarn.lock` лежит в репозитории и хранит информацию по загружаемым пакетам.

Установите зависимости через `yarn`:

```
yarn
```

Чтобы у вас работали ESLint/Prettier/Typescript на уровне IDE, необходимо запустить команду:

```bash
yarn pnpify --sdk vscode
```

❗️️ В зависимости от проекта может потребоваться также задать переменные окружения. Для этого необходимо создать файл `.env`. Доступные переменные описаны в `.env.example`, дефолтные значения в `.env.defaults`.

После этого можно использовать команды из списка:

| `yarn <command>`    | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `dev`               | Build app in dev mode and start development server     |
| `dev:measure`       | Start a dev mode with SMP for build time debugging     |
| `eslint`            | Lint all `.js`, `.jsx`, `.ts` and `.tsx` files         |
| `lint-staged`       | `lint-staged` added to scripts to use with `run-p`     |
| `prod`              | Build app in prod mode and start production server     |
| `prod:build`        | Build app in prod mode                                 |
| `prod:build:client` | Build client bundle in prod mode. Used in `prod:build` |
| `prod:build:server` | Build server bundle in prod mode. Used in `prod:build` |
| `prod:measure`      | Start a prod mode with SMP for build time debugging    |
| `prod:tsc`          | Start a prod mode with SMP for build time debugging    |
| `prod:serve`        | Start production server                                |
| `storybook`         | Start a Storybook in dev mode                          |
| `storybook:build`   | Build static Storybook version in `docs` folder        |
| `storybook:serve`   | Run static server to view `docs` folder                |
| `tokens`            | Update tokens from Figma \*                            |
| `tokens:dev`        | Обновляет токены Figma из development проекта          |
| `tsc`               | Run Typescript compiler (noEmit)                       |
| `test`              | Run Jest                                               |
| `test:coverage`     | Run Jest in coverage mode                              |
| `test:watch`        | Run Jest in watch mode                                 |

\* ❗️️ В случае наличия интеграции токенов из Figma (обязательно при использовании иных шрифтов), необходимо добавить импорт токенов в тему `theme.ts` - https://prnt.sc/wope77, и добавить локально шрифты с соответствующими им переменными `fontStyles.ts`
