///////import {sortCollection, sortMap} from "../lib/sort.js";

//////export function initSorting(columns) {
   /////// return (data, state, action) => {
     /////// console.log(data);
     //////  let field = null;
     ////////  let order = null;
       //let field = "total" ;
       //let order = "up";
       ///////// if (action && action.name === 'sort') {
            // @todo: #3.1 — запомнить выбранный режим сортировки
///////action.dataset.value = sortMap[action.dataset.value];    // Сохраним и применим как текущее следующее состояние из карты
////////field = action.dataset.field; 
//field = "date" ; 
////////console.log(field)                         // Информация о сортируемом поле есть также в кнопке
////////order = action.dataset.value;  
//order = "up";
//////////console.log(order)                          // Направление заберём прямо из датасета для точности
            // @todo: #3.2 — сбросить сортировки остальных колонок
       ////////////////// } 
     //   else {
        //   columns.forEach(column => {                                   // Перебираем элементы (в columns у нас массив кнопок)
   // if (column.dataset.field !== action.dataset.field) {  
          // Если это не та кнопка, что нажал пользователь
      //  column.dataset.value = 'none';                        // тогда сбрасываем её в начальное состояние
  //  }
//});
//console.log(action)
/////////////////////if (action != undefined) {
 ///////////////////////////columns.forEach(column => { 
    ////////////////////////////////console.log(action.dataset );                                 // Перебираем элементы (в columns у нас массив кнопок)
    /////////////////////////////if (column.dataset.field !== action.dataset.field) {  
          // Если это не та кнопка, что нажал пользователь
      ///////////////////////////// column.dataset.value = 'none'; }
 ////////////////////////////////})
/////////////////////////////}
            // @todo: #3.3 — получить выбранный режим сортировки
         ////////////////////////////////   columns.forEach(column => {                        // Перебираем все наши кнопки сортировки
   ////////////////////////////////// if (column.dataset.value !== 'none') {        // Ищем ту, что находится не в начальном состоянии (предполагаем, что одна)
      ////////////////////////  field = column.dataset.field;            // Сохраняем в переменных поле
       ////////////////////////////// order = column.dataset.value;            // и направление сортировки
   /////////////////////////////// }
//////////////////////});
      //  }

      //////////////////////////  return sortCollection(data, field, order);
   /////////////////////////// }
//////////////////////}


import {sortCollection, sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        console.log('Данные до сортировки:', data.length); // 230 записей
        
        // Инициализируем состояние сортировки, если его нет
        if (!state.hasOwnProperty('sortField')) {
          state.sortField = null;
      state.sortOrder = null;
        }

        let field = state.sortField;
        let order = state.sortOrder;

        if (action && action.name === 'sort') {
            // Циклическое переключение состояния нажатой кнопки
            const newOrder = sortMap[action.dataset.value];
            action.dataset.value = newOrder;

            // Сброс всех остальных колонок
            columns.forEach(column => {
             if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
               }
      });

            // Сохраняем новое состояние
            state.sortField = action.dataset.field;
            state.sortOrder = newOrder;
            
            field = state.sortField;
            order = state.sortOrder;
        } else {
            // Ищем активную сортировку в DOM
             columns.forEach(column => {
              if (column.dataset.value !== 'none') {
                 state.sortField = column.dataset.field;
                state.sortOrder = column.dataset.value;
                    field = state.sortField;
                order = state.sortOrder;
                }
           });
        }

        // Применяем сортировку
        const sortedData = sortCollection(data, field, order);
        
      
       state.sortedData = sortedData;
        
        
       return sortedData;
    };
}