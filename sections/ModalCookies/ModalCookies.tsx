import { CSS, TypeScript } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";

export interface ModalCookiesProps {
  /**
   * @title Cookies Scripts
   * @description Only JavaScript codes are allowed
   */
  scripts: TypeScript;

  /**
   * @title Cookies Styles
   * @description Only CSS styles are allowed
   */
  styles: CSS;
}

export default function ModalCookies({ scripts, styles }: ModalCookiesProps) {
  return (
    <Head>
      {scripts.length > 1 && (
        <script
          type="text/javascript"
          id="cookieScripts"
          dangerouslySetInnerHTML={{ __html: scripts }}
        />
      )}
      {styles.length > 1 && (
        <style type="text/css" dangerouslySetInnerHTML={{ __html: styles }} />
      )}
    </Head>
  );
}
