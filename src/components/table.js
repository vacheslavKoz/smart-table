import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы
    after.forEach(subName => {                            // перебираем нужный массив идентификаторов
    root[subName] = cloneTemplate(subName);            // клонируем и получаем объект, сохраняем в таблице
    root.container.append(root[subName].container);    // добавляем к таблице после (append) или до (prepend)
});
   
    before.forEach(subName => {                            // перебираем нужный массив идентификаторов
    root[subName] = cloneTemplate(subName);            // клонируем и получаем объект, сохраняем в таблице
    root.container.prepend(root[subName].container);    // добавляем к таблице после (append) или до (prepend)
});

    // @todo: #1.3 —  обработать события и вызвать onAction()
     
    root.container.addEventListener("change", () => { onAction();})
    root.container.addEventListener("reset",  () => {
    setTimeout(onAction); // или setTimeout(onAction, 0) для явной задержки
});
    root.container.addEventListener("submit", (e) =>{ e.preventDefault();
        onAction(e.submitter);
    })

    const render = (data) => {
        // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
       // const row = cloneTemplate(rowTemplate)
       // console.log(data)
        const nextRows = data.map(item =>{

    const newRow = cloneTemplate(rowTemplate)
   // console.log(newRow)
    Object.keys(item).forEach(key => {
        //console.log(key)
        if(newRow.elements[key]){
            newRow.elements[key].textContent = item[key]
          // console.log( newRow);
        }
    } );
      return newRow.container}) ;
       console.log(nextRows)
       
      //  nextRows = {container: }
        //const nextRows = [];
       // Object.keys(item).forEach(key => { })
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}