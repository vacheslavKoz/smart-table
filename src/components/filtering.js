import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    //console.log(elements)
   // console.log(indexes)
   // console.log(Object.keys(indexes))
      Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {  
      //  console.log(elements[elementName]);                     // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                    //   сonsole.log(name) ;                              // @todo: создать и вернуть тег опции
         let m = document.createElement("option");
         m.value = name;
         m.textContent = name;
         return m; })
        )
     })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
       //  console.log(state)
        
        // @todo: #4.5 — отфильтровать данные используя компаратор
      //  return data;
      return data.filter(row => compare(row, state));
    }
}