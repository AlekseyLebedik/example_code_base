import { selectGroup } from 'dw/core/components/EventsCalendar/helpers';
import { customDateComparator, dateValueGetter } from './helpers';
import { DateCellRenderer, TitleLinkRenderer } from './cellRenderers';
import styles from './index.module.css';

export const colDefs = eventGroups => ({
  columnDefs: [
    {
      cellRenderer: 'titleLink',
      cellRendererParams: { eventGroups },
      field: 'title',
      filter: 'agTextColumnFilter',
      headerName: 'Title',
      cellClass: [styles.eventListCells, styles.noBorder],
    },
    {
      field: 'eventGroupName',
      filter: 'agTextColumnFilter',
      headerName: 'Event Group',
      cellClass: [styles.eventListCells, styles.noBorder],
    },
    {
      field: 'status',
      filter: 'agTextColumnFilter',
      headerName: 'Status',
      cellClass: [styles.eventListCells, styles.noBorder],
    },
    {
      comparator: customDateComparator,
      field: 'startDate',
      filter: 'agTextColumnFilter',
      headerName: 'Start Date',
      valueGetter: params => dateValueGetter(params.data.startDate),
      cellRenderer: 'dateCell',
      sort: 'desc',
      cellClass: [styles.eventListCells, styles.noBorder],
    },
    {
      comparator: customDateComparator,
      field: 'endDate',
      filter: 'agTextColumnFilter',
      headerName: 'End Date',
      valueGetter: params => dateValueGetter(params.data.event.end_at),
      cellRenderer: 'dateCell',
      cellClass: [styles.eventListCells, styles.noBorder],
    },
  ],
  defaultColDef: {
    filter: true,
    lockPosition: true,
    menuTabs: ['filterMenuTab'],
    resizable: true,
    sortable: true,
  },
  supressCellSelection: true,
  domLayout: 'normal',
  components: {
    titleLink: TitleLinkRenderer,
    dateCell: DateCellRenderer,
  },
  onGridSizeChanged: params => params.api.sizeColumnsToFit(),
  pagination: true,
  paginationPageSize: 10,
});

const customOnCellClicked = ({ data, colDef }, eventGroups) => {
  if (colDef.field !== 'startDate' && colDef.field !== 'endDate') {
    const eventGroupProps = selectGroup(eventGroups, data.eventGroup);
    return eventGroupProps.onSelectEvent(data.event);
  }
  return null;
};

export const cellDefs = eventGroups => ({
  onCellClicked: gridProps => customOnCellClicked(gridProps, eventGroups),
});
