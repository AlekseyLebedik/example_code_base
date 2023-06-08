import {
  mockThunderpantsScheduledDeployments,
  thunderpantsProps as props,
} from 'playpants/testUtils/eventProps';
import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';
import * as helpers from '../helpers';

describe('ThunderpantsDetails Helpers:', () => {
  describe('addBuildToActivityBuildList()', () => {
    const activityBuildList = [
      {
        uid: '1',
      },
    ];
    let build = {
      uid: '1',
    };
    it('should not add build if one already exists', () => {
      expect(
        helpers.addBuildToActivityBuildList({ activityBuildList, build }).length
      ).toBe(1);
    });

    it('should add build to list if it does not already exist', () => {
      build = {
        uid: '2',
      };
      expect(
        helpers.addBuildToActivityBuildList({ activityBuildList, build }).length
      ).toBe(2);
    });
  });

  describe('isDeploymentInType()', () => {
    const deployment = { uid: 'test1' };
    it('returns True if deployment is in type', () => {
      const type = [{ uid: 'test1' }, { uid: 'test2' }];
      expect(helpers.isDeploymentInType(deployment, type)).toEqual(true);
    });
    it('returns False if deployment is not in deployment list of type', () => {
      const type = [{ uid: 'test2' }];
      expect(helpers.isDeploymentInType(deployment, type)).toEqual(false);
    });
  });

  const undeploy = selectors.activityUndeploymentsSelector(mockState, props);
  const deploy = selectors.activityDeploymentsSelector(mockState, props);
  const modify = selectors.activityModificationsSelector(mockState, props);
  const buildList = selectors.buildListSelector(mockState);
  const build = buildList[0];
  const deploymentList = selectors.deploymentListSelector(mockState);

  describe('getLiveCount()', () => {
    it('gets live count', () => {
      expect(
        helpers.getLiveCount(build, deploymentList, { undeploy, modify })
      ).toBe(1);
    });
  });

  describe('getTypeCount()', () => {
    it('gives the correct count of undeployments', () => {
      expect(helpers.getTypeCount(build, undeploy)).toBe(1);
    });

    it('gives the correct count of modifications', () => {
      expect(helpers.getTypeCount(build, modify)).toBe(1);
    });
  });

  describe('sumBadgeWeights()', () => {
    it('correctly adds weights', () => {
      const badges = {
        live: 1,
        deploy: 1,
        undeploy: 1,
        modify: 1,
      };
      expect(helpers.sumBadgeWeights(badges)).toEqual(301);
    });
  });

  describe('formatBuildDetails()', () => {
    const uid =
      'e36576c1fb46e4d60c9ccf1cb5ae2f01dfcd96c6e226b424c715aec84155bd9b';
    const received = helpers.formatBuildDetails(
      deploymentList,
      mockThunderpantsScheduledDeployments,
      uid
    );
    it('properly labels live builds', () => {
      expect(received[0].type).toEqual('live');
    });
    it('properly labels deployments', () => {
      expect(received[1].type).toEqual('undeploy');
    });
    it('properly labels undeployment builds', () => {
      expect(received[2].type).toEqual('modify');
    });
    it('properly labels modification builds', () => {
      expect(received[3].type).toEqual('deploy');
    });
  });

  describe('constructBuildList()', () => {
    const filterType = 'default';
    let scheduled;

    it('correctly constructs build list', () => {
      scheduled = {
        deploy,
        undeploy,
        modify,
      };

      const received = helpers.constructBuildList({
        buildList,
        deploymentList,
        filterType,
        scheduled,
      });

      expect(received).toMatchSnapshot();
    });

    it("correctly construct build list if deployment's build does not exist", () => {
      const tempBuildList = [{ uid: 'none' }];
      const received = helpers.constructBuildList({
        buildList: tempBuildList,
        deploymentList: [],
        filterType,
        scheduled,
      });
      expect(received.length - tempBuildList.length).toBe(3);
    });
  });

  describe('parseModifyFormData()', () => {
    it('returns expected response from payload', () => {
      const payload = {
        build_uid: 'build_uid',
        lock: {},
        target_name: 'Target 1',
        type: '',
        uid: 1,
        user_params: {},
      };
      const received = helpers.parseModifyFormData(payload);
      const {
        target_name: targetName,
        user_params: userParams,
        type,
        ...restPayload
      } = payload;
      expect(received).toEqual({
        ...restPayload,
        ...userParams,
        deploymentType: type,
        target: { [targetName]: true },
      });
    });
  });

  describe('parseLockData()', () => {
    it('parses lock values', () => {
      const lock = {
        password: {
          value: 'password value',
        },
        comment: {
          value: 'comment value',
        },
      };
      const received = helpers.parseLockData(lock);
      expect(received).toEqual({
        password: 'password value',
        comment: 'comment value',
      });
    });
  });

  describe('parseDeployData()', () => {
    it('returns expected response', () => {
      const payload = { ...deploy[0], target: { value: '' } };
      expect(helpers.parseDeployData(payload)).toMatchSnapshot();
    });
  });

  describe('parseModifyData()', () => {
    it('returns expected response', () => {
      const payload = { ...modify[0], target: { value: '' } };
      expect(helpers.parseDeployData(payload)).toMatchSnapshot();
    });
  });

  describe('isDeployerViable()', () => {
    let deployer;
    let deployerList;
    it('Returns true if deployer is not selected/empty:', () => {
      deployer = {};
      deployerList = [];
      expect(helpers.isDeployerViable({ deployer, deployerList })).toEqual(
        true
      );
    });
    it('Returns false if deployer is not in deployerList:', () => {
      deployer = { id: 1 };
      deployerList = [{ id: 2 }];
      expect(helpers.isDeployerViable({ deployer, deployerList })).toEqual(
        false
      );
    });
    it('Returns true if deployer is in deployerList:', () => {
      deployer = { id: 1 };
      deployerList = [{ id: 1 }];
      expect(helpers.isDeployerViable({ deployer, deployerList })).toEqual(
        true
      );
    });
  });
});
