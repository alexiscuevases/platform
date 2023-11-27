export interface Tax {
  tax_name: string;
  tax_percentage: number;
  tax_included?: boolean;
}

export interface Taxes {
  [key: string]: Tax[];
}

export type GeneralErrors<Errors> = {
  [key in keyof Errors | "GENERAL_ERROR"]?: any;
};

export interface GeneralResponse<Result, Errors> {
  success: boolean;
  errors?: GeneralErrors<Errors>;
  result?: Result;
}
