import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ModalForm from 'dw/core/components/ModalForm';
import { FORM_NAME as ADD_CATEGORY_FORM_NAME } from './components/AddCategoryForm/constants';

import AddCategoryForm from './components/AddCategoryForm';
import { addCategory } from '../../actions';

const OpenModalButton = ({ onClick }) => (
  <Tooltip title="Add Object Category" placement="bottom">
    <IconButton
      color="inherit"
      onClick={onClick}
      data-cy="add-category-modal-button"
    >
      <Icon>playlist_add</Icon>
    </IconButton>
  </Tooltip>
);
OpenModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
function AddCategory({ categories, onAddCategory }) {
  return (
    <ModalForm
      categories={categories}
      formName={ADD_CATEGORY_FORM_NAME}
      FormComponent={AddCategoryForm}
      OpenModalComponent={OpenModalButton}
      title="Add Object Category"
      submitText="Add"
      submittingText="Creating..."
      wrapperClassName="publisher-objects__add-category-modal"
      dialogContentStyle={{ width: '500px' }}
      externalSubmit={onAddCategory}
    />
  );
}

AddCategory.propTypes = {
  onAddCategory: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

AddCategory.defaultProps = {
  categories: [],
};

const dispatchToProps = dispatch => ({
  onAddCategory: values => dispatch(addCategory(values)),
});

export default connect(null, dispatchToProps)(AddCategory);
