import { Person } from "apps/commerce/types.ts";
import { USER_ID } from "../../constants.ts";
import { useScript } from "@deco/deco/hooks";
import { verifySalesChanel } from "./verifySalesChanel.ts";
const onLoad = (jsonID: string) => {
  const script = document.getElementById(jsonID) as HTMLScriptElement;
  window.STOREFRONT.USER.dispatch(JSON.parse(script.innerText));
};
function UserProvider({ user }: { user: Person | null }) {
  return (
    <>
      <script
        async={true}
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(verifySalesChanel, user) }}
      />
      <script
        id={USER_ID}
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(user) }}
      />
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, USER_ID) }}
      />
    </>
  );
}
export default UserProvider;
