/* eslint-disable no-cond-assign */
import React, { Component } from 'react';
import { Card, Button, Radio, Table, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { getRoleListAsync, addRoleAsync, updateRoleAsync } from '../../redux/actions';
import UpdateRoleForm from '../Role/update-role-form';
import AddRoleForm from '../Role/add-role-form';

const { Group } = Radio;

@connect(state => ({ roles: state.roles ,user:state.user}), {
  getRoleListAsync,
  addRoleAsync,
  updateRoleAsync
})
class Role extends Component {
  state = {
    isLoading: false,
    isShowAddRoleModal: false,// 是否显示添加角色Modal
    isShowUpdateRoleModal: false,// 授予权限Modal
    role: {} // 选中角色的数据 有值说明有被选中
  };

  // 缓存数据
  columns = [
    {
      // 注意：如果不写dataIndex就会报错。
      dataIndex: '_id',
      render: id => {
        return <Radio key={id} value={id} />;
      }
    },
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      title: '授权时间',
      dataIndex: 'authTime',
      render: time => {
        // 如果没有授权，time为undefined，不应该显示授权时间
        return time && dayjs(time).format('YYYY/MM/DD HH:mm:ss');
      }
    },
    {
      title: '授权人',
      dataIndex: 'authName'
    }
  ];

  // 发送请求，获取角色数据
  componentDidMount() {
    this.setState({ // 打开加载效果
      isLoading: true
    });
    this.props
      .getRoleListAsync()
      .then(() => {
        message.success('获取角色列表数据成功');
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        this.setState({ // 关闭加载状态
          isLoading: false
        });
      });
  }

  // 显示添加角色Modal
  /* showAddRoleModal = () => {
    this.setState({
      isShowAddRoleModal: true
    })
  }

  hiddenAddRoleModal = () => {
    this.setState({
      isShowAddRoleModal: false
    })
  } */

  handleRadioChange = e => {
    // 角色id
    const id = e.target.value;
    // 找出对应的角色数据
    const role = this.props.roles.find(role => role._id === id);
    // 作为state中的role状态
    this.setState({
      role // role有值则说明有被选择的
    })
  }

  // 复用函数，封装成高阶函数 隐藏显示两个Model
  switchModal = (value, key) => { // 状态的value  状态的名字
    return () => {
      if (!value) {
        // 如果隐藏对话框，需要将用户输入给清空
        if (key === 'isShowAddRoleModal') { // 如果是添加角色 取消则清空输入框
          this.addRoleForm.props.form.resetFields();
        }
      }
      this.setState({
        [key]: value
      });
    };
  };

  // 添加角色
  addRole = () => {
    // 校验表单并收集数据
    // console.log(this.addRoleForm);
    const { validateFields, resetFields } = this.addRoleForm.props.form;
    validateFields((err, values) => {
      if (!err) {
        // 表单校验成功
        const { name } = values;
        // 发送请求，创建角色
        this.props
          .addRoleAsync(name)
          .then(() => {
            message.success('创建角色成功~');
            // 隐藏对话框
            this.setState({
              isShowAddRoleModal: false
            });
            // 清空表单数据
            resetFields();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  // 更新用户权限 
  updateRole = () => {
    const { validateFields, resetFields } = this.updateRoleForm.props.form;
    validateFields((err, values) => {
      if (!err) {
        const { menus } = values; // 权限列表
        const roleId = this.state.role._id; // 更新权限对象的id
        const authName = this.props.user.user.username; // 当前用户名 修改人 redux管理的user可获取
        // 发送请求时，数组/对象数据需要转换成JSON才能发送过去
        this.props.updateRoleAsync({ menus: JSON.stringify(menus), roleId, authName })
          .then((res) => {
            message.success('设置权限成功');
            this.setState({
              isShowUpdateRoleModal: false,
              // 更新Role组件自己的状态role，从而才能通过props的方式 更新 UpdateRoleForm接受的props
              role: res
            });
            // 清空输入框
            resetFields();
          })
          .catch((err) => {
            message.error(err)
          })
      }
    })

  }
  render() {
    const { isLoading, isShowAddRoleModal, role, isShowUpdateRoleModal } = this.state;
    const { roles } = this.props;

    return (
      <Card
        title={
          <div>
            <Button type='primary' onClick={this.switchModal(true, 'isShowAddRoleModal')}>
              创建角色
            </Button>{' '}
            &nbsp;&nbsp;
            <Button type='primary' disabled={!role._id} onClick={this.switchModal(true, 'isShowUpdateRoleModal')}>
              设置角色权限
            </Button>
          </div>
        }
      >
        {/* 
          Group 包裹 Table。因为 Table 有 Radio 
          这样就能让 Radio 变成单选
        */}
        <Group style={{ width: '100%' }} onChange={this.handleRadioChange}>
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey='_id' // 获取选中对象 则可以获得选中角色的roleId
            loading={isLoading}
            onChange={this.handleRadioChange} // 收集选中的用户数据
          />
        </Group>

        <Modal
          title='创建角色'
          visible={isShowAddRoleModal}
          onOk={this.addRole}
          onCancel={this.switchModal(false, 'isShowAddRoleModal')}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>

        <Modal
          title='设置权限'
          visible={isShowUpdateRoleModal}
          onOk={this.updateRole}
          onCancel={this.switchModal(false, 'isShowUpdateRoleModal')}
        >
          <UpdateRoleForm role={role}
            wrappedComponentRef={form => (this.updateRoleForm = form)} />
        </Modal>
      </Card>
    );
  }
}

export default Role;
