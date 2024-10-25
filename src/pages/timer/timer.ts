import classes from "./timer.module.css";
import { decodeUnicodeFromBase64 } from "../../utils/base64";

const onTimerLoaded = () => {
  const params = new URLSearchParams(window.location.search);
  const title = decodeUnicodeFromBase64(params.get("id") as string);

  const page = document.getElementById("page");

  if (page) {
    page.style.display = "block";
  }

  const titleElement = document.getElementById("title");

  if (titleElement) {
    titleElement.textContent = title;
  }

  const color = "#" + params.get("color");
  if (color) {
    document.getElementById("page")!.style.color = color;
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

  let startTime: number | null = null;

  const animateTimer = (timestamp: number) => {
    if (!startTime) startTime = timestamp;

    const timeLeft = date.getTime() - Date.now();

    if (timeLeft <= 0) {
      daysElement!.textContent = "0 ";
      hoursElement!.textContent = "0 ";
      minutesElement!.textContent = "0 ";
      secondsElement!.textContent = "0 ";
      millisecondsElement!.textContent = "0 ";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
    const seconds = Math.floor(timeLeft / 1000) % 60;
    const milliseconds = Math.floor(timeLeft % 1000);

    daysElement!.textContent = String(days) + " ";
    hoursElement!.textContent = String(hours) + " ";
    minutesElement!.textContent = String(minutes) + " ";
    secondsElement!.textContent = String(seconds) + " ";
    millisecondsElement!.textContent = String(milliseconds) + " ";

    requestAnimationFrame(animateTimer);
  };

  window.onload = () => {
    requestAnimationFrame(animateTimer);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/timer") {
    onTimerLoaded();
  }
});


export const pageTimer = `
    <div class=${classes.page} id="page">
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