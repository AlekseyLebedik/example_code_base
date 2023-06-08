export const statelessGroupStoriesProps = {
  baseUrl: '',
  currentProject: {},
  eventDetailData: {},
  match: {},
  selectedGroupStory: {},
};

export const groupStoriesDetailProps = {
  currentProject: {},
  eventManagerStoryEventsData: [],
  eventManagerStoryEventsError: {},
  eventManagerStoryEventsLoading: true,
  informationalStoryEventsData: [],
  informationalStoryEventsError: {},
  informationalStoryEventsLoading: true,
  infoTypes: [],
  onFetchEventManagerEvents: jest.fn(),
  onFetchInformationalEvents: jest.fn(),
  onResetGroupStoriesDetail: jest.fn(),
  selectedGroupStory: {},
};

export const groupStoriesSidebarProps = {
  baseUrl: '',
  currentProject: {},
  handleSetSelectedGroupStory: jest.fn(),
  match: { params: { storyId: 1 } },
  onDeleteThenRedirect: jest.fn(),
  onFetchAllGroupStoryEvents: jest.fn(),
  onFetchGroupStoryThenSelect: jest.fn(),
  onResetGroupStoriesSidebar: jest.fn(),
  onSearch: jest.fn(),
  onShowMore: jest.fn(),
  searchedGroupStoriesData: [],
  searchedGroupStoriesLoading: true,
  searchedGroupStoriesNext: '',
  selectedGroupStory: {},
};

export const deleteStoryMessageProps = {
  allGroupStoryEventsData: [],
  openDeletableEventDetail: jest.fn(),
  onSetSelectedThenOpen: jest.fn(),
  onRemoveGroupStoryFromEvent: jest.fn(),
};

export const groupStoryFormDialogProps = {
  action: '',
  currentProject: {},
  form: '',
  handleSubmit: jest.fn(),
  icon: '',
  initialValues: {},
  onCancel: jest.fn(),
  onCreateGroupStory: jest.fn(),
  onPatchGroupStory: jest.fn(),
  title: '',
};

export const groupStoryFormProps = {
  asyncValidating: false,
  onSubmit: jest.fn(),
};

export const listItemProps = {
  currentProject: {},
  item: {},
  onClick: jest.fn(),
  onDeleteThenRedirect: jest.fn(),
  selectedGroupStory: {},
};
