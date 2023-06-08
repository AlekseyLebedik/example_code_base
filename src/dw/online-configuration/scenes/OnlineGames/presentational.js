import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';

import SelectField from 'dw/core/components/Select';
import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';

import OnlineGameDetails from './components/OnlineGameDetails';
import OnlineGameDetailsEmpty from './components/OnlineGameDetailsEmpty';
import OnlineGameListItem from './components/OnlineGameListItem';

const ContextComponent = ({ contexts, selectedContext, changeContext }) => (
  <SelectField
    id="context"
    className="context-component"
    placeholder="Context"
    onChange={changeContext}
    value={selectedContext}
    SelectProps={{
      renderValue: value => `Context: ${value}`,
    }}
  >
    {contexts.map(context => (
      <MenuItem value={context} key={context}>
        {context || 'Default'}
      </MenuItem>
    ))}
  </SelectField>
);

ContextComponent.propTypes = {
  contexts: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedContext: PropTypes.string.isRequired,
  changeContext: PropTypes.func.isRequired,
};

const getRenderItemFunc = onSelectItem => item =>
  (
    <OnlineGameListItem
      key={`${item.sessionID || item.securityID}-${item.userID}`}
      {...item}
      onClick={() => onSelectItem(item)}
    />
  );

const OnlineGamesStateless = props => {
  const {
    onlineGames,
    nextPageToken,
    q,
    contexts,
    onClickListItem,
    onShowMore,
    searchAvailable,
    selectedContext,
  } = props.reduxProps;
  const { onSearch, changeContext } = props.reactProps;
  const showMore = nextPageToken !== null;

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Online Games"
        shown={onlineGames.length}
        extraContent={
          (contexts.length > 0 && (
            <ContextComponent
              contexts={contexts}
              selectedContext={selectedContext}
              changeContext={changeContext}
            />
          )) ||
          null
        }
      />

      <SearchableList
        searchEnabled={searchAvailable}
        initialValue={q}
        onSearch={onSearch}
        placeholder="UserID | Username"
        items={onlineGames}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item.userID);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(selectedContext, nextPageToken, q)}
      />
    </div>
  );
  renderMaster.propTypes = {
    actions: PropTypes.object.isRequired,
  };

  const renderDetail = () => <OnlineGameDetails />;

  const renderEmpty = () => <OnlineGameDetailsEmpty />;

  return (
    <section className="online-games">
      <div className="online-games-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
};

OnlineGamesStateless.propTypes = {
  reduxProps: PropTypes.shape({
    onlineGames: PropTypes.arrayOf(PropTypes.object),
    nextPageToken: PropTypes.string,
    q: PropTypes.object,
    contexts: PropTypes.arrayOf(PropTypes.string),
    selectedContext: PropTypes.string,
    onClickListItem: PropTypes.func,
    onShowMore: PropTypes.func,
    searchAvailable: PropTypes.bool,
  }).isRequired,
  reactProps: PropTypes.shape({
    onSearch: PropTypes.func,
    changeContext: PropTypes.func,
  }).isRequired,
};

export default OnlineGamesStateless;
