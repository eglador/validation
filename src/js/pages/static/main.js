import { Button, Div, Section, Span } from "../../helpers/htmlElement";

class main {
    constructor(props) {
        this.options = props;
        this.data = this.options.data;
        this.navs = document.querySelector(`[data-type="navigation"]`);
        this.pageNav = document.querySelector(`[data-type="navigate-item"][data-name="${this.options.page}"]`);

        this.listClass = `eglador-bg-white eglador-relative eglador-p-4 eglador-mb-5 hover:eglador-cursor-pointe after:eglador-absolute after:eglador-top-0 after:eglador-left-0 after:eglador-border-l after:eglador-border-black after:eglador-border-dashed after:eglador-h-full before:eglador-absolute before:eglador-z-10 before:-eglador-left-1 before:eglador-top-7 before:eglador-w-2 before:eglador-h-2 before:eglador-rounded-full before:eglador-bg-black`,
            this.listHeadClass = `eglador-mb-2 eglador-text-lg eglador-font-black`,
            this.listDescriptionClass = `eglador-mb-2 eglador-text-xs`,
            this.itemClassPrimary = `eglador-mb-4 eglador-pb-4 eglador-border-b eglador-border-dashed eglador-border-gray-300`,
            this.itemClassSecondary = `eglador-text-xs eglador-w-full eglador-flex eglador-justify-between`,
            this.itemHeadClass = `eglador-font-bold eglador-mb-1`,
            this.itemSubHeadClass = `eglador-font-bold eglador-mb-4`,
            this.itemDescriptionClass = `eglador-text-xs`,
            this.subItemSubHeadClass = `eglador-font-bold`;
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


    async featured() {
        var lastChild = "eglador-border-none eglador-mb-0";
        var result = "";

        this.data.content.featured.items.forEach((data, dkey) => {
            const headingList = document.querySelectorAll(data.selector);
            headingList.forEach((element, eKey) => {
                if (this.data.content.featured.items.length == (dkey + 1)) {
                    lastChild = headingList.length == (eKey + 1) ? 'eglador-border-none eglador-mb-0 eglador-pb-0' : '';
                }
                else { lastChild = "" }
                result += `<li class="${this.itemClassPrimary} ${lastChild}">
                            <div class="${this.itemHeadClass}">${data.name}</div>
                            <div class="${this.itemDescriptionClass}">`;
                if (data.htmlTag == "img") {
                    result += `<img src="${element.content}"/>`;
                }
                else {
                    result += (data.value == "" ? element.innerHTML : element.content);
                }
                result += `</div></li>`;
            });
        });

        document.querySelector('[data-wrapper="featured"]').innerHTML = `
        <div class="eglador-mb-5">
            <div class="eglador-mb-5">
                <div class="${this.listHeadClass}">${this.data.content.featured.name}</div>
                <div class="${this.listDescriptionClass}">${this.data.content.featured.description}</div>
            </div>
            <ul class="${this.listClass}">
            ${result}
            </ul>
        </div>
        `;
    }

    async pageInfo() {
        const loadTime = (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) / 1000;

        var request = new XMLHttpRequest();
        request.open('GET', document.location, false);
        request.send();
        var size = request.getAllResponseHeaders().toLowerCase().match(/content-length: \d+/);
        const contentSize = size ? size + " bytes" : "no permission";

        document.querySelector('[data-wrapper="pageInfo"]').innerHTML = `
            <div class="eglador-mb-5">
                <div class="eglador-mb-5">
                    <div class="${this.listHeadClass}">Page</div>
                    <div class="${this.listDescriptionClass}">Html page loading time and size.</div>
                </div>
                <ul class="${this.listClass}">
                    <li>
                        <div class="${this.itemSubHeadClass}">Html</div>
                        <ul>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Load Time:</span>
                                <span>${loadTime}ms</span>
                            </li>
                            <li class="${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Size:</span>
                                <span>${contentSize}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        `;
    }

    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    async fetchAwait(url) {
        return await fetch(url);
    }

    async style() {
        const internal = {
            "count": 0,
            "size": 0,
            "time": 0
        };
        const external = {
            "count": 0,
            "size": 0,
            "time": 0
        };
        const selector = "link[rel='stylesheet']";
        const elements = document.querySelectorAll(selector);
        for (let i = 0, length = elements.length; i < length; i++) {
            const element = elements[i];
            const src = element.getAttribute('href');
            if (src) {
                const place = src.indexOf(document.location.host) > -1 ? internal : external;

                const start = performance.now();
                const response = await this.fetchAwait(src)
                    .then((response) => response.text())
                    .then(data => {
                        if (data) {
                            const end = performance.now();
                            place.size += data.length;
                            place.time += end - start;
                        }
                    });
                place.count++;
            }
        }

        document.querySelector('[data-wrapper="style"]').innerHTML = `
        <div class="eglador-mb-5">
                <div class="eglador-mb-5">
                    <div class="${this.listHeadClass}">Style</div>
                    <div class="${this.listDescriptionClass}">Internal and external CSS stylesheets loading time and size.</div>
                </div>
                <ul class="${this.listClass}">
                    <li>
                        <div class="${this.itemSubHeadClass}">Internal</div>
                        <ul>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Count:</span>
                                <span>${internal.count}</span>
                            </li>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Load Time:</span>
                                <span>${parseFloat(internal.time).toFixed('2')}ms</span>
                            </li>
                            <li class="${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Size:</span>
                                <span>${this.formatBytes(internal.size)}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="${this.listClass}">
                    <li>
                        <div class="${this.itemSubHeadClass}">External</div>
                        <ul>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Count:</span>
                                <span>${external.count}</span>
                            </li>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Load Time:</span>
                                <span>${parseFloat(external.time).toFixed('2')}ms</span>
                            </li>
                            <li class="${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Size:</span>
                                <span>${this.formatBytes(external.size)}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        `;
    }

    async script() {
        const internal = {
            "count": 0,
            "size": 0,
            "time": 0
        };
        const external = {
            "count": 0,
            "size": 0,
            "time": 0
        };
        const selector = "script";
        const elements = document.querySelectorAll(selector);
        for (let i = 0, length = elements.length; i < length; i++) {
            const element = elements[i];
            const src = element.getAttribute('src');
            if (src) {
                const place = src.indexOf(document.location.host) > -1 ? internal : external;

                const start = performance.now();
                const response = await this.fetchAwait(src)
                    .then((response) => response.text())
                    .then(data => {
                        if (data) {
                            const end = performance.now();
                            place.size += data.length;
                            place.time += end - start;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                place.count++;
            }
        }

        document.querySelector('[data-wrapper="script"]').innerHTML = `
        <div class="eglador-mb-5">
                <div class="eglador-mb-5">
                    <div class="${this.listHeadClass}">Script</div>
                    <div class="${this.listDescriptionClass}">Internal and external Scripts loading time and size.</div>
                </div>
                <ul class="${this.listClass}">
                    <li>
                        <div class="${this.itemSubHeadClass}">Internal</div>
                        <ul>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Count:</span>
                                <span>${internal.count}</span>
                            </li>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Load Time:</span>
                                <span>${parseFloat(internal.time).toFixed('2')}ms</span>
                            </li>
                            <li class="${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Size:</span>
                                <span>${this.formatBytes(internal.size)}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="${this.listClass}">
                    <li>
                        <div class="${this.itemSubHeadClass}">External</div>
                        <ul>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Count:</span>
                                <span>${external.count}</span>
                            </li>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Load Time:</span>
                                <span>${parseFloat(external.time).toFixed('2')}ms</span>
                            </li>
                            <li class="${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Size:</span>
                                <span>${this.formatBytes(external.size)}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        `;
    }

    async font() {
        return `
            <div class="eglador-mb-5">
                <div class="eglador-mb-5">
                    <div class="${this.listHeadClass}">Font</div>
                    <div class="${this.listDescriptionClass}">Internal and external Fonts loading time and size.</div>
                </div>
                <ul class="${this.listClass}">
                    <li>
                        <div class="${this.itemSubHeadClass}">Internal</div>
                        <ul>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Count:</span>
                                <span>4</span>
                            </li>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Load Time:</span>
                                <span>300ms</span>
                            </li>
                            <li class="${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Size:</span>
                                <span>700kg</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="${this.listClass}">
                    <li>
                        <div class="${this.itemSubHeadClass}">External</div>
                        <ul>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Count:</span>
                                <span>4</span>
                            </li>
                            <li class="${this.itemClassPrimary} ${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Load Time:</span>
                                <span>300ms</span>
                            </li>
                            <li class="${this.itemClassSecondary}">
                                <span class="${this.subItemSubHeadClass}">Size:</span>
                                <span>700kg</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        `
    }

    dynamicContent() {
        this.featured();
        this.pageInfo();
        this.style();
        this.script();
        //this.font();
    }

    staticContent() {
        let loadingHtml = `
        <div class="eglador-border eglador-border-blue-300 eglador-shadow eglador-rounded-md eglador-p-4 eglador-max-w-sm eglador-w-full eglador-mx-auto">
        <div class="eglador-animate-pulse eglador-flex eglador-space-x-4">
            <div class="eglador-flex-1 eglador-space-y-6 eglador-py-1">
            <div class="eglador-h-2 eglador-bg-slate-200 eglador-rounded"></div>
            <div class="eglador-space-y-3">
                <div class="eglador-grid eglador-grid-cols-3 eglador-gap-4">
                <div class="eglador-h-2 eglador-bg-slate-200 eglador-rounded eglador-col-span-2"></div>
                <div class="eglador-h-2 eglador-bg-slate-200 eglador-rounded eglador-col-span-1"></div>
                </div>
                <div class="eglador-h-2 eglador-bg-slate-200 eglador-rounded"></div>
            </div>
            </div>
        </div>
        </div>
        `;
        let content = Section('', '', '', `
                <div data-wrapper="featured">${loadingHtml}</div>
                <div data-wrapper="pageInfo">${loadingHtml}</div>
                <div data-wrapper="style">${loadingHtml}</div>
                <div data-wrapper="script">${loadingHtml}</div>
        `);
        // <div data-wrapper="font">${loadingHtml}</div>
        return content;
    }

    async template() {
        let contentWrapper = Div('eglador-overflow-y-scroll content-height eglador-p-8 eglador-pb-36 eglador-bg-gray-100');

        contentWrapper.appendChild(this.head());

        contentWrapper.appendChild(this.staticContent());

        // contentWrapper.appendChild(this.foot());
        return contentWrapper;
    }

    clear() {
        document.querySelector('[data-type="body"]').innerHTML = "";
    }

    async init() {

        this.clear();

        document.querySelector('[data-type="body"]').appendChild(await this.template()); //body render
        this.dynamicContent();

    }
}
export default main;
