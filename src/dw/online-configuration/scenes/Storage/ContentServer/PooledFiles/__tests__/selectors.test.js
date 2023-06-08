import * as selectors from '../selectors';

describe('ContentServer/PooledFiles/selectors', () => {
  const entries = [
    {
      category: 3,
      updateTime: 1534763650,
      fileLocation: 'http://contentserver:80/pooled/aaa/1/',
      tags: [],
      summaryFileSize: 8077,
      createTime: 1534763650,
      fileName: 'test.txt',
      volume: 10,
      primaryWebServer: 'default',
      storageMod: 1,
      fileSize: 78,
      metaDataSize: 0,
      primaryServerType: 2,
      fileID: '1',
      uploadedBy: '8408819293539934111',
      numParts: 0,
      metaData: '',
    },
  ];
  const expected = {
    category: 3,
    updateTime: 'Aug 20, 2018 02:14 pm EEST',
    fileLocation: 'http://contentserver:80/pooled/aaa/1/',
    tags: [],
    summaryFileSize: 8077,
    createTime: 'Aug 20, 2018 02:14 pm EEST',
    fileName: 'test.txt',
    volume: 10,
    primaryWebServer: 'default',
    storageMod: 1,
    fileSize: '78 bytes',
    metaDataSize: 0,
    primaryServerType: 2,
    fileID: 1,
    uploadedBy: '8408819293539934111',
    numParts: 0,
    metaData: '',
  };
  it('validates pooledFilesFormattedSelector', () => {
    expect(
      selectors.pooledFilesFormattedSelector({
        Scenes: {
          Storage: { ContentServer: { PooledFiles: { entries } } },
        },
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toEqual([expected]);
  });

  it('validates selectedPooledFileFormattedSelector', () => {
    const selectedFile = {
      fileID: '1',
    };

    expect(
      selectors.selectedPooledFileFormattedSelector({
        Scenes: {
          Storage: {
            ContentServer: {
              PooledFiles: { entries, selectedFile },
            },
          },
        },
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toEqual(expected);
  });
});
