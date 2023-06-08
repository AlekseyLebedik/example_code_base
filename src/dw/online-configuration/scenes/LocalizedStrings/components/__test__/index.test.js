import React from 'react';
import { shallow } from 'enzyme';
import ContextSelector from '../ContextSelector';
import StringSetNameSelector from '../StringSetNamesSelector';
import DetailsRenderer from '../DetailsRenderer';
import UploadStringSet from '../UploadStringSet';

const context = 'atvi';
const stringSetName = 'presence';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  connect: () => Component => Component,
  useDispatch: () => mockDispatch,
}));

describe('View Localized Strings', () => {
  it('displays contexts', () => {
    const list = shallow(
      <ContextSelector
        selectedContext={context}
        setSelectedContext={() => {}}
        isLoading={false}
        setLoading={() => {}}
        setContextUploaded={() => {}}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('displays contexts loading', () => {
    const list = shallow(
      <ContextSelector
        selectedContext={context}
        setSelectedContext={() => {}}
        isLoading
        setLoading={() => {}}
        setContextUploaded={() => {}}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('displays string set names', () => {
    const list = shallow(
      <StringSetNameSelector
        context={context}
        stringSetName={stringSetName}
        setStringSetName={() => {}}
        isLoading={false}
        setLoading={() => {}}
        setContextUploaded={() => {}}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('displays string set names loading', () => {
    const list = shallow(
      <StringSetNameSelector
        context={context}
        stringSetName={stringSetName}
        setStringSetName={() => {}}
        isLoading
        setLoading={() => {}}
        setContextUploaded={() => {}}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('displays string sets', () => {
    const list = shallow(
      <DetailsRenderer
        context={context}
        stringSetName={stringSetName}
        uploaded={false}
        setUpload={() => {}}
        isLoading={false}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('displays string sets loading', () => {
    const list = shallow(
      <DetailsRenderer
        context={context}
        stringSetName={stringSetName}
        uploaded={false}
        setUpload={() => {}}
        isLoading
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('uploads string sets', () => {
    const list = shallow(
      <UploadStringSet
        context={context}
        stringSetName={stringSetName}
        setUpload={() => {}}
        visible
        setOpen={() => {}}
      />
    );
    expect(list).toMatchSnapshot();
  });
  it('upload form does not appear when not visible', () => {
    const list = shallow(
      <UploadStringSet
        context={context}
        stringSetName={stringSetName}
        setUpload={() => {}}
        visible={false}
        setOpen={() => {}}
      />
    );
    expect(list).toMatchSnapshot();
  });
});
