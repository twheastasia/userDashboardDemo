import React, {PropTypes} from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

// css style
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

// stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const UserModal = ({
	visible, //是否可见
  	item = {}, // ???
  	onOk, //处理提交事件
  	onCancel, //默认关闭对话框
  	//form中默认api?
  	form: {
    	getFieldDecorator,
    	validateFields,
    	getFieldsValue,
    },
}) => {

	function handleOk() {
		//  有错误就退出，没有错误就提交表单
	    validateFields((errors) => {
	      if (errors) {
	        return;
	      }
	      const data = { ...getFieldsValue(), key: item.key };
	      onOk(data);
	    });
	  }

	  function checkNumber(rule, value, callback) {
	    if (!value) {
	      callback(new Error('年龄未填写'));
	    }
	    if (!/^[\d]{1,2}$/.test(value)) {
	      callback(new Error('年龄不合法'));
	    } else {
	      callback();
	    }
	  }

	  const modalOpts = {
	    title: '修改用户',  //对话框标题
	    visible, //是否可见
	    onOk: handleOk, //处理提交事件
	    onCancel,
	  };

	  return (
	    <Modal {...modalOpts}>
	      <Form horizontal>
	        <FormItem
	          label="姓名："
	          hasFeedback
	          {...formItemLayout}
	        >
	          {getFieldDecorator('name', {
	            initialValue: item.name,
	            rules: [
	              { required: true, message: '名称未填写' },
	            ],
	          })(
	            <Input type="text" />
	          )}
	        </FormItem>
	        <FormItem
	          label="年龄："
	          hasFeedback
	          {...formItemLayout}
	        >
	          {getFieldDecorator('age', {
	            initialValue: item.age,
	            rules: [
	              { validator: checkNumber },
	            ],
	          })(
	            <Input type="text" />
	          )}
	        </FormItem>
	        <FormItem
	          label="住址："
	          hasFeedback
	          {...formItemLayout}
	        >
	          {getFieldDecorator('address', {
	            initialValue: item.address,
	            rules: [
	              { required: true, message: '不能为空' },
	            ],
	          })(
	            <Input type="address" />
	          )}
	        </FormItem>
	      </Form>
	    </Modal>
	  );
};


UserModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(UserModal);

