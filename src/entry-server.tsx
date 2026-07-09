// Build-time prerender entry: renders a route to an HTML string.
// Uses renderToPipeableStream so Suspense/lazy routes fully resolve
// before the HTML is captured (renderToString would emit fallbacks).
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady() {
          const collector = new PassThrough();
          let html = "";
          collector.on("data", (chunk) => (html += chunk));
          collector.on("end", () => resolve(html));
          pipe(collector);
        },
        onError(error) {
          reject(error);
        },
      }
    );
  });
}
