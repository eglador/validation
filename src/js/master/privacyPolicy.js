import { Div } from "../helpers/htmlElement";

const privacyPolicy = {
    render(data) {
        let wrapper,
            legaltext = Div("eglador-pr-14 eglador-text-xs", "data-type", data.privacyPolicy.type, data.privacyPolicy.description),
            legalClose = Div("eglador-absolute eglador-top-5 eglador-right-5 eglador-w-8 eglador-h-8 eglador-flex eglador-items-center eglador-justify-center eglador-text-xs eglador-bg-yellow-200 eglador-cursor-pointer", "data-type", "legalClose", "X");
        legalClose.addEventListener("click", () => {
            legalClose.closest('[data-type="privacyPolicy"]').remove();
        });
        wrapper = Div("");
        wrapper.appendChild(legaltext);
        wrapper.appendChild(legalClose);
        return wrapper;
    }
}

export default privacyPolicy;