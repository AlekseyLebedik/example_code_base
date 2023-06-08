import { YesNoFromBool, NoSetWhenNull } from 'dw/core/helpers/api-data-parser';
import {
  RARITY_TYPES,
  CATEGORIES,
} from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/constants';

const parseType = type => type && parseInt(type, 10);

const typeCellFormatter = params => {
  const type = params.data?.itemType;
  const {
    context: { itemTypeConfigOptions },
  } = params;
  return (
    (itemTypeConfigOptions && itemTypeConfigOptions[parseType(type)]) ||
    CATEGORIES[parseType(type)] ||
    'Not set'
  );
};

const subTypeCellFormatter = params => {
  const subType = params.data?.itemSubType;
  return RARITY_TYPES[parseType(subType)] || 'Not set';
};

export const COLUMNS = [
  {
    headerName: 'Item ID',
    dataIndex: 'itemID',
    field: 'itemID',
    minWidth: 50,
  },
  {
    headerName: 'Name',
    dataIndex: 'itemName',
    field: 'itemName',
    minWidth: 200,
  },
  {
    headerName: 'Type',
    valueFormatter: typeCellFormatter,
    minWidth: 100,
  },
  {
    headerName: 'Sub-Type',
    valueFormatter: subTypeCellFormatter,
    minWidth: 100,
  },
  {
    headerName: 'Consumable',
    valueGetter: params => YesNoFromBool(params.data?.isConsumable),
    minWidth: 50,
  },
  {
    headerName: 'Max Quantity',
    valueGetter: params => NoSetWhenNull(params.data?.maxQuantity),
    minWidth: 100,
  },
  {
    headerName: 'Expirable',
    valueGetter: params => YesNoFromBool(params.data?.isExpirable),
    minWidth: 50,
  },
  {
    headerName: 'Max Usage Time',
    valueGetter: params => NoSetWhenNull(params.data?.maxUsageTime),
    minWidth: 100,
  },
];
