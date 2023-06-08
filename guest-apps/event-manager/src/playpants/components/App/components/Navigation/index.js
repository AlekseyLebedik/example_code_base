import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import NavbarLayout from 'dw/core/components/NavbarLayout';
import { NavbarChildContainer } from '@demonware/devzone-core/NavigationBar';
import { RoutesContext } from 'dw/core/helpers/routes';
import ProjectSelector from '../ProjectSelector';
import SectionTitleWrapper, {
  SectionTitleContext,
} from '../SectionTitleWrapper';

import styles from './index.module.css';

const NavigationWithRoutesContext = ({ routes, basePath }) => {
  const { sectionTitle, subSectionTitle } = useContext(SectionTitleContext);
  useEffect(() => {
    document.title = `${sectionTitle} ${
      subSectionTitle ? `| ${subSectionTitle}` : ''
    } - Event Manager`;
  }, [sectionTitle, subSectionTitle]);

  return (
    <RoutesContext.Provider value={{ routes, basePath }}>
      <NavbarLayout>
        <NavbarChildContainer>
          <ProjectSelector
            className={styles.projectSelector}
            autoCompleteProps={{ variant: 'contrast', size: 'slim' }}
          />
        </NavbarChildContainer>
      </NavbarLayout>
    </RoutesContext.Provider>
  );
};

NavigationWithRoutesContext.propTypes = {
  basePath: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const NavigationWrapped = ({ routes, basePath }) => (
  <SectionTitleWrapper routes={routes}>
    <NavigationWithRoutesContext basePath={basePath} routes={routes} />
  </SectionTitleWrapper>
);

NavigationWrapped.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  basePath: PropTypes.string.isRequired,
};

export default NavigationWrapped;
