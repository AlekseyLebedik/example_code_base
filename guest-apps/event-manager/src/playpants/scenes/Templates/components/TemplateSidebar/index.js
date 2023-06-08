import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'dw/core/components/SectionTitle';

import SearchableList from 'dw/core/components/SearchableList';
import TemplateFormDialog from 'playpants/components/TemplateFormDialog';
import { getRenderItemFunc } from './components/ListItem';

const TemplateSidebar = props => {
  const {
    baseUrl,
    onDeleteThenRedirect,
    onSearch,
    onSelectItem,
    onShowMore,
    searchedTemplatesData,
    searchedTemplatesLoading,
    searchedTemplatesNext,
    selectedItemId,
  } = props;

  const showMore = !!searchedTemplatesNext;

  return (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Available Templates"
        shown={searchedTemplatesData.length}
      >
        <TemplateFormDialog
          action="create"
          baseUrl={baseUrl}
          submitText="Create"
          submittingText="Creating"
          title="Create Template"
          icon="add"
          data-cy="template_sidebar__create-template-dialog"
          primaryButtonProps={{
            'data-cy': 'template_sidebar__submit-create-template-form',
          }}
        />
      </SectionTitle>
      <SearchableList
        searchEnabled
        placeholder="Template name"
        items={searchedTemplatesData}
        getItemKey={item => item.id}
        toRenderFunc={getRenderItemFunc(
          item => {
            onSelectItem(item.source_event, `${baseUrl}templates/`);
          },
          selectedItemId,
          onDeleteThenRedirect
        )}
        onSearch={onSearch}
        showMore={showMore}
        loadingMaster={searchedTemplatesLoading}
        onShowMore={() => onShowMore(searchedTemplatesNext)}
      />
    </div>
  );
};

TemplateSidebar.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  searchedTemplatesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedTemplatesLoading: PropTypes.bool.isRequired,
  searchedTemplatesNext: PropTypes.string,
  selectedItemId: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onDeleteThenRedirect: PropTypes.func.isRequired,
};

TemplateSidebar.defaultProps = {
  searchedTemplatesNext: null,
  selectedItemId: null,
};

export default TemplateSidebar;
