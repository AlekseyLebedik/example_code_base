import React from 'react';
import { schemaFormProps as props } from 'playpants/testUtils/schemaFormProps';

import Textbox from '../components/Textbox';
import FileUpload from '../components/FileUpload';

import * as helpers from '../helpers';

describe('PyScript', () => {
  describe('helpers', () => {
    describe('splitName', () => {
      it('returns input and index from a name', () => {
        const e = { target: { name: 'attachments 1' } };
        const { input, index } = helpers.splitName(e, props);
        expect(input).toEqual({ key: 'attachments', value: ['test', 'good'] });
        expect(index).toEqual('1');
      });
    });

    describe('uniqueTest', () => {
      it('returns true if change value is unique amoung input array', () => {
        const e = { target: { name: 'attachments 1', value: 'new' } };
        const unique = helpers.uniqueTest(e, props);
        expect(unique).toEqual(true);
      });
      it('returns false if change value is not unique amoung input array', () => {
        const e = { target: { name: 'attachments 1', value: 'test' } };
        const unique = helpers.uniqueTest(e, props);
        expect(unique).toEqual(false);
      });
    });

    describe('formatRowData', () => {
      it('returns row data as an array of {key, input} objects with defined component', () => {
        const rowData = helpers.formatRowData(props);
        expect(rowData).toEqual([
          {
            input: (
              <Textbox
                deletable={false}
                handleChange={props.handleChange}
                handleDelete={props.handleDelete}
                label="weapon_type"
                properties={{ maxLength: 15, minLength: 3, type: 'string' }}
                uniqueItems={false}
                value=""
              />
            ),
            key: 'weapon_type',
          },
          {
            group: 'attachment_icons [0]',
            input: (
              <FileUpload
                deletable={false}
                handleChange={props.handleChange}
                handleDelete={props.handleDelete}
                label="attachment_icons (1)"
                properties={{
                  contentEncoding: 'base64',
                  contentMediaType: 'image/png',
                  type: 'string',
                }}
                data={props.data}
                uniqueItems
                value={{}}
              />
            ),
            key: 'attachment_icons (1)',
          },
          {
            input: (
              <Textbox
                deletable={false}
                handleChange={props.handleChange}
                handleDelete={props.handleDelete}
                label="cost"
                properties={{ minimum: 10, multipleOf: 10, type: 'number' }}
                uniqueItems={false}
                value=""
              />
            ),
            key: 'cost',
          },
          {
            group: 'attachments [2]',
            input: (
              <Textbox
                deletable
                handleChange={props.handleChange}
                handleDelete={props.handleDelete}
                label="attachments (1)"
                properties={{ maxLength: 15, type: 'string' }}
                data={props.data}
                uniqueItems
                value="test"
              />
            ),
            key: 'attachments (1)',
          },
          {
            group: 'attachments [2]',
            input: (
              <Textbox
                deletable
                handleChange={props.handleChange}
                handleDelete={props.handleDelete}
                label="attachments (2)"
                properties={{ maxLength: 15, type: 'string' }}
                data={props.data}
                uniqueItems
                value="good"
              />
            ),
            key: 'attachments (2)',
          },
          {
            group: 'attachments [2]',
            input: (
              <Textbox
                deletable={false}
                handleChange={props.handleChange}
                handleDelete={props.handleDelete}
                label="attachments (3)"
                properties={{ maxLength: 15, type: 'string' }}
                data={props.data}
                uniqueItems
                value=""
              />
            ),
            key: 'attachments (3)',
          },
        ]);
      });
    });
  });
});
