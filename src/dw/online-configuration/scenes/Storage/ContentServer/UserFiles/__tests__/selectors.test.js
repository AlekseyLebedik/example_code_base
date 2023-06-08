import * as selectors from '../selectors';

describe('ContentServer/UserFiles/selectors', () => {
  const entries = [
    {
      category: 1,
      updateTime: 1534763563,
      fileLocation: '',
      summaryFileSize: 0,
      fileSlot: 1,
      fileName: 'test.txt',
      primaryWebServer: 'default',
      fileSize: 78,
      metaDataSize: 0,
      ownerID: '1454955653078624347',
      primaryServerType: 2,
      metaData: '',
      createTime: 1534763563,
      fileID: '544539',
    },
  ];
  const expected = {
    category: 1,
    updateTime: 'Aug 20, 2018 02:12 pm EEST',
    fileLocation: '',
    summaryFileSize: 0,
    fileSlot: 1,
    fileName: 'test.txt',
    primaryWebServer: 'default',
    fileSize: '78 bytes',
    metaDataSize: 0,
    ownerID: '1454955653078624347',
    primaryServerType: 2,
    metaData: '',
    createTime: 'Aug 20, 2018 02:12 pm EEST',
    fileID: 544539,
  };
  it('validates userFilesFormattedSelector', () => {
    expect(
      selectors.userFilesFormattedSelector({
        Scenes: {
          Storage: { ContentServer: { UserFiles: { entries } } },
        },
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toEqual([expected]);
  });

  it('validates selectedUserFileFormattedSelector', () => {
    const selectedFile = {
      fileID: '544539',
    };

    expect(
      selectors.selectedUserFileFormattedSelector({
        Scenes: {
          Storage: {
            ContentServer: {
              UserFiles: { entries, selectedFile },
            },
          },
        },
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toEqual(expected);
  });
});
