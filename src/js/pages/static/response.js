import { Button, Div, Section, Span } from "../../helpers/htmlElement";

class response {
    constructor(props) {
        this.options = props;
        this.data = this.options.data;
        this.navs = document.querySelector(`[data-type="navigation"]`);
        this.pageNav = document.querySelector(`[data-type="navigate-item"][data-name="${this.options.page}"]`);

        this.listClass = `eglador-bg-white eglador-relative eglador-p-4 eglador-mb-5 hover:eglador-cursor-pointe after:eglador-absolute after:eglador-top-0 after:eglador-left-0 after:eglador-border-l after:eglador-border-black after:eglador-border-dashed after:eglador-h-full before:eglador-absolute before:eglador-z-10 before:-eglador-left-1 before:eglador-top-7 before:eglador-w-2 before:eglador-h-2 before:eglador-rounded-full before:eglador-bg-black`,
            this.listHeadClass = `eglador-mb-2 eglador-text-lg eglador-font-black`,
            this.listDescriptionClass = `eglador-mb-2 eglador-text-xs`,
            this.itemClassPrimary = `eglador-mb-4 eglador-pb-4 eglador-border-b eglador-border-dashed eglador-border-gray-300`,
            this.itemHeadClass = `eglador-font-bold eglador-mb-1`,
            this.itemDescriptionClass = `eglador-text-xs`;
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

        let section = Section('eglador-w-full eglador-fixed eglador-bottom-36 eglador-left-0 eglador-z-50 eglador-flex eglador-space-x-1 eglador-bg-white eglador-p-4 eglador-text-sm eglador-font-black eglador-rounded-sm eglador-text-white eglador-shadow-top', 'data-name', "foot");

        return section;
    }


    content() {

        let userAgent = `
            <div data-name="user-agent">
                <div class="eglador-mb-5">
                    <div class="${this.listHeadClass}">UserAgent</div>
                    <div class="${this.listDescriptionClass}">The User-Agent request header is a characteristic string that lets servers and network peers identify the application, operating system, vendor, and/or version of the requesting user agent.</div>
                </div>
                <ul class="${this.listClass}">
                    <li class="${this.itemClassPrimary}">
                        <div class="${this.itemHeadClass}">userAgent</div>
                        <div class="${this.itemDescriptionClass}">${navigator.userAgent}</div>
                    </li>
                    <li class="${this.itemClassPrimary}">
                        <div class="${this.itemHeadClass}">appCodeName</div>
                        <div class="${this.itemDescriptionClass}">${navigator.appCodeName}</div>
                    </li>
                    <li class="${this.itemClassPrimary}">
                        <div class="${this.itemHeadClass}">appName</div>
                        <div class="${this.itemDescriptionClass}">${navigator.appName}</div>
                    </li>
                    <li class="${this.itemClassPrimary}">
                        <div class="${this.itemHeadClass}">appVersion</div>
                        <div class="${this.itemDescriptionClass}">${navigator.appVersion}</div>
                    </li>
                    <li class="${this.itemClassPrimary}">
                        <div class="${this.itemHeadClass}">language</div>
                        <div class="${this.itemDescriptionClass}">${navigator.language}</div>
                    </li>
                    <li class="${this.itemClassPrimary}">
                        <div class="${this.itemHeadClass}">platform</div>
                        <div class="${this.itemDescriptionClass}">${navigator.platform}</div>
                    </li>
                    <li class="${this.itemClassPrimary}">
                        <div class="${this.itemHeadClass}">vendor</div>
                        <div class="${this.itemDescriptionClass}">${navigator.vendor}</div>
                    </li>
                    <li class="${this.itemClassPrimary}">
                        <div class="${this.itemHeadClass}">product</div>
                        <div class="${this.itemDescriptionClass}">${navigator.product}</div>
                    </li>
                </ul>
            </div>
        `;


        let req = new XMLHttpRequest();
        req.open('GET', document.location, false);
        req.send(null);
        let resultView = ``;

        let headers = req.getAllResponseHeaders(),
            arr = headers.trim().split(/[\r\n]+/),
            datas = this.data.content;

        arr.forEach(line => {
            let lineSplit = line.split(":");
            resultView += `
            <li class="${this.itemClassPrimary}">
                <div class="${this.itemHeadClass}">${lineSplit[0]}</div>
                <div class="${this.itemDescriptionClass}">${lineSplit[1]}</div>
            </li>
            `;
        });

        let content = Section('', '', '', `
        
            <div class="eglador-mb-5">
                <div class="eglador-mb-5">
                    <div class="${this.listHeadClass}">${datas.title}</div>
                    <div class="${this.listDescriptionClass}">${datas.description}</div>
                </div>
                <ul class="${this.listClass}">
                    ${resultView}
                </ul>
            </div>

            ${userAgent}
        `);

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
export default response;
