export const getPublisherObjects = params => {
  if (params.nextPageToken !== undefined) {
    return new Promise(resolve =>
      setTimeout(() => resolve(mockObjectsSecondPage), 500)
    );
  }

  return new Promise(resolve =>
    setTimeout(() => resolve(mockObjectsFirstPage), 500)
  );
};

export const getUserObjects = (userId, params) => {
  if (params.nextPageToken !== undefined) {
    return new Promise(resolve =>
      setTimeout(() => resolve(mockUserObjectsSecondPage), 500)
    );
  }

  return new Promise(resolve =>
    setTimeout(() => resolve(mockUserObjectsFirstPage), 500)
  );
};

export const getPublisherCategories = () =>
  new Promise(resolve => setTimeout(() => resolve(mockCategories), 500));

export const getObjectGroups = () =>
  new Promise(resolve => setTimeout(() => resolve(mockGroups), 500));

export const getObjectStats = () =>
  new Promise(resolve => setTimeout(() => resolve(mockUserObjectStats), 500));

const mockCategories = {
  data: {
    categories: ['cat1', 'cat2', 'cat3'],
  },
};

const mockGroups = {
  data: {
    groups: [
      {
        groupID: 1,
        groupName: 'Group 1',
        members: [{ userID: '1', userName: 'pc', reputation: '0' }],
      },
      {
        groupID: 2,
        groupName: 'Group 2',
        members: [{ userID: '1', userName: 'pc', reputation: '0' }],
      },
      {
        groupID: 3,
        groupName: 'Group 3',
        members: [{ userID: '1', userName: 'pc', reputation: '0' }],
      },
      {
        groupID: 4,
        groupName: 'Group 4',
        members: [{ userID: '1', userName: 'pc', reputation: '0' }],
      },
    ],
  },
};

export const getPublisherGroups = () =>
  new Promise(resolve => setTimeout(() => resolve(mockGroups), 500));

const mockObjectsSecondPage = {
  data: {
    nextPageToken: null,
    objects: [
      {
        category: null,
        name: 'name_test_3',
        expiresOn: 0,
        checksum: 'checksum_test',
        contentLength: 123456,
        alc: 'ALC_test',
        extraData: null,
      },
      {
        category: null,
        name: 'name_test_4',
        expiresOn: 0,
        checksum: 'checksum_test',
        contentLength: 123456,
        alc: 'ALC_test',
        extraData: null,
      },
    ],
  },
};

const mockObjectsFirstPage = {
  data: {
    nextPageToken: 'whateverToken',
    objects: [
      {
        category: null,
        name: 'name_test',
        expiresOn: 0,
        checksum: 'checksum_test',
        contentLength: 123456,
        alc: 'ALC_test',
        extraData: null,
      },
      {
        category: null,
        name: 'name_test_2',
        expiresOn: 0,
        checksum: 'checksum_test',
        contentLength: 123456,
        alc: 'ALC_test',
        extraData: null,
      },
    ],
  },
};

const mockUserObjectsFirstPage = {
  data: {
    nextPageToken: 'whateverToken',
    objects: [
      {
        category: null,
        contentVersion: '81d7f6968f5e11e887bd213b6766d6ba',
        summaryContentLength: null,
        name: 'Test - 1',
        objectID: 7162189280699245412,
        created: 1532449670,
        checksum: '053d8254617bb80a5247043ced8836ae',
        contentLength: 440413,
        extraData: null,
        modified: 1532449670,
        objectVersion: '823835608f5e11e8a8c0dc385cc4318d',
        acl: 'public',
        expiresOn: 0,
        extraDataSize: null,
        context: 'game1',
        contentID: 7293074053914518326,
        owner: 'psn-1234567890',
        summaryChecksum: null,
        hasSummary: false,
      },
    ],
  },
};

const mockUserObjectsSecondPage = {
  data: {
    nextPageToken: null,
    objects: [
      {
        category: null,
        contentVersion: '81d7f6968f5e11e887bd213b6766d6ba',
        summaryContentLength: null,
        name: 'Test - 2',
        objectID: 7162189280699245412,
        created: 1532449670,
        checksum: '053d8254617bb80a5247043ced8836ae',
        contentLength: 440413,
        extraData: null,
        modified: 1532449670,
        objectVersion: '823835608f5e11e8a8c0dc385cc4318d',
        acl: 'public',
        expiresOn: 0,
        extraDataSize: null,
        context: 'game1',
        contentID: 7293074053914518326,
        owner: 'psn-1234567890',
        summaryChecksum: null,
        hasSummary: false,
      },
    ],
  },
};

const mockUserObjectStats = {
  data: {
    nextPageToken: null,
    objects: [
      {
        metadata: {
          owner: 'studio-779841657578470795',
          expiresOn: 0,
          name: 'BA2A0E454DF4C22EABA5BAA504929B47',
          checksum: '1878914571',
          acl: 'public',
          objectID: 7292843160835010864,
          contentID: 4049641402072119095,
          objectVersion: 'e289625253f411eab1be82667880bb13',
          contentVersion: 'e289614e53f411eaa1c68e358ded2803',
          contentLength: 5700,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1582212184,
          modified: 1582212184,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQAAoAAABBbWFuZGEgMTEAAAAAAA==',
          extraDataSize: 73,
          summaryContentLength: 308529,
          summaryChecksum: '-199580967',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 3423,
          },
        ],
      },
      {
        metadata: {
          owner: 'steam-17797203188776267883',
          expiresOn: 0,
          name: 'EE56303245E71442427C17BD68F99AB4',
          checksum: '-500817736',
          acl: 'public',
          objectID: 7161679090107298102,
          contentID: 7076344004193183334,
          objectVersion: '5521410841e511eab9b5107dc4527a40',
          contentVersion: '545d0ae041e511ea85ab2b36d61d9ed3',
          contentLength: 1278,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1580226381,
          modified: 1580226381,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQAAwAAABkYXJhIHRlc3QgMgAAAAAA',
          extraDataSize: 75,
          summaryContentLength: 803,
          summaryChecksum: '-855629243',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 3006,
          },
        ],
      },
      {
        metadata: {
          owner: 'studio-4567032846750330299',
          expiresOn: 0,
          name: '2F79A7F54F60B32C2563DFAC0860D578',
          checksum: '-1246311239',
          acl: 'public',
          objectID: 7161626529190076769,
          contentID: 3904678271504508468,
          objectVersion: 'f12ae9ac58a911ea8cd9ed491f530a5d',
          contentVersion: 'f12ae8a858a911ea9da0ff0f7b496b6c',
          contentLength: 15106,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1582729753,
          modified: 1582729753,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQACUAAAB5ZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWUAGgAAAFlvdXIgUGFya3MgRGVzY3JpcHRpb24uLi4A',
          extraDataSize: 126,
          summaryContentLength: 276325,
          summaryChecksum: '994478013',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 2065,
          },
        ],
      },
      {
        metadata: {
          owner: 'steam-6086779183967953461',
          expiresOn: 0,
          name: '7D924D794E7BF0EFA8CB7993EB35EFB8',
          checksum: '-1374267149',
          acl: 'public',
          objectID: 3688556058217885752,
          contentID: 7077464419356588345,
          objectVersion: 'ead28d123c8e11eaadfeb52f0c717f06',
          contentVersion: 'e95e92aa3c8e11eaad640ede3a47f5cf',
          contentLength: 131814,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1579639511,
          modified: 1579639511,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQAAoAAABQT08gVElNRSAAAAAAAA==',
          extraDataSize: 73,
          summaryContentLength: 270802,
          summaryChecksum: '-1857452845',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 2065,
          },
        ],
      },
      {
        metadata: {
          owner: 'steam-6086779183967953461',
          expiresOn: 0,
          name: '4269D9D84107FAE1D6E8B6A3D237B224',
          checksum: '1081665942',
          acl: 'public',
          objectID: 3763151531338445619,
          contentID: 7219377088898491442,
          objectVersion: 'cd6f95903d6411ea9789d215f99816a1',
          contentVersion: 'cc54d4363d6411ea93d7126240d12ad7',
          contentLength: 6990,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1579731374,
          modified: 1579731374,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQAAkAAABhdXRvc2F2ZQAAAAAA',
          extraDataSize: 72,
          summaryContentLength: 260531,
          summaryChecksum: '1431208487',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 2065,
          },
        ],
      },
      {
        metadata: {
          owner: 'steam-17797203188776267883',
          expiresOn: 0,
          name: '3E67F82243FE79CB3EEC93941B3C32E9',
          checksum: '878360994',
          acl: 'public',
          objectID: 3690528587231867705,
          contentID: 3616780149744428597,
          objectVersion: 'c4010bba30bc11ea8d6f535c3dc74f87',
          contentVersion: 'c288f99630bc11eaa7f3884d1f3a508e',
          contentLength: 182462,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1578339788,
          modified: 1578339788,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQAA8AAABTa2F0ZSBBcXVhcml1bQBOAAAAd2VsY29tZSB0byB0aGUgc2thdGUgYXF1YXJpdW0sIGJ1dCBiZSBjYXJlZnVsLCB0aGUgcmFtcHMgYXJlIGEgbGl0dGxlLi4uZmlzaHkA',
          extraDataSize: 156,
          summaryContentLength: 268093,
          summaryChecksum: '1087947495',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 2065,
          },
        ],
      },
      {
        metadata: {
          owner: 'steam-15533315713958407456',
          expiresOn: 0,
          name: 'F8F3924045320A514FA33488FB2B5B5A',
          checksum: '832676787',
          acl: 'public',
          objectID: 7378362045754126693,
          contentID: 7077519391464698163,
          objectVersion: '1918c6263f0211ea9acb84a9a66f1438',
          contentVersion: '180e46ac3f0211eab3ac10807a35ae9a',
          contentLength: 545,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1579908883,
          modified: 1579908883,
          extraData:
            'VUR3/wEAAAAHAAAAV1JfQ0FQABEAAABCcnlhbkRlYnVnUGFya18zAH0AAABUaGlzIGlzIGEgdGVzdCBwYXJrIGNyZWF0ZWQgaW4gb3JkZXIgdG8gdGVzdCBsaW1pdHMgb2YgQ0FQIHN5c3RlbS4gIEFzayB1c2VyIHRvIGRlbGV0ZSBpZiBpdHMgYm90aGVyaW5nIGRldmVsb3BtZW50IGZsb3cuID0pAA==',
          extraDataSize: 169,
          summaryContentLength: 913,
          summaryChecksum: '-1521991195',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 2065,
          },
        ],
      },
      {
        metadata: {
          owner: 'steam-15533315713958407456',
          expiresOn: 0,
          name: '76B2FCF74163E87312CBF388E3303D6E',
          checksum: '749902769',
          acl: 'public',
          objectID: 7306634305083618401,
          contentID: 7148963458051106150,
          objectVersion: '9c1c094e3f0611ea80ba06d2a3a7aa6e',
          contentVersion: '9b0a21763f0611eaac7ee4e071afb27b',
          contentLength: 542,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1579910820,
          modified: 1579910820,
          extraData:
            'VUR3/wEAAAAHAAAAV1JfQ0FQABIAAABCcnlhbkRlYnVnUGFya18yMgB9AAAAVGhpcyBpcyBhIHRlc3QgcGFyayBjcmVhdGVkIGluIG9yZGVyIHRvIHRlc3QgbGltaXRzIG9mIENBUCBzeXN0ZW0uICBBc2sgdXNlciB0byBkZWxldGUgaWYgaXRzIGJvdGhlcmluZyBkZXZlbG9wbWVudCBmbG93LiA9KQA=',
          extraDataSize: 170,
          summaryContentLength: 914,
          summaryChecksum: '562459903',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 2065,
          },
        ],
      },
      {
        metadata: {
          owner: 'studio-4567032846750330299',
          expiresOn: 0,
          name: '7A65BB3F42F788AD266194A05CCB32D0',
          checksum: '-509812517',
          acl: 'public',
          objectID: 3919315180713305648,
          contentID: 4122028634749166134,
          objectVersion: 'e079fa9e525a11eabf0ca515c1e2862e',
          contentVersion: 'e079f922525a11ea98715d1e810fb836',
          contentLength: 543,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1582036086,
          modified: 1582036086,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQACoAAAB5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eQAIAAAAdXlna2poZwA=',
          extraDataSize: 113,
          summaryContentLength: 1017,
          summaryChecksum: '-1517973681',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 945,
          },
        ],
      },
      {
        metadata: {
          owner: 'steam-6086779183967953461',
          expiresOn: 0,
          name: '53732B5142434B68D9EC0FA368F82A42',
          checksum: '-1869582594',
          acl: 'public',
          objectID: 7306635430368523107,
          contentID: 3774355348630091574,
          objectVersion: '56039dba3c8f11ea9cab388c1ee4fb90',
          contentVersion: '54a588663c8f11eabcccb31f9dab216a',
          contentLength: 89607,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1579638841,
          modified: 1579639690,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQAAcAAAB5TyBmQW0AAAAAAA==',
          extraDataSize: 70,
          summaryContentLength: 256767,
          summaryChecksum: '1809583029',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 945,
          },
        ],
      },
      {
        metadata: {
          owner: 'steam-5105737317611348251',
          expiresOn: 0,
          name: '6F9F104D482312B7F1F0E88C797DDA3D',
          checksum: '1665480579',
          acl: 'public',
          objectID: 3905010311047242548,
          contentID: 3544390498819192627,
          objectVersion: '55207cdc380d11eaa2fd151a2e4c8ea3',
          contentVersion: '52f40b18380d11eabf2eb55c4bdbf052',
          contentLength: 73023,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1579144050,
          modified: 1579144050,
          extraData:
            'VUR3/wEAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQABQAAABERy1HZWVtZ2UwTWFwTWFwTWFwADUAAABDb29sIE1hcCB0aGF0IHdpbGwgYmUgaW4gc29tZSBsZWFkZXJib2FyZHMgYW5kIHN0dWZmAA==',
          extraDataSize: 136,
          summaryContentLength: 308124,
          summaryChecksum: '470062244',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 945,
          },
        ],
      },
      {
        metadata: {
          owner: 'studio-13091201508504024919',
          expiresOn: 0,
          name: '5AD83C7E4B87C0F7F0D7E28BF1BC6F6E',
          checksum: '-1438935567',
          acl: 'public',
          objectID: 7077466407926444897,
          contentID: 3474354915352197426,
          objectVersion: 'ebca66a47f2811eab3bc8bf0514d80cf',
          contentVersion: 'ebca65aa7f2811ea8eabe878c6ca395b',
          contentLength: 130213,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1586962355,
          modified: 1586962437,
          extraData:
            'VUR3/wIAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQAAoAAABaaW1hIDQvMTUACwAAAGtqZnZia2pkZm4AAAAAAA==',
          extraDataSize: 88,
          summaryContentLength: 300556,
          summaryChecksum: '1535922707',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 703,
          },
        ],
      },
      {
        metadata: {
          owner: 'studio-13091201508504024919',
          expiresOn: 0,
          name: '0E88915D4645DB68F1AF889438C92406',
          checksum: '-419852283',
          acl: 'public',
          objectID: 3545796568818213681,
          contentID: 3544670676746254393,
          objectVersion: '6618c4a2857b11eab730203f511fcd88',
          contentVersion: '6618c380857b11ea8be4f96257588ac0',
          contentLength: 12048,
          context: 'alcatraz_steam',
          category: 'CAP',
          created: 1587657564,
          modified: 1587657564,
          extraData:
            'VUR3/wMAAAArAAAAL0dhbWUvRW52aXJvbm1lbnRzL1dSX0NyZWF0ZS1hLVBhcmsvV1JfQ0FQAAoAAABaaW1hIDQvMjMACgAAAGZidmpraGJmdgAAAAAACAAAAGJ6aW1hLTEABwAAAHN0dWRpbwAAAAAA',
          extraDataSize: 114,
          summaryContentLength: 1059,
          summaryChecksum: '1843086709',
          hasSummary: true,
        },
        statistics: [
          {
            name: 'popularity',
            value: 614,
          },
        ],
      },
    ],
  },
};
