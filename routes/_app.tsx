import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "@deco/deco/hooks";
import { Context } from "@deco/deco";
const serviceWorkerScript = () =>
  addEventListener(
    "load",
    () =>
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.register("/sw.js"),
  );
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Custom Fonts */}

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: "Neuro";
              font-weight: 200;
              src: url(${asset("/fonts/F37Neuro-Thin.woff2")}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 200;
              font-style: italic;
              src: url(${asset(
                "/fonts/F37Neuro-ThinItalic.woff2"
              )}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 300;
              src: url(${asset("/fonts/F37Neuro-Light.woff2")}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 300;
              font-style: italic;
              src: url(${asset(
                "/fonts/F37Neuro-LightItalic.woff2"
              )}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 400;
              font-display: swap;
              src: url(${asset(
                "/fonts/F37Neuro-Regular.woff2"
              )}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 400;
              font-style: italic;
              src: url(${asset(
                "/fonts/F37Neuro-RegularItalic.woff2"
              )}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 500;
              src: url(${asset(
                "/fonts/F37Neuro-Medium.woff2"
              )}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 500;
              font-style: italic;
              src: url(${asset(
                "/fonts/F37Neuro-MediumItalic.woff2"
              )}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 600;
              src: url(${asset(
                "/fonts/F37Neuro-SemiBold.woff2"
              )}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 600;
              font-style: italic;
              src: url(${asset(
                "/fonts/F37Neuro-SemiBoldItalic.woff2"
              )}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 700;
              src: url(${asset("/fonts/F37Neuro-Bold.woff2")}) format('woff2');
            }
            @font-face {
              font-family: "Neuro";
              font-weight: 700;
              font-style: italic;
              src: url(${asset(
                "/fonts/F37Neuro-BoldItalic.woff2"
              )}) format('woff2');
            }
          `,
          }}
        />
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});