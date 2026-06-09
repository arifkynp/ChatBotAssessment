/* @refresh reload */
import { render } from "solid-js/web";
import { Providers } from "./app/Providers";
import { Router } from "./app/Router";
import "./index.css";

const root = document.getElementById("solid-root");

if (root) {
  render(
    () => (
      <Providers>
        <Router />
      </Providers>
    ),
    root!,
  );
} else {
  console.warn("No #solid-root on this page — SolidJS not mounted.");
}
