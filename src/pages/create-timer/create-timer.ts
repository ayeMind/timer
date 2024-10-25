import classes from "./create-timer.module.css";
import { encodeUnicodeToBase64 } from "../../utils/base64";

const onCreateTimerLoaded = () => {
  const form = document.querySelector<HTMLFormElement>("form");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    if (title.length > 100) {
      const errorLabel = document.getElementById("error");
      if (errorLabel) {
        errorLabel.textContent = "Title must be less than 100 characters";
        return;
      }
    }
    const date = formData.get("date") as string;
    const color = formData.get("color") as string;

    const encodedTitle = encodeUnicodeToBase64(title);
    const encodedDate = encodeUnicodeToBase64(date);

    const url = `/timer?id=${encodedTitle}&date=${encodedDate}&color=${color.slice(
      1 // Remove the leading #
    )}`;
    window.location.href = url;
  });
};

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/") {
        onCreateTimerLoaded();
    }
})

export const pageCreateTimer = `
    <div class=${classes.page}>
        <h1>Create Timer</h1>
        <form class=${classes.form}>
            <div class=${classes.inputContainer}>
                <label class=${classes.label} for="title">Title</label>
                <textarea class=${
                  classes.textarea
                } type="text" id="title" name="title" placeholder="Death of the Universe" required></textarea>
                <label id="error" class=${classes.error} for="title"></label>
            </div>

            <div class=${classes.inputContainer}>
                <label class=${classes.label} for="date">Date</label>
                <input class=${
                  classes.input
                } type="datetime-local" id="date" name="date" value=${new Date()
  .toISOString()
  .substring(0, 16)} />
            </div>

            <div class=${classes.colorContainer}>
                <label class=${classes.label} for="color">Text color</label>
                <input class=${
                  classes.colorInput
                } type="color" value="#8b0000" id="color" name="color" />
            </div>

            <button class=${classes.button} type="submit">Create</button>
        </form>
    </div>
`;
