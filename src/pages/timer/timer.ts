import classes from "./timer.module.css";
import { decodeUnicodeFromBase64 } from "../../utils/base64";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const title = decodeUnicodeFromBase64(params.get("id") as string);
  const titleElement = document.getElementById("title");

  if (titleElement) {
    titleElement.textContent = title;
  }
  
  const date = new Date(decodeUnicodeFromBase64(params.get("date") as string));

  if (new Date() > date) {
    return;
  }

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const millisecondsElement = document.getElementById("milliseconds");

  const initTimer = () => {
    const timeLeft = date.getTime() - Date.now();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
    const seconds = Math.floor(timeLeft / 1000) % 60;

    return { days, hours, minutes, seconds };
  };

  const renderTimer = () => {
    const { days, hours, minutes, seconds } = initTimer();

    daysElement!.textContent = String(days)+" ";
    hoursElement!.textContent = String(hours)+" ";
    minutesElement!.textContent = String(minutes)+" ";
    secondsElement!.textContent = String(seconds)+" ";
  };

  let startTime: number | null = null;

  const animateTimer = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;

    if (progress >= 1000) {
      renderTimer();
      startTime = timestamp;
    }

    requestAnimationFrame(animateTimer);
  };

  const updateMilliseconds = () => {
    millisecondsElement!.textContent = String(
      Math.floor((date.getTime() - Date.now()) % 1000)
    )+" ";
  };

  window.onload = () => {
 
    renderTimer();
    requestAnimationFrame(animateTimer);
    setInterval(updateMilliseconds, 10);
  };
  
});



export const pageTimer = `
    <div class="page">
        <h1 class=${classes.title} id="title"></h1>
        <div class="timer">
            <div class=${classes.timerItem}>
                <span id="days">0</span>
                <span class=${classes.label}>Days</span>
            </div>
            <div class=${classes.timerItem}>
                <span id="hours">0</span>
                <span class=${classes.label}>Hours</span>
            </div>
            <div class=${classes.timerItem}>
                <span id="minutes">0</span>
                <span class=${classes.label}>Minutes</span>
            </div>
            <div class=${classes.timerItem}>
                <span id="seconds">0</span>
                <span class=${classes.label}>Seconds</span>
            </div>
            <div class=${classes.timerItem}>
                <span id="milliseconds">0</span>
                <span class=${classes.label}>Milliseconds</span>
            </div>
        </div>
    </div>
    `;
