import React from 'react';
import { shallow } from 'enzyme';
import TextFieldQueues from '../index';
import styles from '../../../index.module.css';
import NumberFormatCustom from '../../CustomFormatInputBox';

describe('LoginQueueSettings - TextField', () => {
  it('Text field check', () => {
    const textfieldqueue = shallow(
      <TextFieldQueues
        className={styles.loginQueueFormInput}
        value={300000}
        disabled={false}
        onChange={() => null}
        key="maxCCU"
        name="maxCCU"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    );
    expect(textfieldqueue).toMatchSnapshot();
  });
});
