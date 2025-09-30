"use client";
import { useState, useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Анимация основного модального окна
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Закрытие по ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Состояние для уведомления
  const [notification, setNotification] = useState(null);

  // Эффект для скрытия уведомления через 3 секунды
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Функция закрытия модалки + очистка формы
  const handleClose = () => {
    setText("");
    setFile(null);
    onClose();
  };

  if (!isVisible && !isOpen && !notification) return null;

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !file) {
      setNotification({ type: "error", message: "Заполните все поля" });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("text", text);
      formData.append("file", file);

      const res = await fetch("/api/bulka", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ошибка сервера");
      }

      // Успешно: закрываем основное окно и показываем уведомление
      handleClose();
      setTimeout(() => {
        setNotification({
          type: "success",
          message: "Данные успешно отправлены!",
        });
      }, 350);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setNotification({
        type: "error",
        message: "Ошибка при отправке данных",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {(isVisible || isOpen) && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.show : styles.hide}`}
          onClick={handleClose}
        >
          <div
            className={`${styles.modal} ${isOpen ? styles.modalShow : styles.modalHide}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.title}>Модальное окно</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                placeholder="Введите текст"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.input}
              />

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className={styles.fileInput}
              />

              <div className={styles.buttons}>
                <button type="button" onClick={handleClose} className={styles.cancel}>
                  Отмена
                </button>
                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? "Отправка..." : "Отправить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {notification && (
        <div className={styles.notificationOverlay}>
          <div className={`${styles.notification} ${styles[notification.type]}`}>
            {notification.message}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
