import classes from "./create-timer.module.css";
import { encodeUnicodeToBase64 } from "../../utils/base64";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>("form");
  console.log(form);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;

    const encodedTitle = encodeUnicodeToBase64(title);
    const encodedDate = encodeUnicodeToBase64(date);

    const url = `/timer?id=${encodedTitle}&date=${encodedDate}`;
    window.location.href = url;

  });
});

export const pageCreateTimer = `
    <div class=${classes.page}>
        <h1>Create Timer</h1>
        <form class=${classes.form}>
            <div class=${classes.inputContainer}>
                <label class=${classes.label} for="title">Title</label>
                <textarea class=${classes.textarea} type="text" id="title" name="title" placeholder="Death of the Universe"></textarea>
            </div>

            <div class=${classes.inputContainer}>
                <label class=${classes.label} for="date">Date</label>
                <input class=${classes.input} type="date" id="date" name="date" />
            </div>

            <button class=${classes.button} type="submit">Create</button>
        </form>
    </div>
`;
