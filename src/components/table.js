import {
    cloneTemplate
} from "../lib/utils.js";



export function initTable(settings, onAction) {
    const {
        tableTemplate,
        rowTemplate,
        before,
        after
    } = settings;
    const root = cloneTemplate(tableTemplate);

    after.forEach(subName => {
        root[subName] = cloneTemplate(subName);
        root.container.append(root[subName].container);
    });

    before.forEach(subName => {
        root[subName] = cloneTemplate(subName);
        root.container.prepend(root[subName].container);
    });



    root.container.addEventListener("change", () => {
        onAction();
    })
    root.container.addEventListener("reset", () => {
        setTimeout(onAction);
    });
    root.container.addEventListener("submit", (e) => {
        e.preventDefault();
        onAction(e.submitter);
    })

    const render = (data) => {

        const nextRows = data.map(item => {

            const newRow = cloneTemplate(rowTemplate)

            Object.keys(item).forEach(key => {

                if (newRow.elements[key]) {
                    newRow.elements[key].textContent = item[key]

                }
            });
            return newRow.container
        });

        root.elements.rows.replaceChildren(...nextRows);
    }

    return {
        ...root,
        render
    };
}