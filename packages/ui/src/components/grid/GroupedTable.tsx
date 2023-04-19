import { Fragment } from 'react';

export interface GroupedTableProps {
  data: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

/**
 * Component for displaying data in grouped tables. The data is grouped by the
 * first level of the object.
 */
const GroupedTable: React.FC<GroupedTableProps> = ({ data }) => {
  return (
    <>
      {Object.keys(data).map((group) => (
        <div
          key={group}
          role='table'
          className='border-base-800 divide-base-800 mb-2 grid grid-cols-2 divide-y rounded-sm border'
        >
          <h3 className='font-title bg-base-900 col-span-2 px-2 text-lg font-semibold uppercase'>
            {group}
          </h3>

          {Object.keys(data[group]).map((key) => (
            <Fragment key={key}>
              <span
                role='cell'
                className='border-base-800 text-base-200 border-r px-2 py-1.5'
              >
                {key}
              </span>
              <span role='cell' className='text-base-200 px-2 py-1.5'>
                {data[group][key]}
              </span>
            </Fragment>
          ))}
        </div>
      ))}
    </>
  );
};

export default GroupedTable;
