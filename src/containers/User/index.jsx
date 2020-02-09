import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Table, message, Modal } from 'antd'
import dayjs from 'dayjs'
import { getRoleListAsync } from '../../redux/actions'
import { reqGetUser, reqAddUser, reqDeleteUser, reqUpdateUser } from '../../api/index'
import UserForm from './user-form/index.jsx'

@connect(state => ({ roles: state.roles }), { getRoleListAsync })
class User extends Component {
  state = {
    users: [],
    isShowModel: false,
    isLoading: false,
    crruentUser: {}
  }

  // 缓存数据
  columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render: roleId => {
        const role = this.props.roles.find(role => role._id === roleId); // 根据roleId找出当前用户的橘色类型
        return role && role.name; // 无则返回undefined
      }
    },
    {
      title: '操作',
      // dataIndex: 'roleId',
      render: (user) => {
        return (
          <div>
            <Button type='link' onClick={this.switchModal(true, 'isShowModel', user)}>修改</Button>
            <Button type='link' onClick={this.deleteUser(user)}>删除</Button>
          </div>
        );
      }
    }
  ];

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    //  请求用户数据 动态展示
    reqGetUser()
      .then(res => {
        message.success('请求用户数据成功');
        this.setState({
          users: res // 用户数据存储在state的users中
        })
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })

    if (!this.props.roles.length) {
      this.props
        .getRoleListAsync()
        .then(() => {
          message.success('获取角色列表数据成功~');
        })
        .catch(err => {
          message.error(err);
        });
    }
  }
  // 展示Model
  switchModal = (value, key, user) => {
    return () => {
      if (value === false) {
        this.setState({
          crruentUser: {}, // 每次选中都把“当前用户”改成空对象
        })
      }
      if (user) {
        console.log(user)
        this.setState({
          [key]: value,
          crruentUser: user
        })
      } else {
        this.setState({
          [key]: value,
        })
      }
    }
  }
  // 添加用户
  addUser = () => {
    const { validateFields, resetFields } = this.userForm.props.form;
    const { crruentUser } = this.state;
    validateFields((err, values) => {
      if (!err) {
        if (!crruentUser.username) { // 没有crruentUser 是添加用户
          reqAddUser(values)
            .then((res) => {
              this.setState({
                // res刷新state 更新页面
                users: [...this.state.users, res],
                isShowModel: false
              })
              // 清空输入框
              resetFields()
            })
            .catch((err) => {
              message.error(err)
            })
        } else {
          // 修改用户信息
          const { username, password } = values;
          reqUpdateUser(username, password)
            .then((res) => {
              message.success(`用户“${res.username}”的密码修改成功`)
              this.setState({
                isShowModel: false
              })
            })
            .catch((err) => {
              message.error(err)
            })
        }

      }
    })
  }
  // 删除用户
  deleteUser = user => {
    return () => {
      Modal.confirm(
        {
          title: `你确定要删除用户“${user.username}”`,
          onOk: () => {
            reqDeleteUser(user.username) // 传id 请求参数
              .then((res) => {
                message.success('删除成功！')
                this.setState({
                  // 显示的用户列表 删掉和以及删除的用户
                  users: this.state.users.filter(item => (item._id !== user._id))
                })
              })
              .catch((err) => {
                message.error(err);
              })
          },
          onCancel: () => {
            // 关闭弹窗
            this.setState({ isShowDelete: false })
          }
        }
      )
    }
  }


  render() {
    const { roles } = this.props;
    const { users, isShowModel, isLoading, crruentUser } = this.state;

    console.log(users)
    return (
      <Card
        title={
          <Button type='primary' onClick={this.switchModal(true, 'isShowModel')}>
            添加用户
        </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey='_id'
          loading={isLoading}
        />

        <Modal
          title={crruentUser.username ? '修改用户信息' : '添加用户'}
          visible={isShowModel}
          onOk={this.addUser}
          onCancel={this.switchModal(false, 'isShowModel')}
        >
          <UserForm roles={roles} crruentUser={crruentUser} wrappedComponentRef={form => (this.userForm = form)} />
        </Modal>
      </Card>
    )
  }
}
export default User;