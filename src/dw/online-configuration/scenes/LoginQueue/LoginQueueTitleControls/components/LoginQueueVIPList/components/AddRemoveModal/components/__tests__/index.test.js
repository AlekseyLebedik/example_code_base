import React from 'react';
import { shallow } from 'enzyme';
import DeleteButton from '../deleteButton';
import BulkUpload from '../bulkUpload';
import HeaderDialogText from '../headerDialogText';
import {
  GamerTagCellRenderer,
  DeleteCellRenderer,
} from '../frameworkComponents';

describe('BulkUpload', () => {
  it('display BulkUpload Button for bulk add', () => {
    const bulkUploadBtn = shallow(
      <BulkUpload actionMode="add" onToggle={() => {}} isUploadBulk />
    );
    expect(bulkUploadBtn).toMatchSnapshot();
  });

  it('display BulkUpload Button for bulk remove', () => {
    const bulkUploadBtn = shallow(
      <BulkUpload actionMode="remove" onToggle={() => {}} isUploadBulk />
    );
    expect(bulkUploadBtn).toMatchSnapshot();
  });
});

describe('DeleteButton', () => {
  it('display Delete Button', () => {
    const deleteBtn = shallow(
      <DeleteButton onClick={() => {}} title="Delete Test" />
    );
    expect(deleteBtn).toMatchSnapshot();
  });
});

describe('HeaderDialogText', () => {
  it('display HeaderDialogText for adding gamertags', () => {
    const headerDialogText = shallow(
      <HeaderDialogText
        actionMode="add"
        onDeleteAll={() => {}}
        onToggle={() => {}}
        isUploadBulk={false}
      />
    );
    expect(headerDialogText).toMatchSnapshot();
  });

  it('display HeaderDialogText for removing gamertags', () => {
    const headerDialogText = shallow(
      <HeaderDialogText
        actionMode="remove"
        onDeleteAll={() => {}}
        onToggle={() => {}}
        isUploadBulk={false}
      />
    );
    expect(headerDialogText).toMatchSnapshot();
  });
});

describe('GamerTagCellRenderer', () => {
  it('display GamerTag', () => {
    const gamerTag = shallow(
      <GamerTagCellRenderer
        colDef={{
          addGamerTags: () => {},
          inputBoxGamerTags: () => {},
        }}
      />
    );
    expect(gamerTag).toMatchSnapshot();
  });
});

describe('DeleteCellRenderer', () => {
  it('display Delete Button Renderer', () => {
    const deleteBtn = shallow(
      <DeleteCellRenderer
        colDef={{
          cellRendererParams: {
            deleteGamerTag: () => {},
          },
        }}
        node={{
          rowPinned: false,
        }}
      />
    );
    expect(deleteBtn).toMatchSnapshot();
  });
});
