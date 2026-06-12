# 📱 BBPhones — Интернет-магазин смартфонов

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Полнофункциональное веб-приложение интернет-магазина для продажи мобильных устройств.

---

## 🚀 Демонстрация

Посмотреть живую версию сайта можно по ссылке:
**🔗(https://bbphones.ru/)**

---

## ✨ Ключевые возможности

### 🛒 Для покупателей
* **Интеллектуальный каталог:** Фильтрация, сортировка и удобный поиск смартфонов по характеристикам.
* **Пользовательский профиль:** Безопасная JWT-авторизация, управление личными данными и история заказов.
* **Корзина и отложенные товары:** Удобное управление покупками с использованием глобального стейт-менеджера Zustand.
* **Онлайн-оплата:** Безопасная и быстрая интеграция с платежным шлюзом **ЮKassa**.
* **Отзывы и рейтинги:** Возможность оставлять комментарии и оценивать приобретенные устройства (одна оценка на один товар).

### ⚙️ Для администраторов
* **Изолированная панель управления:** Защищенный доступ к админ-панели.
* **Управление каталогом:** Добавление, редактирование и удаление товаров.
* **Обработка заказов:** Отслеживание статусов платежей и управление логистикой.
* **Аналитика продаж:** Дашборды и статистика для оценки эффективности бизнеса.

---

## 🛠 Технологический стек

* **Frontend:** Next.js, React, TypeScript.
* **Стилизация:** Tailwind CSS.
* **State Management:** Zustand.
* **Backend & API:** Next.js Route Handlers.
* **База данных & ORM:** PostgreSQL + Prisma ORM.
* **Интеграции:** YooKassa API (платежи).

---

## 🚀 Установка и запуск (Локально)

### 1. Клонирование репозитория
    ```bash
    git clone [https://github.com/your-username/bbphones.git](https://github.com/your-username/bbphones.git)
    ```

### 2. **Перейдите в папку проекта:**
   ```bash
   cd bbphones
   ```
     
### 3. **Настройка переменных окружения**

Создайте файл .env в корневой директории проекта и добавьте следующие ключи:

    ```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/bbphones?schema=public"
    JWT_SECRET="your_super_secret_jwt_key"
    YOOKASSA_SHOP_ID="your_shop_id"
    YOOKASSA_SECRET_KEY="your_secret_key"
    ```

### 4. **Инициализация базы данных**
   ```bash
   npx prisma migrate dev --name init
   ```

### 5. **Запуск сервера разработки**
   ```bash
   npm run dev
   ```

Откройте браузер по адресу http://localhost:3000 (или другой порт, указанный в терминале).

---

## 📸 Скриншоты интерфейса

### Главная станица и каталог

![Главная](readmeImages/image.png)

![Каталог](readmeImages/image-1.png)

![Мобильный каталог](readmeImages/image-2.png)

### Профиль

![Профиль](readmeImages/image-3.png)

![Мобильный профиль](readmeImages/image-4.png)

### Админ-панель

![Аналитика](readmeImages/image-5.png)

![Мобильная аналитика](readmeImages/image-6.png)

![Управление](readmeImages/image-7.png)

![Мобильное управление](readmeImages/image-8.png)

---

## 📫 Контакты

- Telegram: https://t.me/sqlerty4
- Email:    sqlerty@yandex.ru