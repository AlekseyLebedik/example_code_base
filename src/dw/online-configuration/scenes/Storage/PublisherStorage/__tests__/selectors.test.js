import * as selectors from '../selectors';

describe('PublisherStorage/selectors', () => {
  const entries = [
    {
      updateTime: 1534762536,
      fileName: 'test.py',
      fileComment: 'comment',
      version: 0,
      fileSize: 8077,
      context: 1,
      groupID: 0,
      fileID: '1',
      createTime: 1534762536,
      fileChecksum: 'df6aacce61067c0d98b4045087ae61a3',
    },
  ];
  const expected = {
    updateTime: 'Aug 20, 2018 01:55 pm EEST',
    fileName: 'test.py',
    fileComment: 'comment',
    version: 0,
    fileSize: 8077,
    context: 1,
    groupID: 0,
    fileID: '1',
    createTime: 'Aug 20, 2018 01:55 pm EEST',
    fileChecksum: 'df6aacce61067c0d98b4045087ae61a3',
  };
  it('validates publisherFilesFormattedSelector', () => {
    expect(
      selectors.publisherFilesFormattedSelector({
        Scenes: { Storage: { PublisherStorage: { entries } } },
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toEqual([expected]);
  });

  it('validates selectedFileFormattedSelector', () => {
    const selectedFile = {
      fileID: '1',
    };

    expect(
      selectors.selectedFileFormattedSelector({
        Scenes: {
          Storage: {
            PublisherStorage: { entries, selectedFile },
          },
        },
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toEqual(expected);
  });
});
