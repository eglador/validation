import Page from '../pages';
import { main, tracking, color, font, response } from '../pages/types';

const pageMap = {
    "main": main,
    "tracking": tracking,
    "font": font,
    "color": color,
    "response": response,
}

const pageTypeSelector = (naviList, data) => {
    const name = naviList.type;

    if (naviList.pageType) {

        if (naviList.pageType === 'static') {
            new pageMap[name]({
                "page": name,
                "header": data.header,
                "data": data.pages[name],
                "config": data.config
            }).init();
        }

    } else {
        new Page({
            "page": name,
            "data": data.pages[name],
            "config": data.config
        }).init();
    }
};

export default pageTypeSelector;