import classes from "./timer.module.css";
import { decodeUnicodeFromBase64 } from "../../utils/base64";

const params = new URLSearchParams(window.location.search);
const title = decodeUnicodeFromBase64(params.get("id") as string);
const date = decodeUnicodeFromBase64(params.get("date") as string);

export const pageTimer = `
    <div class=${classes.page}>
        <h1>Timer</h1>
        <h2>${title}</h2>
        <h2>${date}</h2>
    </div>
`;

