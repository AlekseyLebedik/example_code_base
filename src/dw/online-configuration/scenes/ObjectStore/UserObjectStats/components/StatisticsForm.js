import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
  Form,
  propTypes as reduxFormPropTypes,
} from 'redux-form';
import InputField from 'dw/core/components/FormFields/Input';
import classnames from 'classnames';
import * as V from 'dw/core/components/FormFields/validation';
import { updateStatValue } from '../actions';
import styles from '../index.module.css';

const StatisticsFormBase = ({ data, handleSubmit, onSubmit }) => (
  <>
    <div className={styles.gridContainer}>
      <div>
        <span className={styles.modalText}>Player ID</span>
        <span className={styles.modalText}>Object Name</span>
      </div>
      <div>
        <span className={styles.normalText}>{data.metadata.owner}</span>
        <span className={styles.normalText}>{data.metadata.name}</span>
      </div>
    </div>
    <div className={styles.gridContainer}>
      <span className={classnames(styles.modalText, styles.centerAlign)}>
        Statistic Value
      </span>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="number"
          component={InputField}
          type="number"
          label="Change Statistics Value"
          validate={[V.required, V.positiveInt]}
          fullWidth
        />
      </Form>
    </div>
  </>
);

StatisticsFormBase.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (_, ownProps) => ({
  initialValues: { number: ownProps.data.statistics[0].value },
});

const dispatchToProps = {
  updateStatValue,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: (values, _, props) => {
    const { owner } = props.data.metadata;
    const { name } = props.data.metadata;
    const number = Number(values.number);
    const statistic = props.statisticsValue.toLowerCase();
    const category = props.categoryValue;
    const formValues = {
      owner,
      name,
      number,
      statistic,
      category,
    };
    dispatchProps.updateStatValue(formValues);
    props._onCancel();
  },
});

export default compose(
  connect(mapStateToProps, dispatchToProps, mergeProps),
  reduxForm({ enableReinitialize: true })
)(StatisticsFormBase);

StatisticsFormBase.propTypes = {
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
};

StatisticsFormBase.defaultProps = {};
