import {hasHistory} from 'dva/router';
import {create, remove, update, query} from '../services/users';

export default {

  namespace: 'users',

  state: {
    list: [],
    total: null,
    loading: false,
    current: null,
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

  effects: {
    *query({payload},{select, call, put}){
       yield put({type: 'showLoading'});
       console.log('asdfsdfsd');
       const {data} = yield call(query);
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
    *create(){},
    *'delete'({payload},{select, call, put}){
      yield put({type: 'showLoading'});
      const { data } = yield call(remove, {id: payload});
      if(data && data.success){
        yield put({type: 'deleteSuccess', payload});
      }
    },
    *update(){}
  },

  reducers: {
    showLoading(state, action){
       return {...state, loading:true};
    },
    showModal(){},
    hideModal(){},
    querySuccess(state, action){
      return {...state, ...action.payload, loading:false};
    },
    createSuccess(){},
    deleteSuccess(state, action){
      const id = action.payload;
      const newList = state.list.filter(user => user.id != id);
      return {...state, list: newList, loading:false};
    },
    updateSuccess(){}
  }

}
