import mockState from 'playpants/testUtils/mockState';
import { thunderpantsProps as props } from 'playpants/testUtils/eventProps';
import * as selectors from '../selectors';

describe('ThunderpantsDetailsStateless', () => {
  const tpantsBase = mockState.Scenes.Event.activity.thunderpants;
  it('thunderpantsSelector:', () => {
    expect(selectors.thunderpantsSelector(mockState)).toEqual(tpantsBase);
  });

  describe('Build List Selectors:', () => {
    it('buildListBaseSelector', () => {
      expect(selectors.buildListBaseSelector(mockState)).toEqual(
        tpantsBase.buildList
      );
    });
    it('buildListSelector', () => {
      expect(selectors.buildListSelector(mockState)).toEqual(
        tpantsBase.buildList.data
      );
    });
    it('buildListSuccessSelector', () => {
      expect(selectors.buildListSuccessSelector(mockState)).toEqual(
        tpantsBase.buildList.success
      );
    });
  });

  describe('Target List Selectors:', () => {
    it('targetListBaseSelector', () => {
      expect(selectors.targetListBaseSelector(mockState)).toEqual(
        tpantsBase.targetList
      );
    });
    it('targetListSelector', () => {
      expect(selectors.targetListSelector(mockState)).toEqual(
        tpantsBase.targetList.data
      );
    });
    it('buildListLoadingSelector', () => {
      expect(selectors.targetListSuccessSelector(mockState)).toEqual(
        tpantsBase.targetList.success
      );
    });
  });

  describe('User Params Schema Selectors:', () => {
    it('userParamsSchemaBaseSelector', () => {
      expect(selectors.userParamsSchemaBaseSelector(mockState)).toEqual(
        tpantsBase.userParamsSchema
      );
    });
    it('userParamsSchemaSelector', () => {
      expect(selectors.userParamsSchemaSelector(mockState)).toEqual(
        tpantsBase.userParamsSchema.data
      );
    });
    it('buildListLoadingSelector', () => {
      expect(selectors.targetListSuccessSelector(mockState)).toEqual(
        tpantsBase.userParamsSchema.success
      );
    });
  });

  describe('Tpants Form Selector:', () => {
    it('tpantsFormBaseSelector', () => {
      expect(selectors.tpantsFormBaseSelector(mockState)).toEqual(
        tpantsBase.form
      );
    });
    it('formDataSelector', () => {
      expect(selectors.formDataSelector(mockState)).toEqual(
        tpantsBase.form.data
      );
    });
    it('formSchemaSelector', () => {
      expect(selectors.formSchemaSelector(mockState)).toEqual(
        tpantsBase.form.schema
      );
    });
    it('formTargetsSelector', () => {
      expect(selectors.formTargetsSelector(mockState)).toEqual(
        tpantsBase.form.targets
      );
    });
    it('formTypeSelector', () => {
      expect(selectors.formTypeSelector(mockState)).toEqual(
        tpantsBase.form.type
      );
    });
    it('formSummaryDataSelector', () => {
      expect(selectors.formSummaryDataSelector(mockState)).toEqual(
        tpantsBase.form.summary
      );
    });
  });

  describe('activityDeploymentsSelector()', () => {
    it('properly selectors deploy', () => {
      expect(selectors.activityDeploymentsSelector(mockState, props)).toEqual(
        props.selectedActivity.activity.deploy
      );
    });
  });

  describe('activityUnDeploymentsSelector()', () => {
    it('properly selectors deploy', () => {
      expect(selectors.activityUndeploymentsSelector(mockState, props)).toEqual(
        props.selectedActivity.activity.undeploy
      );
    });
  });

  describe('activityModificationsSelector()', () => {
    it('properly selectors deploy', () => {
      expect(selectors.activityModificationsSelector(mockState, props)).toEqual(
        props.selectedActivity.activity.modify
      );
    });
  });

  describe('activityScheduledSelector()', () => {
    it('properly parsed scheduled object', () => {
      expect(
        selectors.activityScheduledSelector(mockState, props)
      ).toMatchSnapshot();
    });
  });

  describe('parsedBuildListSelector()', () => {
    it('properly selects the parsedBuildList', () => {
      expect(
        selectors.parsedBuildListSelector(mockState, props)
      ).toMatchSnapshot();
    });
  });

  describe('isScheduledEmptySelector()', () => {
    it('returns false if scheduled is not empty', () => {
      expect(selectors.isScheduledEmptySelector(mockState, props)).toEqual(
        false
      );
    });
  });
});
