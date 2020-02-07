import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Radio, Table, message, Modal } from 'antd'
import { getRoleListAsync, addRoleAsync } from '../../redux/actions'
import AddRoleForm from './add-role-form/AddRoleForm'
import dayjs from 'dayjs'
const { Group } = Radio;
@connect(state => ({ roles: state.roles }), { getRoleListAsync, addRoleAsync })
class Role extends Component {
  state = {
    isLoadding: false,
    showAdd: false
  }
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
  componentDidMount() {
    this.setState({
      isLoadding: true
    })
    // 组件加载完后 请求角色列表
    this.props.getRoleListAsync()
      .then(() => {
        message.success('用户列表请求成功');
      })
      .catch((err) => { // 失败提示错误信息
        message.error(err)
      })
      .finally(() => {
        this.setState({
          isLoadding: false // 关闭加载状态
        })
      })
  }
  // 显示创建用户弹窗
  showAddRoleForm = showAdd => {
    if (!showAdd) { // 如果关闭弹窗 则清空添加用户的input
      this.addRoleForm.props.form.resetFields.resetFields();
    }
    return () => {
      this.setState({ showAdd })
    }
  }
  // 添加角色
  addRole = () => {
    const { validateFields, resetFields } = this.addRoleForm.props.form;
    validateFields((err, values) => {
      if (!err) {
        // 收集子组件的数据
        const { name } = values;
        this.props.addRoleAsync(name.trim())
          .then(() => {
            message.success('添加用户成功')
            this.setState({
              showAdd: false // 关闭弹窗
            })
            // 清空表单数据
            resetFields();
          })
          .catch((err) => {
            message.error(err)
          })
      }
    })

  }
  render() {
    const { isLoadding, showAdd } = this.state;
    const { roles } = this.props;
    return (
      <Card title={
        <div>
          <Button type='primary' onClick={this.showAddRoleForm(true)}>
            创建角色
          </Button>{' '}
          &nbsp;&nbsp;
          <Button type='primary' disabled>
            设置角色权限
          </Button>
        </div>
      }>
        <Group style={{ width: '100%' }}>
          <Table
            columns={this.columns}
            bordered
            rowKey='_id'
            dataSource={roles}
            loading={isLoadding}
          />
        </Group>

        <Modal
          visible={showAdd}
          title='创建角色'
          onOk={this.addRole}
          onCancel={this.showAddRoleForm}
        >
          <AddRoleForm
            // 获取子组件的表单内容
            wrappedComponentRef={form => (this.addRoleForm = form)} />
        </Modal>
      </Card>
    )
  }
}
export default Role;