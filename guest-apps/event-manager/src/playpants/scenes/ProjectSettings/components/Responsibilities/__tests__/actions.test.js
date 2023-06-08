import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('Responsibility groups', () => {
  describe('Actions', () => {
    describe('fetchGroups', () => {
      it('returns FETCH_GROUPS action', () => {
        expect(actions.fetchGroups()).toMatchObject({
          type: `${AT.FETCH_GROUP_LIST}_FETCH`,
          append: false,
          params: {},
          urlID: null,
        });
      });
    });

    describe('createResponsibilityGroups', () => {
      it('returns CREATE_RESPONSIBILITY_GROUPS action', () => {
        expect(actions.createResponsibilityGroups()).toMatchObject({
          type: AT.CREATE_RESPONSIBILITY_GROUPS,
          params: {},
        });
      });
    });

    describe('createResponsibilityGroupsSuccess', () => {
      it('returns CREATE_RESPONSIBILITY_GROUPS action', () => {
        expect(actions.createResponsibilityGroupsSuccess({})).toMatchObject({
          type: AT.CREATE_RESPONSIBILITY_GROUPS_SUCCESS,
          response: {},
        });
      });
    });

    describe('createResponsibilityGroupsFailed', () => {
      it('returns CREATE_RESPONSIBILITY_GROUPS_FAILED action', () => {
        expect(actions.createResponsibilityGroupsFailed({})).toMatchObject({
          type: AT.CREATE_RESPONSIBILITY_GROUPS_FAILED,
          error: {},
        });
      });
    });

    describe('updateResponsibilities', () => {
      it('returns UPDATE_RESPONSIBILITIES action', () => {
        expect(actions.updateResponsibilities({})).toMatchObject({
          type: AT.UPDATE_RESPONSIBILITIES,
          params: {},
        });
      });
    });

    describe('updateResponsibilitiesSuccess', () => {
      it('returns UPDATE_RESPONSIBILITIES_SUCCESS action', () => {
        expect(actions.updateResponsibilitiesSuccess({})).toMatchObject({
          type: AT.UPDATE_RESPONSIBILITIES_SUCCESS,
          response: {},
        });
      });
    });

    describe('updateResponsibilitiesFailed', () => {
      it('returns UPDATE_RESPONSIBILITIES_FAILED action', () => {
        expect(actions.updateResponsibilitiesFailed({})).toMatchObject({
          type: AT.UPDATE_RESPONSIBILITIES_FAILED,
          error: {},
        });
      });
    });

    describe('fetchResponsibilityOptions', () => {
      it('returns FETCH_RESPONSIBILITY_OPTIONS action', () => {
        expect(actions.fetchResponsibilityOptions()).toMatchObject({
          type: `${AT.FETCH_RESPONSIBILITY_OPTIONS}_FETCH`,
          append: false,
          params: undefined,
          urlID: null,
        });
      });
    });

    describe('fetchResponsibilityGroups', () => {
      it('returns FETCH_RESPONSIBILITY_GROUPS action', () => {
        expect(actions.fetchResponsibilityGroups({})).toMatchObject({
          type: `${AT.FETCH_RESPONSIBILITY_GROUPS}_FETCH`,
          append: false,
          params: {},
          urlID: null,
        });
      });
    });
  });
});
