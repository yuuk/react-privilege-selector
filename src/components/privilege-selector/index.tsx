/**
 * 角色权限选择器
 */
import React from 'react';
import { Table, Checkbox } from 'antd';
import { isEmpty, cloneDeep, every } from 'lodash';
import {
    tree2List,
    tree2TableDataSource,
    getTreeNodeById,
    traverseTreeUp,
    traverseTreeDown,
    mapValuesToTree,
} from './service';
import { TreeNode, FlatTreeNode, IModule } from './interface';

interface IProps {
    value: Array<any>;
    options: Array<TreeNode>;
    onChange?: (ids: Array<any>) => void;
}

interface IState {
    treeData: Array<TreeNode>;
}

export class PrivilegeSelector extends React.Component<IProps, IState> {
    static defaultProps = {
        value: [],
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            treeData: [],
        };
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        const { options, value } = nextProps;
        const { treeData } = prevState;
        const isValidValue = every(value, (val) => typeof val === 'string');
        const val = isValidValue ? value : [];
        if ((!isEmpty(options) && isEmpty(treeData)) || !isEmpty(val)) {
            return {
                treeData: mapValuesToTree(options, val),
            };
        }
        return null;
    }

    handleChange = (value: any, e: any) => {
        const { treeData } = this.state;
        const newTreeData = cloneDeep(treeData);

        const currentNode = getTreeNodeById(newTreeData, value.id);

        if (!currentNode) return;

        currentNode.checked = e.target.checked;

        // 向上遍历
        traverseTreeUp(newTreeData, currentNode);

        // 向下遍历
        traverseTreeDown(newTreeData, currentNode);

        // 触发 change 事件
        this.triggerChange(newTreeData);

        this.setState({
            treeData: newTreeData,
        });
    };

    triggerChange = (treeData: Array<TreeNode>) => {
        const { onChange } = this.props;
        const flattenData = tree2List(treeData);
        const selectedIds = flattenData.filter((item) => item.checked).map((item) => item.id);
        onChange && onChange(selectedIds);
    };

    renderCheckbox = (data: TreeNode | FlatTreeNode | IModule) => {
        return (
            <Checkbox
                style={{
                    minWidth: 160,
                    marginLeft: 0,
                    marginRight: 8,
                    padding: '2px 0',
                }}
                key={data.id}
                checked={data.checked}
                onChange={(e) => this.handleChange(data, e)}
            >
                {data.name}
            </Checkbox>
        );
    };

    render() {
        const { treeData } = this.state;
        const tableDataSource = tree2TableDataSource(treeData);
        const columns = [
            {
                title: '模块',
                dataIndex: 'module',
                width: 150,
                render: (value: IModule) => {
                    return {
                        children: this.renderCheckbox(value),
                        props: {
                            rowSpan: value.rowSpan,
                        },
                    };
                },
            },
            {
                title: '页面',
                dataIndex: 'page',
                width: 180,
                render: (value: FlatTreeNode) => this.renderCheckbox(value),
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (value: TreeNode) => {
                    const children = value.children;
                    if (children) {
                        return children.map((child) => this.renderCheckbox(child));
                    }
                },
            },
        ];

        return (
            <div>
                <Table bordered pagination={false} columns={columns} dataSource={tableDataSource} />
            </div>
        );
    }
}
