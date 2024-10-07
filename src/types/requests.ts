export interface Obj<TValue> {
  [id: string]: TValue;
}

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface RequestArgs {
  endpoint: string;
  method?: Method;
  body?: Obj<any>;
  headers?: Obj<any>;
}
