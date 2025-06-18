# Blog API

Цей проєкт — навчальний приклад реалізації REST API з використанням популярних шаблонів проєктування (design patterns) як на бекенді, так і на фронтенді.

## 🧠 Використані патерни

### 🔁 Для API (Backend)

1. **Repository Pattern**
   - Абстрагує логіку доступу до даних
   - Легко змінити тип сховища (наприклад, з in-memory на базу даних)
   - Полегшує тестування

2. **Strategy Pattern**
   - Дає змогу мати різні стратегії валідації (Basic / Strict)
   - Валідація відокремлена від бізнес-логіки
   - Легко розширювати правила перевірки

3. **Observer Pattern**
   - Реалізовано механізм сповіщення про події (створення, оновлення, видалення постів)
   - Приклади: логування, email-сповіщення
   - Простота додавання нових слухачів

4. **Factory Pattern**
   - Створення стандартизованих відповідей API
   - Єдина структура повідомлень
   - Гнучкість у зміні формату відповіді

5. **Service Layer**
   - Об'єднує бізнес-логіку
   - Координує роботу репозиторіїв, стратегій та фабрик

---

### 💻 Для Frontend

1. **Adapter Pattern**
   - `ApiAdapter` обгортає `axios` і стандартизує роботу з HTTP
   - Централізоване налаштування запитів
   - Гнучка заміна клієнта чи додавання retry логіки

2. **Template Method Pattern**
   - `RequestHandler` — базовий клас для обробки запитів
   - Стандартизована обробка помилок
   - Можна розширювати для специфічних потреб

3. **Factory Pattern**
   - `ViewDataFactory` — централізоване створення даних для `views`
   - Єдина структура для рендеру сторінок
   - Легко масштабувати під нові типи представлення

4. **Command Pattern**
   - Кожна операція (CRUD) — окрема команда
   - Інкапсульована логіка дій
   - Легке тестування, розширення та повторне використання

---

## 📁 Структура проєкту
```text
full-stack-studying/Backend/6.2 Refractored Blog API/
├── src/
│   ├── repositories/
│   │   ├── PostRepository.js          # Абстрактний репозиторій
│   │   └── InMemoryPostRepository.js  # Конкретна реалізація
│   ├── validation/
│   │   ├── PostValidationStrategy.js  # Абстрактна стратегія
│   │   ├── BasicPostValidation.js     # Базова валідація
│   │   └── StrictPostValidation.js    # Сувора валідація
│   ├── factories/
│   │   └── ResponseFactory.js         # Фабрика відповідей
│   ├── services/
│   │   └── PostService.js             # Сервісний шар
│   ├── utils/
│   │   └── Logger.js                  # Утиліти логування
│   └── app.js                         # Основний Express додаток
├── frontend/
│   ├── adapters/
│   │   └── ApiAdapter.js              # Адаптер для API
│   ├── handlers/
│   │   └── RequestHandler.js          # Обробник запитів
│   ├── factories/
│   │   └── ViewDataFactory.js         # Фабрика даних для view
│   ├── commands/
│   │   ├── GetAllPostsCommand.js
│   │   ├── GetPostByIdCommand.js
│   │   ├── CreatePostCommand.js
│   │   ├── UpdatePostCommand.js
│   │   └── DeletePostCommand.js
│   ├── views/
│   │   ├── index.ejs
│   │   ├── modify.ejs
│   │   └── error.ejs
│   └── server.js                      # Frontend сервер
├── package.json
└── README.md
```

## 🚀 Запуск

```bash
npm install
node src/app.js
```
