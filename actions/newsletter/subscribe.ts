import { SUBDOMAIN } from "../../routes/utils/_constant.ts";

export interface Props {
  email: string;
  name?: string;
}

const action = async (
  props: Props,
  _req: Request,
): Promise<Response> => {
  const {
    email,
    name = "",
  } = props;

  const data = { email, name };

  const response = await fetch(`${SUBDOMAIN}/api/dataentities/NL/documents/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(data),
  })

  return response;
};

export default action;