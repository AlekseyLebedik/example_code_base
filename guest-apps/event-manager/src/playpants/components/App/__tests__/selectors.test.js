import mockState from 'playpants/testUtils/mockState';

import * as selectors from '../selectors';

describe('App', () => {
  describe('selectors', () => {
    describe('currentUserSelector', () => {
      it('returns user profile', () => {
        const profile = selectors.currentUserSelector(mockState);
        const testProfile = {
          id: 1,
          name: 'Initial User',
          userName: 'username',
          isStaff: true,
          isHijacked: false,
          defaultTitleEnv: {
            id: 1,
            titleId: 1,
            shortType: 'dev',
          },
          timezone: null,
        };
        expect(profile).toEqual(testProfile);
      });
    });

    describe('projectSettingSelector', () => {
      it('returns project settings', () => {
        const projectSettings = selectors.projectSettingsSelector(mockState);
        const testProjectSettings = {
          data: [
            {
              activitySettings: [
                {
                  type: 'motd',
                  enabled: false,
                  name: 'Message of The Day',
                  allow_multi_titles: true,
                  allow_duplication: true,
                  allow_revert: false,
                  context: { is_enabled: false, type: 'title' },
                },
                {
                  type: 'playlist',
                  enabled: false,
                  name: 'Playlists',
                  allow_multi_titles: true,
                  allow_duplication: true,
                  allow_revert: false,
                  context: { is_enabled: false, type: 'title' },
                },
                {
                  type: 'pubvars',
                  enabled: true,
                  name: 'Publisher Variables',
                  allow_multi_titles: false,
                  allow_duplication: true,
                  allow_revert: true,
                  context: { is_enabled: false, type: 'title' },
                  variable_mapping: {
                    LKKNORQKTP: 'mp_xp_mult_scale',
                    MSTMLNKSSO: 'mp_weapon_xp',
                  },
                },
                {
                  type: 'pubstorage',
                  enabled: true,
                  name: 'Publisher Storage',
                  allow_multi_titles: false,
                  allow_duplication: false,
                  allow_revert: true,
                  context: { is_enabled: false, type: 'title' },
                },
                {
                  type: 'pyscript',
                  enabled: true,
                  name: 'Python Script',
                  allow_multi_titles: false,
                  allow_duplication: true,
                  allow_revert: true,
                  context: { is_enabled: false, type: 'title' },
                },
                {
                  type: 'ae',
                  enabled: true,
                  name: 'Achievements Engine',
                  allow_multi_titles: false,
                  allow_duplication: true,
                  allow_revert: true,
                  context: { is_enabled: true, type: 'title' },
                },
                {
                  type: 'publisher_objects',
                  enabled: true,
                  name: 'Publisher Objects',
                  allow_multi_titles: false,
                  allow_duplication: true,
                  allow_revert: true,
                  context: { is_enabled: true, type: 'title' },
                },
              ],
              colorSettings: [
                {
                  title: 1,
                  color: '#e16161',
                },
              ],
              eventSettings: {
                statuses: {
                  scheduled: {
                    allow_delete: true,
                    is_read_only: true,
                    name: 'Scheduled',
                    allow_request_approval: false,
                    allow_open: false,
                    allow_authorization: false,
                    show_authorization: true,
                    allow_cancel: true,
                  },
                  cancelled: {
                    allow_delete: false,
                    is_read_only: true,
                    name: 'Cancelled',
                    allow_request_approval: false,
                    allow_open: false,
                    allow_authorization: false,
                    show_authorization: true,
                    allow_cancel: false,
                  },
                  expired: {
                    allow_delete: false,
                    is_read_only: true,
                    name: 'Expired',
                    allow_request_approval: false,
                    allow_open: false,
                    allow_authorization: false,
                    show_authorization: true,
                    allow_cancel: false,
                  },
                  rejected: {
                    allow_delete: true,
                    is_read_only: true,
                    name: 'Rejected',
                    allow_request_approval: false,
                    allow_open: true,
                    allow_authorization: false,
                    show_authorization: true,
                    allow_cancel: false,
                  },
                  ended: {
                    allow_delete: false,
                    is_read_only: true,
                    name: 'Ended',
                    allow_request_approval: false,
                    allow_open: false,
                    allow_authorization: false,
                    show_authorization: true,
                    allow_cancel: false,
                  },
                  published: {
                    allow_delete: false,
                    is_read_only: true,
                    name: 'Published',
                    allow_request_approval: false,
                    allow_open: false,
                    allow_authorization: false,
                    show_authorization: true,
                    allow_cancel: false,
                  },
                  active: {
                    allow_delete: false,
                    is_read_only: true,
                    name: 'Active',
                    allow_request_approval: false,
                    allow_open: false,
                    allow_authorization: false,
                    show_authorization: true,
                    allow_cancel: true,
                  },
                  open: {
                    allow_delete: true,
                    is_read_only: false,
                    name: 'Open',
                    allow_request_approval: true,
                    allow_open: false,
                    allow_authorization: false,
                    show_authorization: false,
                    allow_cancel: false,
                  },
                  approved: {
                    allow_delete: true,
                    is_read_only: true,
                    name: 'Approved',
                    allow_request_approval: false,
                    allow_open: false,
                    allow_authorization: false,
                    show_authorization: true,
                    allow_cancel: true,
                  },
                  pending: {
                    allow_delete: true,
                    is_read_only: true,
                    name: 'Pending Approval',
                    allow_request_approval: false,
                    allow_open: true,
                    allow_authorization: true,
                    show_authorization: true,
                    allow_cancel: true,
                  },
                },
              },
              globalSettings: {
                is_multicontext: false,
                single_approver: true,
              },
              id: 1,
              platformSettings: ['CROSSPLAY', 'PC', 'PS4', 'SWITCH', 'XB1'],
              notificationSettings: {
                email: {
                  type_settings: {
                    event_cancel: {
                      enabled: false,
                    },
                    event_end: {
                      enabled: true,
                    },
                    event_open: {
                      enabled: true,
                    },
                    event_request_approval: {
                      enabled: false,
                    },
                    event_end_fail: {
                      enabled: true,
                    },
                    event_publish_now: {
                      enabled: false,
                    },
                    event_test: {
                      enabled: true,
                    },
                    event_reject: {
                      enabled: true,
                    },
                    event_publish_fail: {
                      enabled: true,
                    },
                    event_end_now: {
                      enabled: true,
                    },
                    event_approve: {
                      enabled: false,
                    },
                    event_test_fail: {
                      enabled: true,
                    },
                    event_end_success: {
                      enabled: true,
                    },
                    event_publish_success: {
                      enabled: true,
                    },
                    event_expire: {
                      enabled: true,
                    },
                    event_schedule: {
                      enabled: true,
                    },
                    event_publish: {
                      enabled: false,
                    },
                  },
                  address: 'james@gmail.com',
                },
                slack: {
                  type_settings: {
                    event_cancel: {
                      enabled: true,
                    },
                    event_end: {
                      enabled: true,
                    },
                    event_open: {
                      enabled: true,
                    },
                    event_request_approval: {
                      enabled: true,
                    },
                    event_end_fail: {
                      enabled: true,
                    },
                    event_publish_now: {
                      enabled: false,
                    },
                    event_test: {
                      enabled: true,
                    },
                    event_reject: {
                      enabled: true,
                    },
                    event_publish_fail: {
                      enabled: false,
                    },
                    event_end_now: {
                      enabled: true,
                    },
                    event_approve: {
                      enabled: true,
                    },
                    event_test_fail: {
                      enabled: true,
                    },
                    event_end_success: {
                      enabled: true,
                    },
                    event_publish_success: {
                      enabled: true,
                    },
                    event_expire: {
                      enabled: true,
                    },
                    event_schedule: {
                      enabled: true,
                    },
                    event_publish: {
                      enabled: false,
                    },
                  },
                  channel: '#asdf',
                },
              },
              eventTypeSettings: [
                { key: 'event-manager', name: 'Event Manager' },
                { key: 'pmg', name: 'PMG' },
                { key: 'demonware', name: 'Demonware' },
              ],
              calendarPresetsSettings: [
                {
                  value: 'info',
                  label: 'Info',
                  path: 'customTags=%7B%22unspecified%22%3Atrue%2C%22userTags%22%3A%7B%7D%7D&customViewOn=true&datePickerProps=null&eventTimeOffset=0&envTypeFilters=%7B%22Development%22%3Atrue%2C%22Certification%22%3Atrue%2C%22Live%22%3Atrue%2C%22Cross+Environment%22%3Atrue%7D&groupCheckboxes=%7B%22abTesting%22%3A%7B%22active%22%3Afalse%2C%22analysis%22%3Afalse%2C%22archived%22%3Afalse%2C%22config%22%3Afalse%2C%22killed%22%3Afalse%7D%2C%22eventManager%22%3A%7B%22scheduled%22%3Afalse%2C%22cancelled%22%3Afalse%2C%22expired%22%3Afalse%2C%22rejected%22%3Afalse%2C%22ended%22%3Afalse%2C%22published%22%3Afalse%2C%22active%22%3Afalse%2C%22open%22%3Afalse%2C%22approved%22%3Afalse%2C%22pending%22%3Afalse%7D%2C%22informationalEvents%22%3A%7B%22pmg%22%3Atrue%2C%22demonware%22%3Atrue%7D%7D&isCalendarView=true&numberOfDays=31&platformCheckboxes=%7B%22CROSSPLAY%22%3Atrue%2C%22PC%22%3Atrue%2C%22PS4%22%3Atrue%2C%22SWITCH%22%3Atrue%2C%22XB1%22%3Atrue%2C%22Unspecified%22%3Atrue%7D&selectedView=month&showAllColors=true&tagText=&calendarSettingsVersion=1',
                  version: 1,
                },
                {
                  value: 'All sources',
                  label: 'All sources',
                  path: 'customTags=%7B%22unspecified%22%3Atrue%2C%22userTags%22%3A%7B%7D%7D&customViewOn=true&datePickerProps=null&eventTimeOffset=0&envTypeFilters=%7B%22Development%22%3Atrue%2C%22Certification%22%3Atrue%2C%22Live%22%3Atrue%2C%22Cross+Environment%22%3Atrue%7D&groupCheckboxes=%7B%22abTesting%22%3A%7B%22active%22%3Atrue%2C%22analysis%22%3Atrue%2C%22archived%22%3Atrue%2C%22config%22%3Atrue%2C%22killed%22%3Atrue%7D%2C%22eventManager%22%3A%7B%22scheduled%22%3Atrue%2C%22cancelled%22%3Atrue%2C%22expired%22%3Atrue%2C%22rejected%22%3Atrue%2C%22ended%22%3Atrue%2C%22published%22%3Atrue%2C%22active%22%3Atrue%2C%22open%22%3Atrue%2C%22approved%22%3Atrue%2C%22pending%22%3Atrue%7D%2C%22informationalEvents%22%3A%7B%22pmg%22%3Atrue%2C%22demonware%22%3Atrue%7D%7D&isCalendarView=true&numberOfDays=31&platformCheckboxes=%7B%22CROSSPLAY%22%3Atrue%2C%22PC%22%3Atrue%2C%22PS4%22%3Atrue%2C%22SWITCH%22%3Atrue%2C%22XB1%22%3Atrue%2C%22Unspecified%22%3Atrue%7D&selectedView=month&showAllColors=false&tagText=&calendarSettingsVersion=1',
                  version: 1,
                },
              ],
            },
          ],
          loading: false,
          params: {
            project: 1,
          },
        };
        expect(projectSettings).toEqual(testProjectSettings);
      });
    });

    describe('templatesSelector', () => {
      it('returns event templates', () => {
        const templates = selectors.templatesSelector(mockState);
        const testEventTemplates = {
          data: [
            {
              id: 1,
              project: 1,
              created_at: 1567529602,
              updated_at: 1567529602,
              created_by: null,
              updated_by: null,
              duration: 2159538,
              name: 'Event template',
              description: '',
              is_available: true,
              restrict_activities: true,
              source_event: 2,
            },
          ],
          next: null,
          params: {
            project: 1,
          },
          loading: false,
        };
        expect(templates).toEqual(testEventTemplates);
      });
    });

    describe('templatesDataSelector', () => {
      it('returns event templates data', () => {
        const templatesData = selectors.templatesDataSelector(mockState);
        const testTemplatesData = [
          {
            id: 1,
            project: 1,
            created_at: 1567529602,
            updated_at: 1567529602,
            created_by: null,
            updated_by: null,
            duration: 2159538,
            name: 'Event template',
            description: '',
            is_available: true,
            restrict_activities: true,
            source_event: 2,
          },
        ];
        expect(templatesData).toEqual(testTemplatesData);
      });
    });

    describe('templatesLoadingSelector', () => {
      it('returns event templates loading', () => {
        const templatesLoading = selectors.templatesLoadingSelector(mockState);
        const testEventTemplatesLoading = false;
        expect(templatesLoading).toEqual(testEventTemplatesLoading);
      });
    });

    describe('templatesNextSelector', () => {
      it('returns event templates next', () => {
        const value = selectors.templatesNextSelector(mockState);
        const testValue = null;
        expect(value).toEqual(testValue);
      });
    });

    describe('projectSettingsIdSelector', () => {
      it('returns project settings id', () => {
        const value = selectors.projectSettingsIdSelector(mockState);
        const testValue = 1;
        expect(value).toEqual(testValue);
      });
    });

    describe('activitySettingsSelector', () => {
      it('returns activity settings', () => {
        const value = selectors.activitySettingsSelector(mockState);
        const testValue = [
          {
            type: 'motd',
            enabled: false,
            name: 'Message of The Day',
            allow_multi_titles: true,
            allow_duplication: true,
            allow_revert: false,
            context: { is_enabled: false, type: 'title' },
          },
          {
            type: 'playlist',
            enabled: false,
            name: 'Playlists',
            allow_multi_titles: true,
            allow_duplication: true,
            allow_revert: false,
            context: { is_enabled: false, type: 'title' },
          },
          {
            type: 'pubvars',
            enabled: true,
            name: 'Publisher Variables',
            allow_multi_titles: false,
            allow_duplication: true,
            allow_revert: true,
            context: { is_enabled: false, type: 'title' },
            variable_mapping: {
              LKKNORQKTP: 'mp_xp_mult_scale',
              MSTMLNKSSO: 'mp_weapon_xp',
            },
          },
          {
            type: 'pubstorage',
            enabled: true,
            name: 'Publisher Storage',
            allow_multi_titles: false,
            allow_duplication: false,
            allow_revert: true,
            context: { is_enabled: false, type: 'title' },
          },
          {
            type: 'pyscript',
            enabled: true,
            name: 'Python Script',
            allow_multi_titles: false,
            allow_duplication: true,
            allow_revert: true,
            context: { is_enabled: false, type: 'title' },
          },
          {
            type: 'ae',
            enabled: true,
            name: 'Achievements Engine',
            allow_multi_titles: false,
            allow_duplication: true,
            allow_revert: true,
            context: { is_enabled: true, type: 'title' },
          },
          {
            type: 'publisher_objects',
            enabled: true,
            name: 'Publisher Objects',
            allow_multi_titles: false,
            allow_duplication: true,
            allow_revert: true,
            context: { is_enabled: true, type: 'title' },
          },
        ];
        expect(value).toEqual(testValue);
      });
    });

    describe('eventSettingsSelector', () => {
      it('returns event settings', () => {
        const value = selectors.eventSettingsSelector(mockState);
        const testValue = {
          statuses: {
            scheduled: {
              allow_delete: true,
              is_read_only: true,
              name: 'Scheduled',
              allow_request_approval: false,
              allow_open: false,
              allow_authorization: false,
              show_authorization: true,
              allow_cancel: true,
            },
            cancelled: {
              allow_delete: false,
              is_read_only: true,
              name: 'Cancelled',
              allow_request_approval: false,
              allow_open: false,
              allow_authorization: false,
              show_authorization: true,
              allow_cancel: false,
            },
            expired: {
              allow_delete: false,
              is_read_only: true,
              name: 'Expired',
              allow_request_approval: false,
              allow_open: false,
              allow_authorization: false,
              show_authorization: true,
              allow_cancel: false,
            },
            rejected: {
              allow_delete: true,
              is_read_only: true,
              name: 'Rejected',
              allow_request_approval: false,
              allow_open: true,
              allow_authorization: false,
              show_authorization: true,
              allow_cancel: false,
            },
            ended: {
              allow_delete: false,
              is_read_only: true,
              name: 'Ended',
              allow_request_approval: false,
              allow_open: false,
              allow_authorization: false,
              show_authorization: true,
              allow_cancel: false,
            },
            published: {
              allow_delete: false,
              is_read_only: true,
              name: 'Published',
              allow_request_approval: false,
              allow_open: false,
              allow_authorization: false,
              show_authorization: true,
              allow_cancel: false,
            },
            active: {
              allow_delete: false,
              is_read_only: true,
              name: 'Active',
              allow_request_approval: false,
              allow_open: false,
              allow_authorization: false,
              show_authorization: true,
              allow_cancel: true,
            },
            open: {
              allow_delete: true,
              is_read_only: false,
              name: 'Open',
              allow_request_approval: true,
              allow_open: false,
              allow_authorization: false,
              show_authorization: false,
              allow_cancel: false,
            },
            approved: {
              allow_delete: true,
              is_read_only: true,
              name: 'Approved',
              allow_request_approval: false,
              allow_open: false,
              allow_authorization: false,
              show_authorization: true,
              allow_cancel: true,
            },
            pending: {
              allow_delete: true,
              is_read_only: true,
              name: 'Pending Approval',
              allow_request_approval: false,
              allow_open: true,
              allow_authorization: true,
              show_authorization: true,
              allow_cancel: true,
            },
          },
        };
        expect(value).toEqual(testValue);
      });
    });

    describe('platformSettingsSelector', () => {
      it('returns platform settings', () => {
        const value = selectors.platformSettingsSelector(mockState);
        const testValue = ['CROSSPLAY', 'PC', 'PS4', 'SWITCH', 'XB1'];
        expect(value).toEqual(testValue);
      });
    });

    describe('colorSettingsSelector', () => {
      it('returns color settings', () => {
        const value = selectors.colorSettingsSelector(mockState);
        const testValue = [
          {
            title: 1,
            color: '#e16161',
          },
        ];
        expect(value).toEqual(testValue);
      });
    });

    describe('isMissingSettingsSelector', () => {
      it('returns is there is a setting missing', () => {
        const value = selectors.isMissingSettingsSelector(mockState);
        const testValue = false;
        expect(value).toEqual(testValue);
      });
    });

    describe('currentUserIDSelector', () => {
      it('returns current user id', () => {
        const value = selectors.currentUserIDSelector(mockState);
        const testValue = 1;
        expect(value).toEqual(testValue);
      });
    });

    describe('schedulesDataSelector', () => {
      it('returns correctly sorted schedule options', () => {
        const value = selectors.schedulesDataSelector(mockState);
        const testValue = [
          {
            id: 1,
            created_at: 1585683534,
            created_by: {
              id: 1,
              name: 'Initial User',
            },
            name: 'schedule_ps4_default_v1.csv',
            filename: 'schedule_ps4.csv',
            version: 1,
            schedule_type: 'default',
            schedule_file:
              'https://dzqa-storage.s3.amazonaws.com/devzone/playpants_storage/1585683534_9JhNY9lp635TDwTC4yubBTuDUbbAJNLI?AWSAccessKeyId=AKIAJ7QBHV2NGW5NI5UQ&Signature=NUw%2BGLJ6oUbQVUuu3fayBmTc47I%3D&Expires=1595010488',
            project: 1,
          },
        ];
        expect(value).toEqual(testValue);
      });
    });
  });
});
