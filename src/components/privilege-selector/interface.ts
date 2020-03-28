/**
 * 树节点
 */
export interface TreeNode {
    id: string;
    name: string;
    parentId: string;
    checked?: boolean;
    children: Array<TreeNode>;
}

export type FlatTreeNode = Omit<TreeNode, 'children'>;

/**
 * 表格数据类类型
 */
export interface IModule extends FlatTreeNode {
    rowSpan: number;
}

export interface TableRow {
    key: number;
    module: IModule;
    page: FlatTreeNode;
    operation: TreeNode;
}
