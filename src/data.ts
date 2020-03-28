// 测试数据
export const data = [
    {
        id: '1',
        name: '门店管理',

        parentId: '0',

        children: [
            {
                id: '9',
                name: '管理门店',

                parentId: '1',

                children: [
                    {
                        id: '28',
                        name: '查看门店列表',

                        type: 'OPERATION',
                        parentId: '9',

                        children: [],
                    },
                    {
                        id: '29',
                        name: '新增门店',

                        type: 'OPERATION',
                        parentId: '9',

                        children: [],
                    },
                    {
                        id: '30',
                        name: '查看门店详情',

                        type: 'OPERATION',
                        parentId: '9',

                        children: [],
                    },
                    {
                        id: '31',
                        name: '编辑门店',

                        type: 'OPERATION',
                        parentId: '9',

                        children: [],
                    },
                    {
                        id: '32',
                        name: '对接门店渠道',

                        type: 'OPERATION',
                        parentId: '9',

                        children: [],
                    },
                ],
            },
            {
                id: '10',
                name: '管理门店渠道',

                parentId: '1',

                children: [
                    {
                        id: '101',
                        name: '查看门店渠道',
                        parentId: '10',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        name: '品类管理',

        parentId: '0',

        children: [
            {
                id: '11',
                name: '管理品牌',

                parentId: '2',

                children: [
                    {
                        id: '33',
                        name: '查看列表',

                        type: 'OPERATION',
                        parentId: '11',

                        children: [],
                    },
                    {
                        id: '34',
                        name: '编辑门店渠道',

                        type: 'OPERATION',
                        parentId: '11',

                        children: [],
                    },
                    {
                        id: '35',
                        name: '查看品牌列表',

                        type: 'OPERATION',
                        parentId: '11',

                        children: [],
                    },
                ],
            },
            {
                id: '12',
                name: '管理销售分类',

                parentId: '2',

                children: [
                    {
                        id: '36',
                        name: '查看销售分类',

                        type: 'OPERATION',
                        parentId: '12',

                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: '3',
        name: '商品管理',

        parentId: '0',

        children: [
            {
                id: '13',
                name: '管理标签',

                parentId: '3',

                children: [
                    {
                        id: '37',
                        name: '查看标签列表',

                        type: 'OPERATION',
                        parentId: '13',

                        children: [],
                    },
                    {
                        id: '38',
                        name: '新增标签',

                        type: 'OPERATION',
                        parentId: '13',

                        children: [],
                    },
                    {
                        id: '39',
                        name: '编辑标签',

                        type: 'OPERATION',
                        parentId: '13',

                        children: [],
                    },
                    {
                        id: '40',
                        name: '删除标签',

                        type: 'OPERATION',
                        parentId: '13',

                        children: [],
                    },
                ],
            },
            {
                id: '14',
                name: '管理打标组',

                parentId: '3',

                children: [
                    {
                        id: '41',
                        name: '查看打标组列表',

                        type: 'OPERATION',
                        parentId: '14',

                        children: [],
                    },
                    {
                        id: '42',
                        name: '新增打标组',

                        type: 'OPERATION',
                        parentId: '14',

                        children: [],
                    },
                    {
                        id: '43',
                        name: '编辑打标组',

                        type: 'OPERATION',
                        parentId: '14',

                        children: [],
                    },
                    {
                        id: '44',
                        name: '删除打标组',

                        type: 'OPERATION',
                        parentId: '14',

                        children: [],
                    },
                    {
                        id: '45',
                        name: '导出打标组',

                        type: 'OPERATION',
                        parentId: '14',

                        children: [],
                    },
                    {
                        id: '46',
                        name: '导出商品',

                        type: 'OPERATION',
                        parentId: '14',

                        children: [],
                    },
                    {
                        id: '47',
                        name: '导入商品',

                        type: 'OPERATION',
                        parentId: '14',

                        children: [],
                    },
                ],
            },
            {
                id: '15',
                name: '管理商品限购',

                parentId: '3',

                children: [
                    {
                        id: '48',
                        name: '编辑限购',

                        type: 'OPERATION',
                        parentId: '15',

                        children: [],
                    },
                    {
                        id: '49',
                        name: '编辑限购提示语',

                        type: 'OPERATION',
                        parentId: '15',

                        children: [],
                    },
                ],
            },
        ],
    },
];
