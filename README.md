# Юнита 🏫

<div align="center">
  <a href="https://xn--80apodojx0e.xn--p1ai/">
    <img src="public/unita_logo.jpg" alt="Logo" width="694" height="330">
  </a>
</div>

## Описание проекта 📝

**Юнита** — удобное веб-приложение для частной школы **Юнита**.
Главные функции:

- Выставление и просмотр оценок – для учеников, учителей и администраторов школы.
- Просмотр расписания по учебным группам.
- Быстрое взаимодействие между преподавателями, учащимися и администрацией школы.

🎯 Цель — упростить образовательный процесс и сделать систему удобной и понятной для всех участников.

## Установка и запуск 🚀

### Требования ⚙️

- Node.js >= 18.0.0
- NPM или Yarn
- База данных (PostgreSQL 🐘 и Minio S3 📦)

### Установка 🛠️

1. Клонируйте репозиторий:

```bash
git clone https://gitverse.ru/studentlabs/unita_client.git
```

2. Установите зависимости:

```bash
npm install
# или
yarn install
```

3. Настройте переменные окружения:
   Создайте файл `.env` и добавьте в него параметры подключения к БД и другим сервисам. 🔑

4. Запустите сервер:

```bash
npm run dev
# или
yarn dev
```

После запуска откройте в браузере:

```
http://localhost:3000
```

## Примеры использования 💡

- Ученик может войти в личный кабинет и просмотреть свои оценки по всем предметам. 🧑‍🎓 ➡️ 💯
- Учитель может быстро выставлять оценки. 🧑‍🏫 ➡️ 💯
- Пользователи могут просмотривать своё расписания занятий.
- Выкладывание и удаление учебных материалов(расписание, учебный план), личных достижений

Проект разработан для упрощения взаимодействия между учителями, учениками и администрацией частной школы.

## Контакты авторов 🧑‍💻

- Егор Трукан — yegortrukan@mail.ru — [Gitverse](https://gitverse.ru/KorolEzhey)
- Пётр Гончаров — ewrdt43r@gmail.com — [GitVerse](https://gitverse.ru/Laprizz)
- Яна Бобнева — bobneva.y@mail.ru — [GitVerse](https://gitverse.ru/BobnevaY)

## Статус проекта 🛠️

В разработке 🚧

## Документация 📑

### Стек

[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![TailWind][TailWind]][TailWind-url]
[![MobX][MobX]][MobX-url]
[![Axios][Axios]][Axios-url]

### Согласования

#### Переменные

TypeScript:

1. camelCase для переменных.

```
let userFirstName: string = "Иван";
const maxItemsPerPage: number = 10;
```

2. UPPER_SNAKE_CASE для констант.

```
const API_URL: string = "https://example.com/api";
```

3. Булевы переменные: Начинайте с is, has, should или can.

```
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;
```

SCSS:

1. kebab-case: Разделяйте слова дефисами.

```
$primary-color: #007bff;
$font-size-base: 16px;
```

Next.js (общие рекомендации):
Переменные окружения: Используйте UPPER*SNAKE_CASE с префиксом NEXT_PUBLIC* для переменных, доступных в браузере.

```
// .env.local
NEXT_PUBLIC_API_URL=https://example.com/api
```

Компоненты: Называйте компоненты с большой буквы и используйте PascalCase.

```
function MyComponent() {
  return <div>Hello world!</div>;
}
```

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-%23072f61?style=for-the-badge&logo=Typescript
[TypeScript-url]: https://www.typescriptlang.org/docs/
[TailWind]: https://img.shields.io/badge/TailWind-%23ffffff?style=for-the-badge&logo=tailwindcss
[TailWind-url]: https://tailwindcss.com/
[MobX]: https://img.shields.io/badge/MobX-%23ffc730?style=for-the-badge&logo=mobx
[MobX-url]: https://mobx.js.org/
[Axios]: https://img.shields.io/badge/Axios-%235A29E4?style=for-the-badge&logo=axios
[Axios-url]: https://axios-http.com/
