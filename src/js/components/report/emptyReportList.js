import { Li, Section, Ul, Div } from "../../helpers/htmlElement";

const emptyReportList = {
    render(data, config) {
        let section = Section("", "data-name", "report");
        let ulList = Ul("eglador-w-full eglador-flex eglador-gap-4 eglador-scroll-pl-6 eglador-snap-x eglador-overflow-x-auto eglador-mb-5");
        let statusList = Ul("eglador-w-full eglador-mb-5");
        let responseItems = "";
        
        Object.entries(config.response.list).forEach(([key, element]) => {
            responseItems += `
                <div data-name="response-${element.code}" class="eglador-text-xs ${element.color.bgColor.base} eglador-rounded-sm eglador-p-2">
                    <span>${element.code}: </span>
                    <span data-name="count" class="eglador-font-bold">0</span>
                </div>
                `;
        });

        let useResponseStatus = Li("eglador-grid eglador-grid-cols-3 eglador-gap-2 eglador-p-4 eglador-text-center eglador-whitespace-nowrap eglador-bg-white", "data-name", "useResponseStatus", `
                <div data-name="name" class="eglador-col-span-3 eglador-font-black eglador-text-sm eglador-text-left">Response</div>
                ${responseItems}
        `);

        if (data.content.list) {
            data.content.list.forEach(list => {
                if (list.response) {
                    section.appendChild(statusList);
                    statusList.appendChild(useResponseStatus);
                }
                list.items.forEach(item => {
                    let liItem = Li("eglador-inline-grid eglador-gap-2 eglador-p-4 eglador-text-center eglador-whitespace-nowrap eglador-bg-white", "data-name", item.type);
                    let name = Div("eglador-col-span-3 eglador-font-black eglador-text-sm eglador-text-left", "data-name", "name", item.name);
                    let use = Div("eglador-col-span-3 eglador-text-xs eglador-bg-gray-100 eglador-rounded-sm eglador-p-2", "data-name", "use", `
                        <span>use: </span>
                        <span data-name="count" class="eglador-font-bold">0</span>
                    `);
                    let success = Div("eglador-col-span-3 eglador-text-xs eglador-bg-green-100 eglador-rounded-sm eglador-p-2", "data-name", "success", `
                        <span>success: </span>
                        <span data-name="count" class="eglador-font-bold">0</span>
                    `);
                    let warning = Div("eglador-col-span-3 eglador-text-xs eglador-bg-yellow-100 eglador-rounded-sm eglador-p-2", "data-name", "warning", `
                        <span>warning: </span>
                        <span data-name="count" class="eglador-font-bold">0</span>
                    `);
                    let alert = Div("eglador-col-span-3 eglador-text-xs eglador-bg-red-100 eglador-rounded-sm p-2", "data-name", "alert", `
                        <span>alert: </span>
                        <span data-name="count" class="eglador-font-bold">0</span>
                    `);

                    liItem.appendChild(name);
                    liItem.appendChild(use);
                    liItem.appendChild(success);
                    liItem.appendChild(warning);
                    liItem.appendChild(alert);
                    ulList.appendChild(liItem);
                });
            });
        }

        if (data.content.list) {
            section.appendChild(ulList);
        }
        // section.appendChild(ulList);
        return section;
    }
}
export default emptyReportList;