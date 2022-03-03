/*
 * @Author: liuc
 * @Date: 2020-06-01 14:10:45
 * @Description: 
 */ 
/**
 * @author: liuc
 * @description: 分页查询
 * @param {page}: 当前页码
 * @param {pageSize}: 当前每页显示的数据长度
 * @param {searchNode}: 查询条件
 * @param {sortType}: 排序方法
 * @param {sortField}: 排序字段
 */
export function buildQueryBean (page, pageSize, searchNode, sortType, sortField) {
    let search = {
        'current': 1, 
        'pageSize': 10,
        'search': false,
        'sort': false,
        'sortField': '',
        'sortType': 'desc',
        'filters': []
    };
    if (page) {
        search.current = page;
    }
    if (pageSize) {
        search.pageSize = pageSize;
    }
    if (searchNode) {
        search.search = true; // 如果当前参数传入filters，则判定search字段为true
        search.filters = searchNode; 
    }
    if (sortType) {
        search.sort = true;
        search.sortField = sortField;
        search.sortType = sortType;
    }
    return search;
}
/**
 * @author: liuc
 * @description: 创建filters
 * @param {prop}: 需要进行查询的字段 
 * @param {op}: 查询方法eq 等于，lt 小于，rt 大于，le 小于等于，re 大于等于，like 模糊查询
 * @param {value}: 输入的内容
 * @param {fieldType}: 文件类型
 * @param {isArray}: 是否为数组
 */
export function tableSearchNode (prop, op, value, fieldType, isArray) {
    let node = {
        'prop': prop,
        'op': op,
        'value': value,
        'fieldType': fieldType,
        'singleValue': false,
        'betweenValue': false,
        'listValue': false
    };
    if (isArray) {
        node.listValue = true;
        return node;
    }
    if (node.value.length === 1) {
        node.singleValue = true; // 判断数组长度，如果长度为1，则为true
    } else if (node.value.length === 2) {
        node.betweenValue = true; // 只有传入的数组长度为2，才为true
    } else if (node.value.length >= 3) {
        node.listValue = true; // 当时数组长度大于等于3时为true
    } else {
        return [];
    }
    return node;
};

/**
 * @author: liuc
 * @description: 或条件语句
 * @param {}: 传入条件为或的所有对象
 */
export function orFilters () {
    return [...arguments]; // 将对象转为数组
};

/**
 * @author: liuc
 * @description: 与条件语句
 * @param {}: 传入天剑需要为与的条件数组
 */
export function andFilters() {
    let arrType = true;
    // 判断是否存在非数组格式
    for (let index = 0; index < arguments.length; index++) {
        const element = arguments[index];
        let type = element instanceof Array;
        if (!type) {
            arrType = false;
        }
    }
    // 如果存在非数组格式，则console出提示语句，如果不存在，则将所传入的数组统一包裹为一个数组
    return arrType ? [...arguments] : console.error('参数中存在非法格式');
};