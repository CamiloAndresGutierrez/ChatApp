export interface Obj { [key: string]: any }

export enum Method {
    GET='GET', 
    POST='POST',
    PUT='PUT',
    DELETE='DELETE'
}

export interface RequestArgs {
    endpoint: string,
    method?: Method,
    body?: Obj,
    headers?: Obj
}