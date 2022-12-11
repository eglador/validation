import { Button, Div, Section, Span } from "../../helpers/htmlElement";

class main {
    constructor(props) {
        this.options = props;
        this.data = this.options.data;
        this.navs = document.querySelector(`[data-type="navigation"]`);
        this.pageNav = document.querySelector(`[data-type="navigate-item"][data-name="${this.options.page}"]`);
    }
    head() {
        let section = Section(`eglador-mb-5 eglador-border-dashed eglador-border-b eglador-border-slate-300 eglador-pb-5 ${this.data.head.status == true ? '' : 'hidden'}`, 'data-name', this.data.head.type ?? 'type');
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

    hotjar() {
        let resultWrapper = '',
            result = '',
            trackingData = {
                "hotjar": {
                    "name": "hotjar",
                    "description": "Everything you ever wanted to know about your website...",
                    "element": "src",
                    "source": {
                        "name": "Source",
                        "value": 'https://static.hotjar.com/',
                    },
                    "id": {
                        "name": "Id",
                        "value": 'hotjar-',
                    }
                }
            },
            hotjar = trackingData.hotjar;

        [...document.querySelectorAll(`[${hotjar.element}]`)]
            .map(element => element.getAttribute([hotjar.element]))
            .filter(function (element) {
                if (element.includes(hotjar.source.value)) {
                    var source = element.split(hotjar.source.value)[1];
                    var id = source.split(hotjar.id.value)[1];
                    if (id) {
                        result += `
                            <ul class="eglador-bg-white eglador-relative eglador-p-4 eglador-mb-5 hover:eglador-cursor-pointe after:eglador-absolute after:eglador-top-0 after:eglador-left-0 after:eglador-border-l after:eglador-border-black after:eglador-border-dashed after:eglador-h-full before:eglador-absolute before:eglador-z-10 before:-eglador-left-1 before:eglador-top-7 before:eglador-w-2 before:eglador-h-2 before:eglador-rounded-full before:eglador-bg-black">
                                <li class="eglador-flex eglador-mb-2 eglador-pb-2 eglador-border-b eglador-border-dashed eglador-border-gray-300">
                                    <div class="eglador-font-bold eglador-mb-1">${hotjar.name}</div>
                                </li>
                                <li class="eglador-mb-2 eglador-pb-2 eglador-border-b eglador-border-dashed eglador-border-gray-300">
                                    <span class="eglador-font-bold eglador-text-xs">${hotjar.id.name}:</span>
                                    <span class="eglador-text-xs">${id.split(".js")[0]}</span>
                                </li>
                                <li class="">
                                    <span class="eglador-font-bold eglador-text-xs">${hotjar.source.name}:</span>
                                    <span class="eglador-text-xs">${element}</span>
                                </li>
                            </ul>`;
                    }
                }
            });

        resultWrapper += `
            <div class="eglador-mb-5">
                <div class="eglador-mb-5">
                    <div class="eglador-mb-2 eglador-text-lg eglador-font-black">${hotjar.name}</div>
                    <div class="eglador-mb-2 eglador-text-xs">${hotjar.description}</div>
                </div>
                ${result}
            </div>
        `;

        return resultWrapper;

    }

    google() {
        let resultWrapper = '',
            result = '',
            trackingData = {
                "google": {
                    "name": "Google Analytics and GTM",
                    "description": "Google Analytics is a platform that collects data from your websites and apps to create reports that provide insights into your business.",
                    "element": "src",
                    "source": {
                        "name": "Source",
                        "value": 'https://www.googletagmanager.com/',
                    },
                    "id": {
                        "name": "Id",
                        "value": 'id=',
                    }
                }
            },
            google = trackingData.google;


        [...document.querySelectorAll(`[${google.element}]`)]
            .map(element => element.getAttribute([google.element]))
            .filter(function (element) {
                if (element.includes(google.source.value)) {
                    var source = element.split(google.source.value)[1];
                    var id = source.split(google.id.value)[1];
                    if (id) {
                        var name = id.split("-")[0];
                        console.log(name);
                        result += `
                            <ul class="eglador-bg-white eglador-relative eglador-p-4 eglador-mb-5 hover:eglador-cursor-pointe after:eglador-absolute after:eglador-top-0 after:eglador-left-0 after:eglador-border-l after:eglador-border-black after:eglador-border-dashed after:eglador-h-full before:eglador-absolute before:eglador-z-10 before:-eglador-left-1 before:eglador-top-7 before:eglador-w-2 before:eglador-h-2 before:eglador-rounded-full before:eglador-bg-black">
                                <li class="eglador-flex eglador-mb-2 eglador-pb-2 eglador-border-b eglador-border-dashed eglador-border-gray-300">
                                    <div class="eglador-font-bold eglador-mb-1">${name}</div>
                                </li>
                                <li class="eglador-mb-2 eglador-pb-2 eglador-border-b eglador-border-dashed eglador-border-gray-300">
                                    <span class="eglador-font-bold eglador-text-xs">${google.id.name}:</span>
                                    <span class="eglador-text-xs">${id.split("&")[0]}</span>
                                </li>
                                <li class="">
                                    <span class="eglador-font-bold eglador-text-xs">${google.source.name}:</span>
                                    <span class="eglador-text-xs">${element}</span>
                                </li>
                            </ul>`;
                    }
                }
            });

        resultWrapper += `
            <div class="eglador-mb-5">
                <div class="eglador-mb-5">
                    <div class="eglador-mb-2 eglador-text-lg eglador-font-black">${google.name}</div>
                    <div class="eglador-mb-2 eglador-text-xs">${google.description}</div>
                </div>
                ${result}
            </div>
        `;
        return resultWrapper;
    }

    content() {
        // console.log(this.google(), this.hotjar());
        let content = Section('', '', '', (this.google() + this.hotjar()));
        return content;
    }

    async template() {

        let contentWrapper = Div('eglador-overflow-y-scroll content-height eglador-p-8 eglador-pb-36 eglador-bg-gray-100');

        contentWrapper.appendChild(this.head());

        contentWrapper.appendChild(this.content());

        // contentWrapper.appendChild(this.foot());
        return contentWrapper;
    }

    clear() {
        document.querySelector('[data-type="body"]').innerHTML = "";
    }

    async init() {

        this.clear();

        document.querySelector('[data-type="body"]').appendChild(await this.template()); //body render

    }
}
export default main;
