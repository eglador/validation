import { Button, Div, Section, Span, Li, Ul } from "../../helpers/htmlElement";

class font {
    constructor(props) {
        this.options = props;
        this.data = this.options.data;
        this.navs = document.querySelector(`[data-type="navigation"]`);
        this.pageNav = document.querySelector(`[data-type="navigate-item"][data-name="${this.options.page}"]`);
    }
    head() {
        let section = Section(`eglador-mb-5 eglador-border-dashed eglador-border-b eglador-border-slate-300 eglador-pb-5 ${this.data.head.status == true ? '' : 'eglador-hidden'}`, 'data-name', this.data.head.type ?? 'type');
        let title = Div('eglador-text-xl eglador-font-black', "", "", this.data.head.title ?? 'title');
        let description = Div('eglador-text-xs', "", "", this.data.head.description ?? 'description');

        section.appendChild(title);
        section.appendChild(description);
        return section;
    }

    foot() {

        let section = Section('eglador-w-full eglador-max-w-md eglador-fixed eglador-bottom-36 eglador-right-0 eglador-z-50 eglador-flex eglador-space-x-1 eglador-bg-white eglador-p-4 eglador-text-sm eglador-font-black eglador-rounded-sm eglador-text-white eglador-shadow-top', 'data-name', "foot");
        return section;

    }

    content() {
        const elements = document.querySelectorAll(`${this.data.content.elements}`),
            styles = this.data.content.styles,
            resultData = [];
        let resultView = "";

        elements.forEach(element => {
            styles.forEach((style, key) => {
                let obj = {},
                    arry = [],
                    result = getComputedStyle(element)[style.name];

                if (resultData[key]) {
                    let arry2 = arry.concat(resultData[key][key].value);
                    if (!arry2.includes(result)) {
                        arry2.push(result);
                    }
                    arry = arry2;
                }

                obj[key] = { "name": style.name, "description": style.description, "value": arry };
                resultData[key] = obj;
            });
        });

        let listClass = `eglador-bg-white eglador-relative eglador-p-4 eglador-mb-5 hover:eglador-cursor-pointe after:eglador-absolute after:eglador-top-0 after:eglador-left-0 after:eglador-border-l after:eglador-border-black after:eglador-border-dashed after:eglador-h-full before:eglador-absolute before:eglador-z-10 before:-eglador-left-1 before:eglador-top-7 before:eglador-w-2 before:eglador-h-2 before:eglador-rounded-full before:eglador-bg-black`,
            listHeadClass = `eglador-mb-2 eglador-text-lg eglador-font-black`,
            listDescriptionClass = `eglador-mb-2 eglador-text-xs`,
            itemClassPrimary = `eglador-mb-4 eglador-pb-4 eglador-border-b eglador-border-dashed eglador-border-gray-300`,
            itemClassSecondary = `eglador-text-xs eglador-w-full eglador-flex`,
            subItemSubHeadClass = `eglador-font-bold eglador-mr-2`,
            fontReport = "";

        fontReport += `<ul class="eglador-w-full eglador-flex eglador-gap-4 eglador-scroll-pl-6 eglador-snap-x eglador-overflow-x-auto eglador-mb-5">`;

        resultData.forEach((i, ikey) => {
            let selector = i[ikey],
                name = selector.name,
                values = selector.value,
                description = selector.description;
            values.sort();

            fontReport += `
                <li class="eglador-inline-grid eglador-gap-2 eglador-p-4 eglador-text-center eglador-whitespace-nowrap eglador-bg-white" data-name="color">
                    <div class="eglador-col-span-3 eglador-font-black eglador-text-sm eglador-text-left" data-name="name">${name}</div>
                    <div class="eglador-col-span-3 eglador-text-xs eglador-bg-gray-100 eglador-rounded-sm eglador-p-2" data-name="use">
                        <span>use: </span>
                        <span data-name="count" class="eglador-font-bold">${values.length}</span>
                    </div>
                </li>`;

            resultView += `
                    <div class="eglador-mb-5">
                    <div class="eglador-mb-5">
                        <div class="${listHeadClass}">${name}</div>
                        <div class="${listDescriptionClass}">${description}</div>
                    </div>
                    <ul class="${listClass}">
                `;

            values.forEach((value, vkey) => {
                resultView += `
                <li>
                    <ul>
                        <li class="${values.length != (vkey + 1) ? (itemClassPrimary + " " + itemClassSecondary) : itemClassSecondary}">
                            <div class="${subItemSubHeadClass}">${vkey + 1} : </div>
                            <div>${value}</div>
                        </li>
                    </ul>
                </li>`;
            });
            resultView += `</ul>`;
            resultView += `</div>`;
        });

        fontReport += `</ul>`;
        let content = Section('', '', '', `${fontReport} ${resultView}`);
        return content;
    }

    template() {
        let contentWrapper = Div('eglador-overflow-y-scroll content-height eglador-p-8 eglador-pb-36 eglador-bg-gray-100');

        contentWrapper.appendChild(this.head());

        contentWrapper.appendChild(this.content());

        // contentWrapper.appendChild(this.foot());
        return contentWrapper;
    }

    clear() {
        document.querySelector('[data-type="body"]').innerHTML = "";
    }

    init() {

        this.clear();

        document.querySelector('[data-type="body"]').appendChild(this.template()); //body render


    }
}
export default font;