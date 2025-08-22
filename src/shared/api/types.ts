import type { AxiosResponse } from "axios";

export type Endpoint<P, R> = (params: P) => Promise<AxiosResponse<R>>;
