const rulesets = {
  data: {
    nextPageToken: null,
    rulesets: [
      {
        activationTimestamp: null,
        codeHash: 'IAZ6rktmPKqZV2H7Z8o5eGruQ4Q=',
        codeSignature:
          'NIvvR1gtl5MZNlVJiA9AvYMSR3Ah3YzoqZ2XBzIplqYaiAVdabBmIzBRlzs9rTrnbsdMfi34n9IfFY6Ck4mpAA==',
        codeSignatureTimestamp: 1551968937,
        creationTimestamp: 1551968244,
        isActive: true,
        label: 'Test2',
        lastUpdateTimestamp: 1552412893,
      },
      {
        activationTimestamp: null,
        codeHash: 'z24+xio32/5ScO,5xkegEEDOFV5siA=',
        codeSignature: null,
        codeSignatureTimestamp: null,
        creationTimestamp: 1570121751,
        isActive: false,
        label:
          'MW_Arch,etype_Blueberry_churn_test_v6MW_Arch,etype_Blueberry_churn_test_v6MW_Arch,etype_Blueberry_churn_test_v6',
        lastUpdateTimestamp: 1570121751,
      },
      {
        activationTimestamp: null,
        codeHash: 'z24+xio32/5ScO,5xkEEDOegFV5siA=',
        codeSignature: null,
        codeSignatureTimestamp: null,
        creationTimestamp: 1570121751,
        isActive: false,
        label: 'MW_Arch,lsjbdvgljkbsfb vsfbst_v6',
        lastUpdateTimestamp: 1570121751,
      },
      {
        activationTimestamp: null,
        codeHash: 'z24+xio32/5ScO,5xkaergEEDOFV5siA=',
        codeSignature: null,
        codeSignatureTimestamp: null,
        creationTimestamp: 1570121751,
        isActive: false,
        label:
          'Mzdfbhfhgegevchurn_test_v6Mzdfbhfhgegevchurn_test_v6Mzdfbhfhgegevchurn_test_v6Mzdfbhfhgegevchurn_test_v6Mzdfbhfhgegevchurn_test_v6Mzdfbhfhgegevchurn_test_v6Mzdfbhfhgegevchurn_test_v6Mzdfbhfhgegevchurn_test_v6',
        lastUpdateTimestamp: 1570121751,
      },
    ],
  },
};

const inactiveRulesets = {
  data: {
    nextPageToken: '1',
    rulesets: [
      {
        activationTimestamp: null,
        codeHash: 'AAZ6rktmPKqZV2H7Z8o5eGruQ4Q=',
        codeSignature:
          'NIvvR1gtl5MZNlVJiA9AvYMSR3Ah3YzoqZ2XBzIplqYaiAVdabBmIzBRlzs9rTrnbsdMfi34n9IfFY6Ck4mpAA==',
        codeSignatureTimestamp: 1551968937,
        creationTimestamp: 1551968244,
        isActive: false,
        label: 'Test3',
        lastUpdateTimestamp: 1552412893,
      },
      {
        activationTimestamp: null,
        codeHash: 'A24+xio32/5ScO,5xkegEEDOFV5siA=',
        codeSignature: null,
        codeSignatureTimestamp: null,
        creationTimestamp: 1570121751,
        isActive: false,
        label: 'Test4',
        lastUpdateTimestamp: 1552412893,
      },
      {
        activationTimestamp: null,
        codeHash: 'A23+xio32/5ScO,5xkEEDOegFV5siA=',
        codeSignature: null,
        codeSignatureTimestamp: null,
        creationTimestamp: 1570121751,
        isActive: false,
        label: 'Test5',
        lastUpdateTimestamp: 1552412893,
      },
      {
        activationTimestamp: null,
        codeHash: 'A22+xio32/5ScO,5xkaergEEDOFV5siA=',
        codeSignature: null,
        codeSignatureTimestamp: null,
        creationTimestamp: 1570121751,
        isActive: false,
        label: 'Test6',
        lastUpdateTimestamp: 1552412893,
      },
    ],
  },
};

export const getRulesets = () =>
  new Promise(resolve => setTimeout(() => resolve(rulesets), 1000));

export const getInactiveRulesets = () =>
  new Promise(resolve => setTimeout(() => resolve(inactiveRulesets), 1000));
