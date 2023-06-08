import { Event } from './events';

interface State {
  loading: boolean;
  error?: boolean | null;
}

export type AbTest = Event;

export type ExpyTest = Event;

export interface DemonwareEvent extends Event {
  name: string;
  startTime: number;
  endTime: number;
  description: string;
  endpoint: string;
  env_type: string;
}

export interface EventManagerEvent extends Event {
  status: string;
  story?: number;
  project: number;
  projects: number[];
  task?: string;
  manual_tags: boolean;
  is_private: boolean;
  is_deleted: boolean;
  is_manually_locked: boolean;
  is_template: boolean;
  is_restricted: boolean;
  is_schedule: boolean;
  env_type: string;
}

export interface ExternalEventTag {
  id: number;
  tag_type: string;
  value: string;
  created_at: number;
}

export interface ExternalEvent extends Event {
  tags: ExternalEventTag[];
  description: string;
  allDay: boolean;
}

export type InformationalEvent = Event;

export interface AbTests extends State {
  data: AbTest[];
}
export interface ExpyTests extends State {
  data: ExpyTest[];
}
export interface DemonwareEvents extends State {
  data: DemonwareEvent[];
}
export interface EventManagerEvents extends State {
  data: EventManagerEvent[];
}
export interface ExternalEvents extends State {
  data: ExternalEvent[];
}
export interface InformationalEvents extends State {
  data: InformationalEvent[];
}

export interface TimewarpSettings {
  color: string;
}

export interface GamertagGroup {
  id: number;
  name: string;
  timewarp_settings: TimewarpSettings;
}

export interface GamertagGroups extends State {
  data: GamertagGroup[];
}

export interface Schedule {
  events: {
    abTests: AbTests;
    demonwareEvents: DemonwareEvents;
    eventManagerEvents: EventManagerEvents;
    externalEvents: ExternalEvents;
    expyTests: ExpyTests;
    informationalEvents: InformationalEvents;
  };
  gamertagGroups?: GamertagGroups;
}
