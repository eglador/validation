import { Div, Span } from '../helpers/htmlElement';
import pageTypeSelector from '../helpers/pageTypeSelector';

const navigation = {
    render(data) {

        let nav = Div("eglador-w-full eglador-flex eglador-justify-between eglador-items-center eglador-overflow-auto");
        data.navigation.list.forEach(naviList => {

            let button = Div("eglador-mr-5 ", "", "", "", [
                { "name": "data-type", "value": "navigate-item" },
                { "name": "data-name", "value": naviList.type }
            ]);

            let inner = Div("eglador-flex eglador-flex-col eglador-justify-center eglador-items-center eglador-text-center eglador-w-auto");
            let icon = Span("icon eglador-w-8 eglador-h-8 eglador-flex eglador-p-2 eglador-justify-center eglador-items-center eglador-bg-gray-100 eglador-rounded-full eglador-mb-px eglador-cursor-pointer hover:eglador-bg-green-100", "", "", naviList.icon);
            let text = Span("eglador-text-xs eglador-whitespace-nowrap", "", "", naviList.name);
            inner.appendChild(icon);
            inner.appendChild(text);
            button.appendChild(inner);

            icon.addEventListener("click", () => {
                let responceStatusClassSelector = document.querySelectorAll("style[title]");
                responceStatusClassSelector.forEach(element => {
                    element.remove();
                });
                data.navigation.list.forEach(item => {
                    var selector = document.querySelector(`[data-type="navigation"] [data-name='${item.type}'] .icon`);
                    selector.classList.add("eglador-bg-gray-100");
                    selector.classList.remove("eglador-bg-green-100");
                });
                icon.classList.remove("eglador-bg-gray-100");
                icon.classList.add("eglador-bg-green-100");
                pageTypeSelector(naviList, data);

            });

            if (naviList.childs !== "") {
                let childButton = Div("eglador-mr-5 eglador-cursor-pointer", "data-name", child.type);
                let childInner = Div("eglador-flex eglador-flex-col eglador-justify-center eglador-items-center eglador-text-center eglador-w-auto");
                let childIcon = Span("icon eglador-w-8 eglador-h-8 eglador-flex eglador-p-2 eglador-justify-center eglador-items-center eglador-bg-gray-100 eglador-rounded-full eglador-mb-px eglador-cursor-pointer", "", "", child.icon);
                let childtext = Span("eglador-text-xs eglador-whitespace-nowrap", "", "", child.name);
                childInner.appendChild(childIcon);
                childInner.appendChild(childtext);
                button.appendChild(childButton);
            }

            nav.appendChild(button);
        });

        setTimeout(() => {
            var defaultPage = { "type": "main", "pageType": "static" };
            pageTypeSelector(defaultPage, data);
        }, 300);

        return nav;

    }
}

export default navigation;
