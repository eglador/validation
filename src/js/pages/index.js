import emptyBox from "../components/box/emptyBox";
import emptyReportList from "../components/report/emptyReportList";
import validate from "../components/validate";
import { Button, Div, Section, Span } from "../helpers/htmlElement";

class Page {
    constructor(props) {
        this.options = props;
        this.data = this.options.data;
        this.config = this.options.config;
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
        let scanButton = Button(`eglador-p-4 eglador-w-full eglador-bg-green-400 eglador-cursor-pointer`, "", "", "Scan");
        let refreshButton = Button(`${this.data.head.refresh.status == true ? '' : 'eglador-hidden'} eglador-p-4 eglador-w-full eglador-bg-blue-400 eglador-cursor-pointer`, "", "", this.data.head.refresh.title ?? '');

        refreshButton.addEventListener("click", () => {
            alert("refresh");
        });

        scanButton.addEventListener("click", () => {
            this.pageNav.classList.add("eglador-animate-pulse");
            scanButton.classList.add("eglador-pointer-events-none", "eglador-animate-pulse", "eglador-opacity-10");
            refreshButton.classList.add("eglador-pointer-events-none", "eglador-opacity-10");

            new validate({
                'data': this.data,
                'config': this.config,
                'pageNav': this.pageNav,
                'navs': this.navs,
                'scanButton': scanButton,
                'refreshButton': refreshButton
            }).init(); //validate func

        });

        section.appendChild(scanButton);
        section.appendChild(refreshButton);
        return section;
    }

    template() {
        let content = Div('eglador-overflow-y-scroll content-height eglador-p-8 eglador-pb-36 eglador-bg-gray-100');

        content.appendChild(this.head());

        content.appendChild(emptyReportList.render(this.data, this.config));
        content.appendChild(emptyBox.render(this.data));

        content.appendChild(this.foot());
        return content;
    }

    clear() {
        document.querySelector('[data-type="body"]').innerHTML = "";
    }

    init() {

        this.clear();

        document.querySelector('[data-type="body"]').appendChild(this.template()); //body render


    }
}
export default Page;