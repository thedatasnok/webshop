import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Hint } from '@webshop/ui';
import clsx from 'clsx';
import { Fragment, useMemo, useState } from 'react';
import {
  RiAddLine,
  RiAlertLine,
  RiLock2Line,
  RiPencilLine,
} from 'react-icons/ri';
import { generateUniqueName } from './utils';

export interface ProductSpecificationRow {
  /**
   * The name of the specification, e.g. Color, Size, etc.
   */
  name: string;
  /**
   * The value of the specification, e.g. Red, 10x10, etc.
   */
  value: string;
  /**
   * Whether or not to lock the specification row.
   * This is typically whenever the specifications are derived from the products family.
   */
  locked?: boolean;
}

export interface ProductSpecificationTableProps {
  /**
   * The name of the table.
   */
  name: string;
  /**
   * Rows of the table.
   */
  rows: ProductSpecificationRow[];
  /**
   * Whether or not to lock the name of the table.
   * This is typically whenever the name is derived from the products family.
   */
  namelock?: boolean;
  /**
   * On change handler for the table.
   *
   * @param name
   * @param data
   * @returns
   */
  onChange: (name: string, data: ProductSpecificationRow[]) => void;
}

const ProductSpecificationTable: React.FC<ProductSpecificationTableProps> = ({
  name: initialName,
  onChange,
  namelock,
  rows: initialRows,
}) => {
  const [name, setName] = useState(initialName);
  const [rows, setRows] = useState<ProductSpecificationRow[]>(initialRows);
  const [isError, setIsError] = useState(false);

  const columns = useMemo<ColumnDef<ProductSpecificationRow>[]>(
    () => [
      {
        accessorKey: 'name',
      },
      {
        accessorKey: 'value',
      },
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setRows((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  const addRow = () => {
    setRows((prev) => {
      const names = prev.map((row) => row.name);
      const name = generateUniqueName('Specification', names);

      const newRow = {
        name,
        value: 'Value',
      };

      return [...prev, newRow];
    });
  };

  return (
    <div
      role='table'
      className='border-base-800 divide-base-800 mb-2 grid grid-cols-2 divide-y rounded-sm border'
    >
      <div
        role='heading'
        className={clsx(
          'bg-base-900 col-span-2 flex items-center justify-between px-2',
          isError && 'bg-error-400'
        )}
      >
        <input
          type='text'
          value={name}
          readOnly={namelock}
          onChange={(e) => setName(e.target.value)}
          className='font-title flex-1 border-0 bg-transparent p-0 text-lg font-semibold uppercase focus:ring-0'
        />

        <div className='relative flex items-center gap-1 px-0.5'>
          {namelock ? (
            <Hint icon={RiLock2Line} message='Defined by product family' />
          ) : (
            <Hint icon={RiPencilLine} message='Can be edited' />
          )}
        </div>
      </div>

      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <Fragment key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Fragment>
          ))}
        </Fragment>
      ))}

      <button
        type='button'
        onClick={addRow}
        className='text-base-400 hover:text-base-200 focus:text-base-200 col-span-2 flex items-center py-0.5 pl-1 pt-1 outline-none transition-colors hover:underline focus:underline'
      >
        <RiAddLine className='mb-0.5 h-4 w-4' />
        <span className='text-sm font-medium'>Add specification</span>
      </button>
    </div>
  );
};

/**
 * Module augmentation to define the `updateData` method on the `TableMeta` interface.
 */
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

/**
 * Cell renderer for the table.
 */
const defaultColumn: Partial<ColumnDef<ProductSpecificationRow>> = {
  cell: ({
    getValue,
    row: {
      index,
      original: { locked },
    },
    column: { id },
    table,
  }) => {
    const initialValue = getValue() as string;

    const isName = id === 'name';
    const isEmptyName = isName && initialValue.length === 0;
    const isDuplicateName =
      isName &&
      table
        .getRowModel()
        .rows.filter((row) => row.getValue(id) === initialValue).length > 1;

    return (
      <div className='relative flex'>
        <input
          type='text'
          value={initialValue}
          readOnly={locked}
          onChange={(e) =>
            table.options.meta?.updateData(index, id, e.target.value)
          }
          className={clsx(
            'focus:border-base-800 w-full border-0 border-transparent bg-transparent px-2 py-1.5 focus:ring-0',
            isEmptyName && 'bg-error-900/20',
            !locked && isDuplicateName && 'bg-warn-900/20 text-warn',
            isName && 'border-r-base-800 border-r',
            locked && 'bg-base-900/50'
          )}
        />

        {locked && (
          <Hint
            icon={RiLock2Line}
            message='Defined by product family'
            className='absolute right-2 top-1/2 -translate-y-1/2'
          />
        )}

        {!locked && isDuplicateName && (
          <Hint
            style='warn'
            icon={RiAlertLine}
            message='Names cannot be duplicated'
            className='absolute right-2 top-1/2 -translate-y-1/2'
          />
        )}

        {!locked && isEmptyName && (
          <Hint
            style='error'
            icon={RiAlertLine}
            message='Names cannot be empty'
            className='absolute right-2 top-1/2 -translate-y-1/2'
          />
        )}
      </div>
    );
  },
};

export default ProductSpecificationTable;
