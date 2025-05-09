export interface InstitutionalFormBaseProps {
  title: string;
  description: string;
  inputs: InstitutionalFormInputGroupProps[];
  labelSendButton: string;

  /** @title  Entity Name */
  /** @description Entities' name used on Vtex Master Data */
  entityName?: string;

  type?: 1 | 2;
}

export interface InstitutionalFormAllMessageProps {
  success: InstitutionalFormMessageProps;
  error: InstitutionalFormMessageProps;
}

export interface InstitutionalFormInputGroupProps {
  label: string;
  placeholder: string;
  type: "email" | "text" | "tel";

  /** @title  Field Name */
  /** @description Field name used in Vtex Master Data */
  nameOnMasterData: string;
}

export interface InstitutionalFormMessageProps {
  title: string;
  text: string;
}