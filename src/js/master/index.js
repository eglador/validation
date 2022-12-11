import appData from '../../store';
import { Div } from '../helpers/htmlElement';

import header from './header';
import footer from './footer';
import navigation from './navigation';
import privacyPolicy from './privacyPolicy';

class egladorValidation {
    constructor() {
        this.appClass = "validationApp";
        this.data = appData;
        this.performance = window.performance;
    }

    header() {
        let html = Div('', 'data-type', 'header');
        let content = Div('eglador-w-full eglador-max-w-md eglador-overflow-hidden eglador-h-24 eglador-px-8 eglador-py-4 eglador-z-40 eglador-sticky eglador-top-0 eglador-right-0 eglador-flex eglador-items-center eglador-bg-white eglador-shadow-bottom');
        content.appendChild(header.render(this.data));

        html.appendChild(content);
        return html;
    }

    body() {
        let html = Div('', 'data-type', 'body');
        let content = Div('eglador-overflow-y-scroll content-height eglador-p-4 eglador-bg-gray-100');

        html.appendChild(content);
        return html;
    }

    navigation() {
        let html = Div('', 'data-type', 'navigation');
        let content = Div('eglador-w-full eglador-max-w-md eglador-overflow-hidden eglador-p-4 eglador-z-50 eglador-sticky eglador-bottom-16 eglador-right-0 eglador-border-t eglador-border-b eglador-border-dashed eglador-border-slate-300 eglador-bg-white eglador-shadow-top');
        content.appendChild(navigation.render(this.data));
        html.appendChild(content);
        return html;
    }

    privacyPolicy() {
        let html = Div('', 'data-type', 'privacyPolicy');
        let content = Div('eglador-w-full eglador-max-w-md eglador-overflow-hidden eglador-p-4 eglador-z-50 eglador-absolute eglador-bottom-36 eglador-right-0 eglador-border-t eglador-border-b eglador-border-dashed eglador-border-slate-300 eglador-bg-yellow-50 eglador-shadow-top');
        content.appendChild(privacyPolicy.render(this.data));
        html.appendChild(content);
        return html;
    }

    footer() {
        let html = Div('', 'data-type', 'footer');
        let content = Div('eglador-w-full eglador-max-w-md eglador-overflow-hidden eglador-p-4 eglador-h-16 eglador-z-40 eglador-sticky eglador-bottom-0 eglador-right-0 eglador-bg-white');
        content.appendChild(footer.render(this.data));

        html.appendChild(content);
        return html;
    }

    template() {
        let master = Div('eglador-w-full eglador-max-w-md eglador-h-screen eglador-z-[9999999999] eglador-fixed eglador-top-0 eglador-right-0 eglador-drop-shadow-2xl eglador-transition eglador-bg-white', 'data-type', 'master');
        
        master.appendChild(this.header());
        master.appendChild(this.body());
        master.appendChild(this.privacyPolicy());
        master.appendChild(this.navigation());
        master.appendChild(this.footer());

        return master;
    }
    init() {
        const app = Div('','id',this.appClass);
        document.body.appendChild(app);
        document.getElementById(this.appClass).appendChild(this.template());
    }
}
export default egladorValidation;