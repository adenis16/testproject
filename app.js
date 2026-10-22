/**
 * Погодный помощник — связка кнопки на странице с виджетом чата
 * Yandex AI Studio (window.AiStudioChatWidget).
 *
 * Скрипт виджета подключён с атрибутом async, поэтому глобальный объект
 * появляется не сразу. Открываем чат только после загрузки виджета.
 */
(function () {
  "use strict";

  var READY_TIMEOUT = 15000; // мс ожидания загрузки виджета
  var POLL_INTERVAL = 100; // мс между проверками

  var button = document.querySelector("[data-open-chat]");
  var status = document.querySelector("[data-chat-status]");

  function getWidget() {
    return window.AiStudioChatWidget || null;
  }

  function setLoading(isLoading) {
    if (!button) return;
    button.classList.toggle("is-loading", isLoading);
    button.disabled = isLoading;
  }

  function setStatus(text) {
    if (status) status.textContent = text;
  }

  /** Вызывает метод виджета, дожидаясь его готовности. */
  function whenReady(callback, onTimeout) {
    if (getWidget()) {
      callback(getWidget());
      return;
    }

    var elapsed = 0;
    var timer = setInterval(function () {
      elapsed += POLL_INTERVAL;

      if (getWidget()) {
        clearInterval(timer);
        callback(getWidget());
      } else if (elapsed >= READY_TIMEOUT) {
        clearInterval(timer);
        if (onTimeout) onTimeout();
      }
    }, POLL_INTERVAL);
  }

  function openChat() {
    setLoading(true);
    setStatus("Загружаем чат…");

    whenReady(
      function (widget) {
        setLoading(false);
        setStatus("Отвечает онлайн-ассистент");
        try {
          widget.openChat();
        } catch (error) {
          console.error("Не удалось открыть чат:", error);
          setStatus("Не удалось открыть чат, обновите страницу");
        }
      },
      function () {
        setLoading(false);
        setStatus("Чат не загрузился — проверьте подключение к интернету");
      }
    );
  }

  if (button) {
    button.addEventListener("click", openChat);
  }

  // Показываем, что виджет готов, когда он подгрузится.
  whenReady(function () {
    if (button) button.disabled = false;
    setStatus("Отвечает онлайн-ассистент");
  });
})();
