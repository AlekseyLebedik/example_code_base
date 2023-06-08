import React from 'react';
import { shallow } from 'enzyme';
import AccountsAccordionParent, {
  AccountsAccordionChild,
  AccountsAccordionContent,
  mergeStyles,
} from '../index';

const styles = {
  expandIcon: 'makeStyles-expandIcon-250',
  heading: 'makeStyles-heading-251',
  subHeading: 'makeStyles-subHeading-252',
  detailsRoot: 'makeStyles-detailsRoot-253',
  details: 'makeStyles-details-254',
};

const extraStyles = {
  heading: 'makeStyles-heading-255',
  subHeading: 'makeStyles-subHeading-256',
  details: 'makeStyles-details-257',
};

describe('AccountsAccordion', () => {
  describe('component', () => {
    it('correctly render AccountsAccordion', () => {
      const title = 'test header';
      const subHeading = { SubHeadingComponent: () => 'test subheading' };
      const root = shallow(
        <AccountsAccordionParent title={title} subHeading={subHeading} />
      );
      expect(root).toMatchSnapshot();
    });
  });
  describe('mergeStyles', () => {
    const classes = mergeStyles(styles, extraStyles);
    it('correctly combines similar styles', () => {
      expect(classes.heading).toEqual(
        'makeStyles-heading-251 makeStyles-heading-255'
      );
    });
    it('keeps classes as they are when no duplicates', () => {
      expect(classes.expandIcon).toEqual('makeStyles-expandIcon-250');
    });
    it('returns the correct number of classes', () => {
      expect(Object.keys(classes).length).toEqual(5);
    });
  });
});

describe('AccountAccordionChild', () => {
  describe('component', () => {
    it('correctly render AccountAccordionChild', () => {
      const title = 'test header';
      const subHeading = { SubHeadingComponent: () => 'test subheading' };
      const root = shallow(
        <AccountsAccordionChild title={title} subHeading={subHeading} />
      );
      expect(root).toMatchSnapshot();
    });
  });
});

describe('AccountAccordionContent', () => {
  describe('component', () => {
    it('correctly set header and subheader for AccountAccordionContent', () => {
      const title = 'test header';
      const details = {
        DetailsComponent: () => <div />,
        detailsProps: {},
      };
      const subHeading = {
        SubHeadingComponent: () => 'test subheading',
        subHeadingProps: {},
      };
      const root = shallow(
        <AccountsAccordionContent
          details={details}
          styles={mergeStyles(styles)}
          subHeading={subHeading}
          title={title}
        />
      );
      expect(root).toMatchSnapshot();
      expect(root.find({ className: 'makeStyles-heading-251' })).toHaveLength(
        1
      );
      expect(
        root.find({ className: 'makeStyles-subHeading-252' })
      ).toHaveLength(1);
    });
  });
});
