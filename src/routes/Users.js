import React, {PropTypes} from 'react';
import {connect} from 'dva';

import UserList from '../components/Users/UserList.js';
import UserModal from '../components/Users/UserModal.js';
import UserSearch from '../components/Users/UserSearch.js';

import styles from './Users.less';

function Users({location, dispatch, users}){

  const {loading, list, total, current, currentItem, modalVisible, modalType} = users;

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
  };
  const userModalProps = {};

  return (
    <div className={styles.normal}>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModal {...userModalProps} />
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.object
};

function mapStateToProps({users}){
   return {users};
}

export default connect(mapStateToProps)(Users);
