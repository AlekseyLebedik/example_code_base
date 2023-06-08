import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';

import Empty from 'dw/core/components/Empty';

import AccountsAccordion from 'dw/player-tooling/components/AccountsAccordion';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import {
  GridLayout,
  GridCol,
  GridItem,
} from 'dw/player-tooling/components/GridLayout';
import TitleLink from '../TitleLink';

const useStyles = makeStyles(theme => ({
  mostRecent: {
    fontSize: '12px',
    fontWeight: 'normal',
    marginLeft: theme.spacing(2),
  },
}));

const DetailsRendererBase = ({
  data,
  DetailRenderer,
  noDataMsg,
  addMostRecent,
  linkToSection,
  formatData,
}) => {
  const classes = useStyles();
  const items = useMemo(() => formatData(data), [data, formatData]);
  return useMemo(
    () =>
      isEmpty(items) ? (
        <Empty>{noDataMsg}</Empty>
      ) : (
        <GridLayout>
          {Array.from(items)?.map(([title, values]) => (
            <GridCol key={title}>
              <GridItem>
                <AccountsAccordion
                  title={
                    <span className="flex items-center">
                      <TitleLink titleId={title} onClick={linkToSection} />
                      {addMostRecent ? (
                        <span className={classes.mostRecent}>Most recent</span>
                      ) : null}
                    </span>
                  }
                  details={{
                    DetailsComponent: DetailRenderer,
                    detailsProps: {
                      values,
                      titleId: title,
                    },
                  }}
                  defaultExpanded
                />
              </GridItem>
            </GridCol>
          ))}
        </GridLayout>
      ),
    // eslint-disable-next-line
    [items]
  );
};
DetailsRendererBase.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  DetailRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  formatData: PropTypes.func.isRequired,
  linkToSection: PropTypes.func.isRequired,
  noDataMsg: PropTypes.string.isRequired,
  addMostRecent: PropTypes.bool,
};
DetailsRendererBase.defaultProps = {
  addMostRecent: false,
};

const ServiceView = ({
  addMostRecent,
  customDataCheck,
  DetailRenderer,
  extraQueryParams,
  formatData,
  linkToSection,
  noDataMsg,
  path,
  query,
  skipIf,
  variables,
}) => {
  const DetailsRenderer = useCallback(
    ({ data }) => (
      <DetailsRendererBase
        data={data}
        addMostRecent={addMostRecent}
        linkToSection={linkToSection}
        formatData={formatData}
        noDataMsg={noDataMsg}
        DetailRenderer={DetailRenderer}
      />
    ),
    [addMostRecent, linkToSection, formatData, noDataMsg, DetailRenderer]
  );

  return (
    <GraphQLStateRenderer
      customDataCheck={customDataCheck}
      DetailsRenderer={DetailsRenderer}
      extraQueryParams={extraQueryParams}
      noDataMsg={noDataMsg}
      path={path}
      query={query}
      skipIf={skipIf}
      variables={variables}
    />
  );
};

ServiceView.propTypes = {
  addMostRecent: PropTypes.bool,
  customDataCheck: PropTypes.func,
  DetailRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  extraQueryParams: PropTypes.object,
  formatData: PropTypes.func.isRequired,
  linkToSection: PropTypes.func.isRequired,
  noDataMsg: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  skipIf: PropTypes.bool,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string,
    unoID: PropTypes.string,
  }).isRequired,
};
ServiceView.defaultProps = {
  addMostRecent: false,
  customDataCheck: () => true,
  extraQueryParams: {},
  skipIf: undefined,
};

export default ServiceView;
