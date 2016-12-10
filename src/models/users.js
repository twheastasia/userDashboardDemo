import {hasHistory} from 'dva/router';
import {create, remove, update, query} from '../services/users';
import { parse } from 'qs';

export default {

  namespace: 'users',

  state: {
    list: [],
    field: '',
    keyword: '',
    total: null,
    loading: false,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },

  subscriptions:{
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname === "/users"){
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    }
  },

// 定义了增删查改
  effects: {
    *query({payload},{select, call, put}){
      yield put({type: 'showLoading'});
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, field: '', keyword: '', ...payload },
      });
       const {data} = yield call(query, parse(payload));
       if(data){
         yield put({
           type: 'querySuccess',
           payload: {
             list: data.data,
             total: data.page.total,
             current: data.page.current
           }
         });
       }
    },
    *create({ payload }, { select, call, put }){
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          },
        });
      }
    },
    *'delete'({payload},{select, call, put}){
      yield put({type: 'showLoading'});
      const { data } = yield call(remove, {id: payload});
      if(data && data.success){
        yield put({type: 'deleteSuccess', payload});
      }
    },
    *update({ payload }, { select, call, put }){
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = { ...payload, id };
      const { data } = yield call(update, newUser);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newUser,
        });
      }
    }
  },

  reducers: {
    showLoading(state, action){
       return {...state, loading:true};
    },
    showModal(state, action){
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state, action){
      return { ...state, modalVisible: false };
    },
    querySuccess(state, action){
      return {...state, ...action.payload, loading:false};
    },
    createSuccess(state, action){
      // const newUser = action.payload;
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(state, action){
      const id = action.payload;
      const newList = state.list.filter(user => user.id != id);
      return {...state, list: newList, loading:false};
    },
    updateSuccess(state, action){
      const updateUser = action.payload;
      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
  }

}
