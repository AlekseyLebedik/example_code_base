export interface Activity {
  id: number;
  type: string;
  activity: string;
  title_envs: number[];
  publish_on: string;
  exec_order: number;
  updated_by: {
    id: number;
    name: string;
  };
}

export interface Authorization {
  id: number;
  user: number;
  status: string;
  timestamp: number;
}

export interface Authorizer {
  id: number;
  name: string;
}

export interface Event {
  id: number;
  event_type: string;
  title: string;
  publish_at: number;
  end_at: number;
}

export interface EmEvent extends Event {
  created_at: number;
  created_by: {
    id: number;
    name: string;
  };
  status: string;
  activities: Activity[];
  updated_at: number;
  updated_by: {
    id: number;
    name: string;
  };
  note: string;
  project: number;
  env_type: string;
  authorizations: Authorization[];
  authorizers: Authorizer[];
  locked_by?: number;
  task?: string;
  start: string;
  end: string;
  allDay: boolean;
  type: string;
  auto_tags: string[];
  manual_tags: string[];
  platforms: string[];
}
