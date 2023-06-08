export const getTests = () =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          data: {
            data: [
              {
                assignmentAlgorithm: 'sha256',
                assignmentSeed: '374249003a8541e6bcd6851fec177928',
                catchEnd: '1571225391',
                catchStart: '1570102191',
                categories: [],
                cohorts: [],
                first_parties: ['psn', 'xbl'],
                platform: 'PS3',
                comments: null,
                context: 'game1',
                created: '1570015819',
                creator: null,
                data_scientist: null,
                name: 'testo',
                organisation: null,
                purpose: null,
                stakeholders: [],
                status: 'configuration',
                testID: '5699483858369632905',
                updated: '1570015819',
              },
            ],
          },
        }),
      1500
    )
  );

export const fetchTest = () =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          data: {
            assignmentAlgorithm: 'sha256',
            assignmentSeed: '1102789e07024164884cf4946dfd5ded',
            catchEnd: '1585763880',
            catchStart: '1543337880',
            categories: ['revenue', 'gameplay', 'churn'],
            first_parties: ['psn', 'xbl'],
            cohorts: [
              {
                cohortID: '2845825985344853009',
                isControl: false,
                name: 'dafsdf',
                source: { type: 'manual' },
                type: 'manual',
                treatments: [
                  {
                    configs: [
                      '151058479264025945',
                      '5754130163149747060',
                      '17975135785108434724',
                    ],
                    end: '1587491880',
                    service_id: 'ae',
                    start: '1543337880',
                  },
                ],
              },
            ],
            comments: null,
            context: '5682',
            created: '1548243088',
            creator: 'jheslin@demonware.net',
            data_scientist: 'jheslin@demonware.net',
            name: 'Test Test 2',
            organisation: 'TEST 2',
            purpose: 'asjdfsadf 2',
            stakeholders: [],
            status: 'configuration',
            testID: '5192614839348231132',
            updated: '1565006622',
          },
        }),
      1500
    )
  );
