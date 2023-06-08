import mockState from './mockState';

export const { templates } = mockState.Scenes.Event.activity.pyscripts;
export const pyScript = templates[1];

const schemaFormData = {
  template_id: 'weapon_drop',
  inputs: [
    { key: 'weapon_type', value: '' },
    { key: 'attachment_icons', value: [] },
    { key: 'cost', value: '' },
    { key: 'attachments', value: ['test', 'good'] },
  ],
};

export const schemaFormProps = {
  schema: pyScript.schema,
  data: schemaFormData,
  gridOptions: {},
  needsUpdate: false,
  onSchemaModelUpdate: jest.fn(),
  onVersionUpdate: jest.fn(),
  handleChange: jest.fn(),
  handleDelete: jest.fn(),
  onUpdate: jest.fn(),
};
