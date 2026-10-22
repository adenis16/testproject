# Погодный помощник

Небольшой веб-интерфейс для чат-бота, который отвечает на вопросы о погоде.
Вся логика диалога живёт в виджете **Yandex AI Studio** — страница только
подключает его и оформляет точку входа.

## Файлы

| Файл | Назначение |
| --- | --- |
| `index.html` | Разметка страницы и подключение виджета |
| `styles.css` | Оформление интерфейса (светлая и тёмная темы) |
| `app.js` | Кнопка «Открыть чат» ↔ `window.AiStudioChatWidget` |

## Запуск

Достаточно открыть `index.html` в браузере. Для корректной работы iframe
виджета удобнее локальный сервер:

```powershell
# Python 3
python -m http.server 8080
# затем откройте http://localhost:8080
```

## Как это работает

Скрипт виджета подключается в `index.html`:

```html
<script
  src="https://widget.aistudio.yandexcloud.net/scripts/widget-loader.js?channel-id=aac4l9mnuror24bi0n68"
  data-locale="ru"
  async
></script>
```

Виджет сам создаёт плавающую кнопку в правом нижнем углу. Дополнительно
кнопка на странице открывает чат через публичный API виджета:

```js
window.AiStudioChatWidget.openChat();  // openChat / closeChat / destroy
```

## Настройка

- **Тема виджета** задаётся CSS-переменными в `styles.css`
  (`--ai-studio-chat-widget-trigger-*`, `--ai-studio-chat-widget-container-*`).
- **Позиция** кнопки — атрибутом `data-position="bottom-left"` у тега скрипта
  (по умолчанию правый нижний угол).
- **Язык** — `data-locale="ru"` или `data-locale="en"`.
