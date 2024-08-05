import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { data } from './makeData';

//defining columns outside of the component is fine, is stable

const dutyColumn = [
    {
        accessorKey: 'sunday',
        header: 'Sunday',
        size: 40,
    },
    {
        accessorKey: 'monday',
        header: 'Monday',
        size: 40,
    },
    {
        accessorKey: 'sunday',
        header: 'Sunday',
        size: 40,
    },
]

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'userName',
    header: 'Name',
    size: 220,
  },
  {
    accessorKey: 'userPosition',
    header: 'Position',
    size: 220,
  },
  {
    accessorKey: 'company',
    header: 'Company',
    size: 40,
  },
  {
    accessorKey: 'department',
    header: 'Department',
    size: 40,
  },
  {
    accessorKey: 'group',
    header: 'Group',
    size: 40,
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const BoxC = () => {
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          color="lightblue"
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default BoxC;