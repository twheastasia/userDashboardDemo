import React, {Component, PropTypes} from 'react';

import {Table, message, Popconfirm} from 'antd';

const UserList = ({
  total,
  current,
  loading,
  dataSource,
  onDeleteItem
}) => {
  const colums = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="#">{text}</a>
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <p>
          <a onClick={() => {}}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要删除吗?" onConfirm={()=>onDeleteItem(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </p>
      )
    }
  ];
  const pagination = {
     total,
     current,
     pageSize: 10,
     onChange: () => {}
  };

  return (
    <div>
      <Table columns={colums} dataSource={dataSource} loading={loading} rowKey={record => record.id} pagination={pagination}/>
    </div>
  );
};

UserList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default UserList;
