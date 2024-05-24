import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  id: string;
  name: string;
  email: string;
  badgeNumber: string;
  address: string;
  assignedCrime: string;
  department: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Badge No. ',
    dataIndex: 'badgeNumber',
    key: 'badgeNumber',
  },
  {
    title: 'Address',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Assigned Crime',
    key: 'assignedCrime',
    dataIndex: 'assignedCrime',
    render: (assignedCrime: string) => (
      <>
        {assignedCrime.split(',').map((crime) => {
          let color = crime.length > 5 ? 'geekblue' : 'green';
          if (crime === 'Fraud') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={crime}>
              {crime.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    render: (department: string) => (
      <Tag color={department === 'Criminal' ? 'red' : 'blue'} key={department}>
        {department.toUpperCase()}
      </Tag>
    ),
  },
];

interface propsType {
  data: DataType[];
}
const TableComponent = (props: propsType) => {
  const { data } = props;
  return (
    <div className=" w-full  flex items-center justify-center ">
      <Table className="w-3/4" columns={columns} dataSource={data} />
    </div>
  );
};

export default TableComponent;
