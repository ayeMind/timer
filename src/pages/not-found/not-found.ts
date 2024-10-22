import classes from "./not-found.module.css";

export const pageNotFound = `
    <div class={${classes.page}}>
        <h1 class=${classes.title}>404</h1>
        <h2 class=${classes.subtitle}>Page Not Found</h2>
        <a class=${classes.link} href="/">Create Timer</a>
    </div>
`;