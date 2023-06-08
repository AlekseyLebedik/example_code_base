import { DefaultTheme } from '@material-ui/styles';
import React from 'react';
import { eventStateColors } from '../playpants/components/App/theme';

interface AppTheme {
  abTesting: {
    bg: {
      abTesting: React.CSSProperties['color'];
      active: React.CSSProperties['color'];
      analysis: React.CSSProperties['color'];
      archived: React.CSSProperties['color'];
      config: React.CSSProperties['color'];
      killed: React.CSSProperties['color'];
      proposed: React.CSSProperties['color'];
      approved: React.CSSProperties['color'];
    };
  };
  demonwareEvents: {
    bg: {
      demonwareEvents: React.CSSProperties['color'];
      criticalEvents: React.CSSProperties['color'];
      generalComments: React.CSSProperties['color'];
      incidents: React.CSSProperties['color'];
      maintenance: React.CSSProperties['color'];
    };
  };
  externalEvents: {
    bg: {
      externalEvents: React.CSSProperties['color'];
      holidays: React.CSSProperties['color'];
      'video-games': React.CSSProperties['color'];
      sports: React.CSSProperties['color'];
      pmg: React.CSSProperties['color'];
    };
  };
  activities: {
    thunderpants: {
      live: React.CSSProperties['color'];
      deploy: React.CSSProperties['color'];
      undeploy: React.CSSProperties['color'];
      modify: React.CSSProperties['color'];
      deprecated: React.CSSProperties['color'];
    };
  };
  informationalEvents: {
    bg: typeof eventStateColors & {
      demonware: React.CSSProperties['color'];
      informationalEvents: React.CSSProperties['color'];
      'first-party': React.CSSProperties['color'];
      cdl: React.CSSProperties['color'];
    };
  };
  eventManager: {
    bg: typeof eventStateColors & {
      eventManager: React.CSSProperties['color'];
      grey: React.CSSProperties['color'];
      inherit: React.CSSProperties['color'];
      status: React.CSSProperties['color'];
    };
    palette: {
      red: React.CSSProperties['color'];
      green: React.CSSProperties['color'];
      yellow: React.CSSProperties['color'];
      grey: React.CSSProperties['color'];
      dev: React.CSSProperties['color'];
      cert: React.CSSProperties['color'];
      live: React.CSSProperties['color'];
    };
    taskBg: {
      cancelled: React.CSSProperties['color'];
      failed: React.CSSProperties['color'];
      inProgress: React.CSSProperties['color'];
      succeeded: React.CSSProperties['color'];
      timedOut: React.CSSProperties['color'];
    };
  };
  conflicts: {
    palette: {
      'all-conflict-types': React.CSSProperties['color'];
      'event-overlap': React.CSSProperties['color'];
      'activity-overlap': React.CSSProperties['color'];
      'activity-title-overlap': React.CSSProperties['color'];
      'activity-title-conflict': React.CSSProperties['color'];
      conflictToggleBlock: React.CSSProperties['color'];
    };
  };
  tasks: {
    palette: {
      cancelled: React.CSSProperties['color'];
      failed: React.CSSProperties['color'];
      'in-progress': React.CSSProperties['color'];
      succeeded: React.CSSProperties['color'];
      'timed-out': React.CSSProperties['color'];
    };
  };
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme extends AppTheme, DefaultTheme {}
  // allow configuration using `createMuiTheme`
  interface ThemeOptions extends Partial<AppTheme>, ThemeOptions {}
}
