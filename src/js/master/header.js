import { Div, Img, Span } from "../helpers/htmlElement";

const header = {
    render(data) {
        let wrapper,
            logo = Span("eglador-w-32 eglador-h-auto block", "data-type", data.header.logo.name, data.header.logo.src),
            // menu = Span("eglador-fixed -eglador-left-12 eglador-top-0 eglador-block eglador-w-12 eglador-h-12 eglador-p-4 eglador-bg-white eglador-border-r eglador-border-solid eglador-border-gray-100 hover:eglador-bg-green-100 eglador-cursor-pointer", "data-type", data.header.menu.type, `<i class="eglador-block eglador-translate">${data.header.menu.src}</i>`);
            close = Span("eglador-fixed -eglador-left-12 eglador-top-0 eglador-block eglador-w-12 eglador-h-12 eglador-p-3 eglador-bg-white eglador-border-r eglador-border-solid eglador-border-gray-100 hover:eglador-bg-green-100 eglador-cursor-pointer", "data-type", data.header.close.type, `<i class="eglador-block eglador-translate">${data.header.close.src}</i>`);
        close.addEventListener("click", () => {
            close.querySelector("i").classList.toggle("eglador-rotate-45");
            document.querySelector("[data-type=master]").classList.toggle("eglador-translate-x-[28rem]");
        });
        // close.addEventListener("click", () => {
        //     location.reload();
        // });
        wrapper = Div("eglador-w-full eglador-flex eglador-items-center eglador-justify-between");
        wrapper.appendChild(logo);
        // wrapper.appendChild(menu);
        wrapper.appendChild(close);
        return wrapper;
    }
}

export default header;