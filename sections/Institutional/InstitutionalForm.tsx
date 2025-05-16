import {
  InstitutionalFormBase,
} from "../../components/institutional/Form/InstitutionalFormBase.tsx";
import { useScript } from "@deco/deco/hooks";
import { sendForm } from "../../components/institutional/Form/sendForm.ts";
import { InstitutionalFormMessage } from "../../components/institutional/Form/InstitutionalFormMessage.tsx";
import { InstitutionalFormAllMessageProps, InstitutionalFormBaseProps } from "../../components/institutional/Form/types.ts";

export default function InstitutionalForm({
  title,
  description,
  inputs,
  labelSendButton,
  success,
  error,
  entityName,
  type,
}: InstitutionalFormBaseProps & InstitutionalFormAllMessageProps) {
  const institutionalFormBaseProps = {
    title,
    description,
    inputs,
    labelSendButton,
    type,
  };

  if (!entityName) return null;

  return (
    <>
      <div class="container">
        <InstitutionalFormBase {...institutionalFormBaseProps} />
        <InstitutionalFormMessage
          content={success}
          idString="institutionalFormSuccess"
        />
        <InstitutionalFormMessage
          content={error}
          idString="institutionalFormError"
        />
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(sendForm, entityName),
        }}
      />
    </>
  );
}
