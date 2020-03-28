import { isEmpty, each, cloneDeep, every } from 'lodash';
import { TreeNode, FlatTreeNode, TableRow } from './interface';

/**
 * 将后台给的权限树转成扁平格式
 */
export function tree2List(tree: Array<TreeNode>) {
    const treeData = cloneDeep(tree);
    let result: Array<FlatTreeNode> = [];
    const loop = (data: Array<TreeNode>) => {
        if (!isEmpty(data)) {
            data.forEach((item) => {
                const { children, id, name, parentId, checked } = item;
                result.push({
                    id,
                    name,
                    parentId,
                    checked: checked || false,
                });
                if (!isEmpty(children)) {
                    loop(children);
                }
            });
        }
    };
    loop(treeData);
    return result;
}

/**
 * 扁平数据转成树结构
 * @params list 数据源
 * @params rootParentId 顶级 parentId，默认为 0
 */
export function list2Tree(list: Array<FlatTreeNode>, rootParentId: string = '0') {
    const listData = cloneDeep(list);
    let map: any = {};
    let node = {} as FlatTreeNode;
    let result: any = [];
    each(listData, (item, index) => {
        map[item.id] = index; // initialize the map
        // @ts-ignore
        item.children = []; // initialize the children
    });
    each(listData, (item) => {
        node = item;
        if (node.parentId !== rootParentId) {
            // @ts-ignore
            listData[map[node.parentId]].children.push(node);
        } else {
            result.push(node);
        }
    });
    return result;
}

/**
 * 树结构转成表格数据源
 */
export function tree2TableDataSource(tree: Array<TreeNode>) {
    let result: Array<TableRow> = [];
    if (isEmpty(tree)) {
        return result;
    }
    let length = 0;
    let indexCounter = 0;
    each(tree, (moduleItem) => {
        if (moduleItem.children) {
            length = moduleItem.children.length;
            each(moduleItem.children, (pageItem) => {
                indexCounter++;
                result.push({
                    key: indexCounter,
                    module: {
                        id: moduleItem.id,
                        name: moduleItem.name,
                        parentId: moduleItem.parentId,
                        checked: moduleItem.checked,
                        rowSpan: length,
                    },
                    page: {
                        id: pageItem.id,
                        name: pageItem.name,
                        parentId: pageItem.parentId,
                        checked: pageItem.checked,
                    },
                    operation: cloneDeep(pageItem),
                });
                length = 0;
            });
        }
    });
    return result;
}

/**
 * 通过指定ID查找树中的节点
 */
export function getTreeNodeById(tree: Array<TreeNode>, id: string): TreeNode | undefined {
    let found = false; // 是否查找到
    let result = undefined;
    const loop = (tree: Array<TreeNode>) => {
        if (!isEmpty(tree) && !found) {
            each(tree, (item) => {
                const { children } = item;
                if (item.id === id) {
                    // @ts-ignore
                    result = item;
                    found = true;
                    return false;
                } else if (children) {
                    loop(children);
                }
            });
        }
    };
    loop(tree);
    return result;
}

/**
 * 向上查找
 * @param tree 树结构的数据
 * @param node 节点
 */
export function traverseTreeUp(tree: Array<TreeNode>, node: TreeNode) {
    const { parentId } = node;
    const parentNode = getTreeNodeById(tree, parentId);
    if (parentNode) {
        const { children } = parentNode;
        parentNode.checked = every(children, (item) => item.checked);
        traverseTreeUp(tree, parentNode);
    }
}

/**
 * 向下查找
 * @param tree 树结构的数据
 * @param node 节点
 */
export function traverseTreeDown(tree: Array<TreeNode>, node: TreeNode) {
    const { id } = node;
    const currentNode = getTreeNodeById(tree, id);
    if (currentNode) {
        const { children } = currentNode;
        if (!isEmpty(children)) {
            each(children, (child) => {
                child.checked = currentNode.checked;
                traverseTreeDown(children, child);
            });
        }
    }
}

/**
 * ID与树中每一项值的映射
 * @param {Array<TreeNode>} tree 数据源
 * @param {Array<string>} value 需要选中的 id
 * @returns
 */
export function mapValuesToTree(tree: Array<TreeNode>, value: Array<string>) {
    const listData = tree2List(tree);
    each(value, (val) => {
        each(listData, (item) => {
            if (item.id === val) {
                item.checked = true;
            }
        });
    });
    return list2Tree(listData);
}
