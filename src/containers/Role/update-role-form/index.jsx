import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import menus from '../../../config/meaus'
const { Item } = Form;
const { TreeNode } = Tree;
@Form.create()
class UpdateRoleForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  };
  // treeNode的渲染过程 以左边导航的渲染路径对象menus作为参数
  renderTreeNodes = menus => {
    return menus.map(item => {
      if (item.children) { // 如果有子菜单（有第二层菜单）
        return (
          <TreeNode
            title={<FormattedMessage id={item.title} />} // 显示文字是 menus的titile
            key={item.path}
            dataRef={item}
          >
          {/* 内部递归调用，直到把所以tree节点都遍历完 */}
            {this.renderTreeNodes(item.children)} 
          </TreeNode>
        );
      }
      return (  // 如果是一层菜单（没有子菜单了） 则直接返回 将数据代入 显示内容为左边栏的菜单的title key为path
        <TreeNode
          title={<FormattedMessage id={item.title} />}
          key={item.path}
        />
      );
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form; // 表单验证
    const { role } = this.props; // 当前选中的用户信息
    return (
      <Form>
        <Item label='角色名称'>
          {getFieldDecorator('name', {
            initialValue: role.name// 显示内容是当前角色的名字
          })(<Input disabled />)}
        </Item>
        <Item>
          {getFieldDecorator('menus', {
            trigger: 'onCheck', // 点击触发
            valuePropName: 'checkedKeys', // 默认值value
            initialValue: role.menus // 显示内容是当前角色的权限
          })(
            // 默认展开
            <Tree checkable={true} defaultExpandAll>
              {/* 最上层默认存在 */}
              <TreeNode title='平台权限' key='0'>
                {this.renderTreeNodes(menus)}
              </TreeNode>
            </Tree>)}

        </Item>
      </Form>
    )
  }
}
export default UpdateRoleForm;