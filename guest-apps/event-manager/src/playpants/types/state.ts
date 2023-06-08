export interface InitialState {
  data: never[];
  nextPageToken?: string;
  next?: string | number;
  params?: never;
  error?: boolean | null;
  loading?: boolean;
}

export interface Action extends InitialState {
  type: string;
  append?: boolean;
}
