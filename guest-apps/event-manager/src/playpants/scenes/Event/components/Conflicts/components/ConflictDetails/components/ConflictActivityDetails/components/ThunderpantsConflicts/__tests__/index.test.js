import React from 'react';
import { shallow } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';

import { thunderpantsConflictDetailsProps as props } from 'playpants/testUtils/eventProps';

import ThunderpantsConflicts from '../index';

describe('ThunderpantsConflicts', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ThunderpantsConflicts {...props} />);
  });

  it('renders correctly with no conflict details', () => {
    expect(wrapper.find(AgGridReact).props().rowData.length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with conflict details', () => {
    wrapper.setProps({
      details: [
        {
          uid: 'cd043371-4cf1-4f8a-af7c-c19283958600',
          build_uid:
            'b0022d8c636d58291b16dd61da22b7b41a20775c74139dad0faf728a8d832c5d',
          view_name: 'iw8linux',
          target_name: 'uidev:dev(mp)',
          user_params: {
            max_instances_per_machine: 10,
            extra_cmdline_args: '',
          },
          type: 'undeploy',
        },
      ],
    });
    expect(wrapper.find(AgGridReact).props().rowData.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
