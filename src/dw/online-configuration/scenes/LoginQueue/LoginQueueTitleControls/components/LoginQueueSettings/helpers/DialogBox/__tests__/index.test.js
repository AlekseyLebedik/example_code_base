import React from 'react';
import { shallow } from 'enzyme';
import LoginQueueDialog from '../index';

describe('LoginQueueSettings', () => {
  it('display login queue dialog', () => {
    const loginQueueDialog = shallow(
      <LoginQueueDialog
        handleClose={() => null}
        handleSave={() => null}
        openDialog
        handleCancel={() => null}
        handleClickOpen={() => null}
        keyName="LoginQueueSettings"
        disabledBtn={{ save: true, cancel: false }}
        subText="Sub Text for Login Queue Dialog"
      >
        <>adding unit tests</>
      </LoginQueueDialog>
    );
    expect(loginQueueDialog).toMatchSnapshot();
  });
});
