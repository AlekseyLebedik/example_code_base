import {
  ServiceEndpoints,
  ServiceKeyMapping,
} from 'dw/online-configuration/constants';
import { CONTEXT_TYPE_TITLE, CONTEXT_TYPE_PLATFORM } from './constants';

export const DEFAULT_TITLE_CONTEXT = '5577';
export const PLATFORM_CONTEXTS = ['5577-ps4', '5577-xb1'];
export const DEFAULT_PLATFORM_CONTEXT = PLATFORM_CONTEXTS[0];

export const mockState = ({
  serviceNames = [],
  titleContext = DEFAULT_TITLE_CONTEXT,
  platformContexts = PLATFORM_CONTEXTS,
  usesMulticontext = true,
  platformEndpoints = [],
  userId,
}) => {
  const selectableContexts = Array.isArray(platformContexts)
    ? platformContexts
    : [platformContexts];
  const services = Array.isArray(serviceNames) ? serviceNames : [serviceNames];
  const usePlatform = Array.isArray(platformEndpoints)
    ? platformEndpoints
    : [platformEndpoints];
  const state = {
    user: {
      projects: [
        {
          titles: [
            {
              id: 5577,
              environments: [
                { shortType: 'dev', options: { is_multicontext: true } },
              ],
            },
          ],
        },
      ],
    },
    Components: {
      App: {
        currentTitleEnv: {
          usesMulticontext,
        },
      },
      ContextSelector: {
        Available: services.reduce(
          (acc, serviceName) => ({
            ...acc,
            [serviceName]: {
              data: [
                ...selectableContexts.map((context, idx) => ({
                  id: idx + 1,
                  name: context,
                  userSelectable: true,
                  type: CONTEXT_TYPE_PLATFORM,
                })),
                {
                  id: selectableContexts.length + 1,
                  name: titleContext,
                  userSelectable: false,
                  type: CONTEXT_TYPE_TITLE,
                },
              ],
            },
          }),
          {}
        ),
        userId,
        Registry: services.reduce(
          (acc, serviceName) => ({
            ...acc,
            [serviceName]: {
              data: Object.values(
                ServiceEndpoints[ServiceKeyMapping[serviceName]]
              ).map(endpoint => ({
                endpoint,
                type: usePlatform.includes(endpoint)
                  ? CONTEXT_TYPE_PLATFORM
                  : CONTEXT_TYPE_TITLE,
              })),
            },
          }),
          {}
        ),
      },
      TitleSelector: {
        currentTitle: { id: 5577 },
        currentEnv: { shortType: 'dev' },
      },
    },
  };
  return state;
};
