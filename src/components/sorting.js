import {
    sortMap
} from "../lib/sort.js";



export function initSorting(columns) {
    const applySorting = (query, state, action) => {



        if (!state.hasOwnProperty('sortField')) {
            state.sortField = null;
            state.sortOrder = null;
        }

        let field = state.sortField;
        let order = state.sortOrder;

        if (action && action.name === 'sort') {

            const newOrder = sortMap[action.dataset.value];
            action.dataset.value = newOrder;


            columns.forEach(column => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            });


            state.sortField = action.dataset.field;
            state.sortOrder = newOrder;

            field = state.sortField;
            order = state.sortOrder;
        } else {

            columns.forEach(column => {
                if (column.dataset.value !== 'none') {
                    state.sortField = column.dataset.field;
                    state.sortOrder = column.dataset.value;
                    field = state.sortField;
                    order = state.sortOrder;
                }
            });
        }


        const sort = (field && order !== 'none') ? `${field}:${order}` : null; // сохраним в переменную параметр сортировки в виде field:direction

        return sort ? Object.assign({}, query, {
            sort
        }) : query;
    };
    return applySorting;
}