import { Button, Div, Section, Span, Li, Ul } from "../../helpers/htmlElement";

class color {
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
            map = this.data.content.styles,
            colors = [];
        let colorResult = "",
            colorReport = "";

        for (let i = 0, length = elements.length; i < length; i++) {
            const item = elements[i];
            for (let j = 0, mapLength = map.length; j < mapLength; j++) {
                const type = map[j]
                const style = getComputedStyle(item)[type];
                if (colors.indexOf(style) == -1) {
                    colors.push(style);
                }
            }
        }

        colorReport += `
        <ul class="eglador-w-full eglador-flex eglador-gap-4 eglador-scroll-pl-6 eglador-snap-x eglador-overflow-x-auto eglador-mb-5">
            <li class="eglador-inline-grid eglador-gap-2 eglador-p-4 eglador-text-center eglador-whitespace-nowrap eglador-bg-white" data-name="color">
                <div class="eglador-col-span-3 eglador-font-black eglador-text-sm eglador-text-left" data-name="name">color</div>
                <div class="eglador-col-span-3 eglador-text-xs eglador-bg-gray-100 eglador-rounded-sm eglador-p-2" data-name="use">
                    <span>use: </span>
                    <span data-name="count" class="eglador-font-bold">${colors.length}</span>
                </div>
            </li>
        </ul>`;

        let listClass = `eglador-bg-white eglador-relative eglador-p-4 eglador-mb-5 hover:eglador-cursor-pointe after:eglador-absolute after:eglador-top-0 after:eglador-left-0 after:eglador-border-l after:eglador-border-black after:eglador-border-dashed after:eglador-h-full before:eglador-absolute before:eglador-z-10 before:-eglador-left-1 before:eglador-top-7 before:eglador-w-2 before:eglador-h-2 before:eglador-rounded-full before:eglador-bg-black`,
            itemClassPrimary = `eglador-mb-4 eglador-pb-4 eglador-border-b eglador-border-dashed eglador-border-gray-300`,
            itemClassSecondary = `eglador-text-xs eglador-w-full eglador-flex`,
            subItemSubHeadClass = `eglador-font-bold eglador-mr-2`;


        colorResult += `<ul class="${listClass}">`;
        colors.sort();
        colors.forEach((color, key) => {
            colorResult += `
                <li>
                    <ul>
                        <li class="${colors.length != (key + 1) ? (itemClassPrimary + " " + itemClassSecondary) : itemClassSecondary}">
                            <div class="${subItemSubHeadClass} eglador-whitespace-nowrap">${key + 1} : </div>
                            <div class="eglador-w-full">
                                <div class="eglador-mb-2">${color}</div>
                                <div class="eglador-p-4 eglador-border eglador-border-gray-300 eglador-border-dashed" style="background-color:${color}"></div>
                            </div>
                        </li>
                    </ul>
                </li>
            `;
        });
        colorResult += `</ul>`;

        let content = Section('', '', '', `${colorReport} ${colorResult}`);
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
export default color;