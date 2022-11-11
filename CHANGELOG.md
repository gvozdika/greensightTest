## 3.4.0 (February 16, 2021)

-   Увеличено покрытие тестами
-   Добавлены новые компоненты
-   Добавлены стили админки

## 3.3.0 (January 27, 2021)

-   Добавлены тесты jest + RTL
-   Поднята версия GDS

## 3.2.0 (December 04, 2020)

-   Переезд на manager.js

## 3.1.0 (October 23, 2020)

-   Добавлена обработка неподдерживаемых браузеров: показывается окно с рекомендацией скачать поддерживаемые.

## 3.0.0 (October 22, 2020)

Третий релиз содержит обновление версии storybook, добавлени polished и прочие доработки, которые были применены на боевом проекте.

-   Сторибук обновлен до 6й версии
-   Обновлены версии входящих в состав пакетов
-   Подключен polished
-   Доработан конфиг Prettier
-   Добавлены skeleton лоадеры
-   Пофикшен lint-staged
-   API переехало из скриптов в собственную директорию
-   Доработана loadData
-   Добавлена документация по настройке фавиконок
-   Заменили react-helmet на react-helmet-async

## 2.0.0 (April 3, 2020)

Второй релиз нацелен на перевод на Typescript для повышения удобства работы с системой и повышения строгости при разработке.

### Global

-   Добавлена полноценная поддержка алиасов на уровне приложения и интеграции с редактором
-   Добавлен плагин typescript для yarn, автоматически добавляющий @types при установке зависимостей
-   Добавлен свой ESLint конфиг с поддержкой Typescript, AirBnB более не используется
-   Подключен GDS 2-ой версии, внесены изменения, чтобы поддерживать обновлённый API
-   Использование темы GDS в компонентах-заглушках заменено на использование базовой темы, чтобы при добавлении кастомной темы компоненты не ломались
-   Проверка через tsc добавлена на precommit hook
-   Добавлен npm-run-all для параллельного запуска команд сборки клиентского и северного кода и проверок на precommit hook
-   Добавлены глобальные декларации module.d.ts и global.d.ts. Удалён глобальный index.d.ts.
-   Алиас для декораторов переименован в @decorators
-   Обновлены зависимости

### Components

-   Интерфейсы компонентов перенесены из d.ts в tsx
-   Составные компоненты разбиты на отдельные файлы, прописаны кастомные хуки для контекста и вынесены в отдельные файлы
-   Tooltip объединяет функционал тултипов и дропдаунов. Dropdown удалён
-   Из Rating вынесен функционал статичного рейтинга в отдельный компонент RatingStatic
-   Добавлена поддержка кастомных иконок в Rating
-   Для Tabs добавлены пример с кастомной темой и с переходом на аккордеон на адаптиве
-   List удалён

### Client

-   Весь клиентский код переведён на Typescript
-   Удалён regPriceReplace
-   Удалён неиспользуемый toArray, т.к. он и так есть в helpers

### Server

-   Весь серверный код переведён на Typescript
-   Переработана серверная часть: больше нет корневого индекса, а dev и server чётко разделены. dev запускается через ts-node, prod предварительно переводится в js через отдельный конфиг tsc
-   Удалён webpack-hot-server-middleware, серверный код получается через простой require без hot reload

## Config

-   Конфиги webpack переведены на Typescript
-   Удалены хелперы webpack из config/helpers: insertIf более не нужен, а обработка изображений встроена в конфиг
-   Удалён WebpackBar
-   Убрано дублирование publicPath
-   Удалена настройка pathInfo из webpack

### Storybook

-   Конфигурация Storybook и декораторы переведены на Typescript
-   Документация Storybook перенесена из .storybook/docs в отдельную директорию docs, чтобы не было проблем с валидацией dot-директории
-   Удалены вспомогательные компоненты для вывода сторисов из директории .storybook – все сторисы должны быть самодостаточными
-   Документация пропсов составных компонентов в Storybook заменена с of на components – это заменяет последовательный вывод таблиц на табы
-   Добавлен гайд Typescript, документирующий основные принципы работы с языком
-   Изменён гайд линтинга, чтобы соответствовать лучшему DX при работе с Typescript окружением
-   Удалена кастомная тема Storybook из-за конфликта с Typescript (manager.js/theme.js)
-   Удалён transition из стайлгайдов
-   Мелкие правки стайлгайдов

## 1.4.2 (March 17, 2020)

### Bug fixes

-   Исправлена запись слешей в регулярном выражении конфига, вызывающие кроссплатформенную ошибку

## 1.4.1 (March 6, 2020)

### Bug fixes

-   Залочена версия Storybook для избежания багов альфы
-   Исправлена генерация стилей Storybook
-   Обработаны стили из node_modules
-   Доработана загрузка Swiper
-   Исправлен баг Yup matches

### Removed

-   Удалён cross-env из зависимостей

## 1.4.0 (March 5, 2020)

### Features

-   Добавлена интеграция с New Relic
-   Добавлен гайд по мониторингу и аналитике
-   Команды прода разбиты на сборку и запуск: prod:build (prod:build:server, prod:build:client), prod:serve

### Maintenance

-   redux-starter-kit заменён на @reduxjs/toolkit
-   Обновлены зависимости

## 1.3.1 (March 4, 2020)

### Bug Fixes

-   Отредактирован список yarn файлов в .gitignore

## 1.3.0 (March 3, 2020)

Апдейт нацелен на снижение серверной нагрузки. Основным решением стал переход на yarn v2, что повлекло за собой пересмотр ряда зависимостей.

### Features

-   Проект переведён на yarn v2
-   Новая реализация code splitting на loadable-components: @loadable/babel-plugin @loadable/component @loadable/server @loadable/webpack-plugin mini-css-extract-plugin
-   Добавлены aliases: @components, @containers, @scripts, @images, @icons, @reducers, @standart, @storybook-components, @storybook-decorators
-   Добавлен гайд Package Manager
-   Добавлен sqip-loader (вместо lqip-loader)
-   Добавлен html-minifier-terser (вместо html-minifier)
-   Babel переведён на JSON конфиг
-   Серверный код и код конфигов больше не обрабатывается через Babel
-   Переработаны externals с использованием node-externals
-   Все зависимости приведены к dependencies
-   Storybook переведён на альфу 6-ой версии, т.к. в 5-ой нет встроенной поддержки PnP
-   Установлены отсутствующие peerDependencies: @mdx-js/loader @mdx-js/react @emotion/css @types/react file-loader react-is @storybook/client-api
-   Установлен pnp-webpack-plugin для работы PnP с webpack
-   Установлен eslint-import-resolver-node для разрешения правила import/no-unresolved ESLint

### Maintenance

-   Отключена минификация в Storybook
-   Обновлены зависимости
-   Актуализированы стайлгайды в Storybook

### Removed

-   Удалены зависимости для прошлой реализации code splitting: babel-plugin-universal-import extract-css-chunks-webpack-plugin react-universal-component
-   Удалён хелпер сборки cleanOldAssets
-   Удалён скрипт yarn clean
-   Удалён cross-env
-   Удалён lqip-loader
-   Удалён html-minifier
-   Удалён @babel/plugin-syntax-dynamic-import

## 1.2.1 (February 25, 2020)

### Bug Fixes

-   Исправлены сторисы с упоминанием Link

### Maintenance

-   Добавлен routerDecorator для имитации окружения с роутером

## 1.2.0 (February 21, 2020)

Апдейт нацелен на доработку SEO и роутинга.

### Features

-   Переход с reach-router на react-router v5.1
-   Поддержка robots.txt и sitemap.xml
-   Компонент Seo для загрузки обязательных seo-тегов
-   Поддержка статус кодов
-   Компонент Redirect для редиректов с передачей статуса
-   Новый подход к loadData
-   2 новых гайда: SEO и Router
-   Демонстрация роутинга в приложении

### Maintenance

-   Актуализированы стайлгайды в Storybook

### Removed

-   Компонент Link

## 1.1.0 (February 11, 2020)

### Features

-   Полная интеграция с GDS
-   Поддержка Emotion
-   Декларативный конфиг Storybook 5.3
-   Множество мелких улучшений Storybook
-   Изменение структуры проекта и документации
-   Опция STORYBOOK_INNER для скрытия внутренних сторисов
-   Кнопка из GDS на главной странице!

### Maintenance

-   Переход на Formik 2 на хуках
-   Доработки Accordion/Breadcrumbs
-   Обновление зависимостей

### Removed

-   Интеграция со Stylelint

## 1.0.0 (November 1, 2019)

Первый релиз 🥳
