import { Li, Section, Ul, Div } from "../../helpers/htmlElement";

const emptyBox = {
    render(data) {

        let html = Div("wrapper");

        if (data.content.list) {
            data.content.list.forEach((element, key) => {
                let section = Section("", "data-name", element.type);
                let info = Div("eglador-mb-5", "data-name", "info", `
                            <div class="eglador-mb-2 eglador-text-lg eglador-font-black">${element.name}</div>
                            <div class="eglador-mb-2 eglador-text-xs">${element.description}</div>
                            <ul class="eglador-grid eglador-grid-flow-col eglador-auto-cols-max eglador-gap-4 eglador-text-xs">
                                <li data-name="total">
                                    <span class="eglador-font-bold">Total:</span>
                                    <span>${element.items.length}</span>
                                </li>
                            </ul>
                `);
                section.appendChild(info);

                let list = Ul("eglador-relative eglador-overflow-hidden eglador-pl-1", "data-name", "list");
                element.items.forEach((item, itemKey) => {
                    let liItem = Li(`
                    eglador-bg-white
                    eglador-relative eglador-p-4 eglador-mb-5 
                    hover:eglador-cursor-pointe 
                    after:eglador-absolute after:eglador-top-0 after:eglador-left-0 after:eglador-border-l after:eglador-border-black after:eglador-border-dashed after:eglador-h-full
                    before:eglador-absolute before:eglador-z-10 before:-eglador-left-1 before:eglador-top-7 before:eglador-w-2 before:eglador-h-2 before:eglador-rounded-full before:eglador-bg-black
                    `, "data-type", item.type, `
                        <div data-name="name" class="eglador-font-bold eglador-mb-2">${item.name}</div>
                        <div data-name="description" class="eglador-mb-2 eglador-text-gray-600 eglador-text-xs">${item.description}</div>
                        <div data-name="example" class="eglador-border-b eglador-pb-2 eglador-mb-2">
                            <div class="eglador-font-bold eglador-mb-2 eglador-text-xs eglador-italic">${item.propertyName}</div>
                            <div class="eglador-overflow-auto eglador-mb-2 eglador-p-4 eglador-text-xs eglador-bg-gray-100">
                                <pre><code>${item.property.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")} </code></pre>
                            </div>
                        </div>
                        <div data-name="filter" class="eglador-border-b eglador-pb-2 eglador-mb-2">
                            <div class="eglador-font-bold eglador-mb-2 eglador-text-xs eglador-italic">Filter</div>
                            <div class="eglador-flex eglador-space-x-2">
                                <select class="eglador-block eglador-w-full eglador-h-12 eglador-border-transparent focus:eglador-border-transparent focus:eglador-ring-0 eglador-bg-gray-100 eglador-text-xs">
                                    <option value="">Attributes</option>
                                </select>
                            </div>
                        </div>
                        <ul data-name="status" class="eglador-grid eglador-grid-flow-col eglador-auto-cols-max eglador-gap-4 eglador-mb-2 eglador-text-xs eglador-italic eglador-border-b eglador-pb-2">
                            <li data-name="use" title="">
                                <span class="eglador-font-bold">Use:</span>
                                <span data-name="count">0</span>
                            </li>
                            <li data-name="success" title="">
                                <span class="eglador-font-bold">Success:</span>
                                <span data-name="count">0</span>
                            </li>
                            <li data-name="warning" title="">
                                <span class="eglador-font-bold">Warning:</span>
                                <span data-name="count">0</span>
                            </li>
                            <li data-name="alert" title="">
                                <span class="eglador-font-bold">Alert:</span>
                                <span data-name="count">0</span>
                            </li>
                        </ul>
                        <div data-name="reportWrapper">
                            <div class="eglador-font-bold eglador-mb-2 eglador-text-xs eglador-italic">${item.reportName}</div>
                            <div data-name="reports" class="eglador-mb-2 eglador-text-gray-600 eglador-text-xs eglador-max-h-96 eglador-overflow-auto">${item.report}</div>
                        </div>
                    `);

                    list.appendChild(liItem);
                });
                section.appendChild(list);
                html.appendChild(section);
            });

        }
        return html;
    }
}
export default emptyBox;
