import * as selectors from '../selectors';

describe('UserContextStorage/selectors', () => {
  const entries = [
    {
      userName: null,
      updateTime: 1535014434,
      context: 1,
      userID: '6597577775723014259',
      visibility: 1,
      fileName: 'test.py',
      fileSize: 12932,
      accountType: 'x360',
      fileID: '320379',
    },
  ];
  const expected = {
    userName: null,
    updateTime: 'Aug 23, 2018 11:53 am EEST',
    context: 1,
    userID: '6597577775723014259',
    visibility: 1,
    fileName: 'test.py',
    fileSize: '12.93 KB',
    accountType: 'x360',
    fileID: '320379',
  };
  it('validates userContextStorageFilesFormattedSelector', () => {
    expect(
      selectors.userContextStorageFilesFormattedSelector({
        Scenes: { Storage: { UserContextStorage: { entries } } },
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toEqual([expected]);
  });

  it('validates selectedUserContextStorageFileFormattedSelector', () => {
    const selectedFile = {
      fileID: '320379',
    };

    expect(
      selectors.selectedUserContextStorageFileFormattedSelector({
        Scenes: {
          Storage: {
            UserContextStorage: { entries, selectedFile },
          },
        },
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toEqual(expected);
  });
});
