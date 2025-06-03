import { Person } from "apps/commerce/types.ts";

export async function verifySalesChanel(user: Person | null) {
  const VTEX_COOKIE_NAME = "VTEXSC";
  const USER_COOKIE_NAME = "USERINFO";

  const getCookieValue = (name: string): string | undefined => {
    const cookieValue = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.split("=");

    if (!cookieValue) return;

    return cookieValue.slice(1).join("=");
  };

  const setCookie = (key: string, value: string) => {
    const maxAge = 60 * 60;
    document.cookie = `${key}=${value}; max-age=${maxAge}; path=/`;
  };

  const cookieSalesChanel = getCookieValue(VTEX_COOKIE_NAME);
  const cookieUser = getCookieValue(USER_COOKIE_NAME);

  if (!user) {
    let changed = false;

    if (cookieSalesChanel !== "sc=1") {
      setCookie(VTEX_COOKIE_NAME, "sc=1");
      changed = true;
    }

    if (cookieUser !== "null") {
      setCookie(USER_COOKIE_NAME, "null");
      changed = true;
    }

    if (changed) {
      window.location.reload();
    }
    return;
  }

  if (!cookieUser || cookieUser === "null") {
    try {
      const response = await fetch(
        `/_v/getsaleschannelinfo?email=${user.email}`
      );
      if (!response.ok) {
        console.error(
          `Failed to fetch sales channel info: ${response.statusText}`
        );
        return;
      }

      const data = await response.json();
      const salesChannel = data?.saleschanel ?? "1";

      setCookie(VTEX_COOKIE_NAME, `sc=${salesChannel}`);
      setCookie(USER_COOKIE_NAME, JSON.stringify(user));
      window.location.reload();
    } catch (error) {
      console.error("Error fetching sales channel info:", error);
    }
  }
}
