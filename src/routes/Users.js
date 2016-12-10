import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import UserList from '../components/Users/UserList.js';
import UserModal from '../components/Users/UserModal.js';
import UserSearch from '../components/Users/UserSearch.js';
import MainLayout from '../components/MainLayout/MainLayout';

import styles from './Users.less';

function Users({location, dispatch, users}){

  const {loading, list, total, current, currentItem, modalVisible, modalType, field, keyword} = users;

  const userSearchProps = {};
  const userListProps = {
    dataSource: list,
    total,
    loading,
    current,
    onDeleteItem(id){
      dispatch({
        type: "users/delete",
        payload: id,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/users',
        query: { field, keyword, page },
      }));
    },
  };
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'users/hideModal',
      });
    },
  };

  const UserModalGen = () =>
    <UserModal {...userModalProps} />;

  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UserSearch {...userSearchProps} />
        <UserList {...userListProps} />
        <UserModalGen />
      </div>
    </MainLayout>
  );
}

Users.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({users}){
   return {users};
}

export default connect(mapStateToProps)(Users);
