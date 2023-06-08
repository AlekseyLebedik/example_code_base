import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import classnames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from 'dw/core/components/IconButton';

import Form from 'react-jsonschema-form';
import AutoComplete from 'dw/core/components/AutocompleteGeneral';
import Toggle from 'playpants/components/SchemaForm/components/Toggle';
import Textbox from 'playpants/components/SchemaForm/components/Textbox';

import styles from './index.module.css';

const StatelessSettingSchema = props => {
  const {
    displaySubmit,
    expandAll,
    formContext,
    formData,
    formRef,
    handleChange,
    handleFormChange,
    handleSelection,
    handleSubmit,
    isExpanded,
    openKeys,
    settingSchema,
    uiSchema,
    rootAsRow,
    fieldsToTop,
  } = props;
  const getCustomFieldTemplate = children => {
    const options = {
      root: (
        <Grid container alignItems="flex-start" direction="row">
          {children}
        </Grid>
      ),
    };
    formContext.titleFields.forEach(title => {
      options[`root_${title}`] = (
        <div className={styles.fieldTemplateColumn}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </div>
      );
    });
    return options;
  };
  const CustomFieldTemplate = keys => {
    const { classNames, children, id, label } = keys;
    const fixedOrdering =
      !isEmpty(fieldsToTop) &&
      (includes(fieldsToTop, label) ? styles.topOfOrder : styles.defaultOrder);
    return (
      <>
        {(rootAsRow && getCustomFieldTemplate(children)[id]) || (
          <div className={classnames(classNames, fixedOrdering)}>
            {children}
          </div>
        )}
      </>
    );
  };

  const ObjectFieldTemplate = keys => {
    const { title, properties, formContext: ctx, idSchema } = keys;
    const { titleFields, listFields, labeledFields } = ctx;
    const selected = includes(openKeys, idSchema.$id);
    const sortedProperties = sortBy(properties, [
      'content.props.schema.type',
      'name',
    ]);
    const expandButton = (schema, expandObj) =>
      schema.type_settings
        ? expandObj[schema.type_settings.$id]
        : expandObj[schema.$id];

    if (includes(titleFields, title)) {
      return (
        <List
          component="nav"
          classes={{
            root: classnames({ [styles.list]: !isEmpty(fieldsToTop) }),
          }}
          subheader={
            <div className={styles.container}>
              <ListSubheader
                component="div"
                classes={{ root: styles.listSubheader }}
              >
                {title}
              </ListSubheader>
              {ctx.listFields && (
                <IconButton
                  className={styles.expandAll}
                  color="primary"
                  icon="add"
                  onClick={() =>
                    expandAll(
                      idSchema.type_settings
                        ? idSchema.type_settings.$id
                        : idSchema.$id
                    )
                  }
                  type="fab"
                  variant="extended"
                  {...(expandButton(idSchema, isExpanded)
                    ? {
                        icon: 'expand_less',
                        text: 'Collapse All',
                        tooltip: 'Collapse all options',
                      }
                    : {
                        icon: 'expand_more',
                        text: 'Expand All',
                        tooltip: 'Expand all options',
                      })}
                />
              )}
            </div>
          }
        >
          {sortedProperties.map(element => element.content)}
        </List>
      );
    }
    if (includes(listFields, title)) {
      const itemDisabled =
        get(formData, `activity_types.${title}.enabled`) === false;
      return (
        <>
          <ListItem
            button
            onClick={() => {
              const { $id } = idSchema;
              let index = -1;
              listFields.forEach(field => {
                const i = $id.indexOf(`_${field}`);
                if (i !== -1) index = i;
              });
              handleSelection($id, $id.substring(0, index));
            }}
            selected={selected}
          >
            <ListItemText
              className={itemDisabled ? styles.disabled : undefined}
              primary={itemDisabled ? `${title} (disabled)` : title}
            />
            <Icon>{selected ? 'expand_less' : 'expand_more'}</Icon>
          </ListItem>
          <Collapse in={selected} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sortedProperties.map(element => (
                <ListItem className={styles.nested} key={element.name}>
                  <ListItemText primary={element.name} />
                  <ListItemSecondaryAction className={styles.widget}>
                    {element.content}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider light />
        </>
      );
    }
    return sortedProperties.map(element => (
      <div key={element.content.key}>
        {includes(labeledFields, element.name) && element.name}
        {element.content}
      </div>
    ));
  };

  const ArrayFieldTemplate = keys => (
    <>
      {keys.items.map(element => (
        <div key={element.index} className={styles.container}>
          <div className={styles.affiliatedProjectsControl}>
            {element.children}
          </div>
          {element.hasRemove && (
            <Icon
              className={styles.removeButton}
              onClick={element.onDropIndexClick(element.index)}
            >
              clear
            </Icon>
          )}
        </div>
      ))}
      {keys.canAdd && (
        <Button onClick={keys.onAddClick} variant="outlined" color="primary">
          Add
        </Button>
      )}
    </>
  );

  const widgets = {
    CheckboxWidget: keys => (
      <Toggle {...keys} handleChange={e => handleChange(e, keys)} />
    ),
    SelectWidget: keys => {
      const { enumOptions } = keys.options;
      return (
        <AutoComplete
          {...keys}
          defaultValue={
            keys.value &&
            enumOptions.filter(option => keys.value.includes(option.value))
          }
          isClearable={keys.schema.type === 'array'}
          isMulti={keys.multiple}
          onChange={e => handleChange(e, keys)}
          options={enumOptions}
        />
      );
    },
    BaseInput: keys => {
      const textbox = (
        <Textbox
          {...keys}
          handleChange={e => handleChange(e, keys)}
          label={keys.label || keys.id}
          properties={keys.schema}
        />
      );
      return (
        <div key={keys.label} className={styles.listItemContainer}>
          {keys.formContext.labeledFields ? (
            <ListItem className={styles.nested} key={keys.label}>
              <ListItemText primary={keys.label} />
              <ListItemSecondaryAction className={styles.baseInput}>
                {textbox}
              </ListItemSecondaryAction>
            </ListItem>
          ) : (
            textbox
          )}
        </div>
      );
    },
  };

  const children = [
    displaySubmit && (
      <Button
        color="primary"
        key="submit"
        onClick={handleSubmit}
        variant="contained"
      >
        Submit
      </Button>
    ),
  ];

  return (
    <Form
      ArrayFieldTemplate={ArrayFieldTemplate}
      className={classnames(styles.form, { [styles.formWidth]: !rootAsRow })}
      FieldTemplate={CustomFieldTemplate}
      formContext={formContext}
      formData={formData}
      key={openKeys}
      ObjectFieldTemplate={ObjectFieldTemplate}
      onChange={handleFormChange}
      onSubmit={handleSubmit}
      ref={formRef}
      schema={settingSchema}
      uiSchema={uiSchema}
      widgets={widgets}
    >
      {children}
    </Form>
  );
};

StatelessSettingSchema.propTypes = {
  displaySubmit: PropTypes.bool,
  expandAll: PropTypes.func.isRequired,
  formContext: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  formRef: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isExpanded: PropTypes.object.isRequired,
  openKeys: PropTypes.arrayOf(PropTypes.string),
  settingSchema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  rootAsRow: PropTypes.bool,
  fieldsToTop: PropTypes.arrayOf(PropTypes.string),
};

StatelessSettingSchema.defaultProps = {
  displaySubmit: false,
  openKeys: null,
  uiSchema: {},
  rootAsRow: false,
  fieldsToTop: [],
};

export default StatelessSettingSchema;
