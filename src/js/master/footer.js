import { Div } from "../helpers/htmlElement";

const footer = {
    render(data) {
        return Div("eglador-text-xs", "", "", data.footer.copyright);
    }
}

export default footer;