import { Div, Span, Img } from "../../helpers/htmlElement";

class validate {
    constructor(props) {
        this.options = props;
        this.data = props.data;
        this.config = props.config;
        this.collectedClass = 'validation-collected';
        this.requestMap = props.config.response.list;
        this.reportSuccessInfo = [];
        this.reportWarningInfo = [];
        this.responseStatus = [];
    }

    async responceStatusClass(styleString) {
        const style = document.createElement('style');
        style.setAttribute("title", "responceStatusClass");
        style.textContent = styleString;
        //console.log(style);
        document.head.append(style);
    }

    async selectorCssCreate(item, classSelector) {
        if (item.docElementSelector) {
            let rootClassSelector = `html body `;
            this.responceStatusClass(`
                        @keyframes selectedItemAnimation {
                            0% {border-color: red}
                            50% {border-color: yellow}
                            100% {border-color: red}
                          }
                    `);
            if (classSelector == "img") {
                this.responceStatusClass(`
                        ${rootClassSelector}${classSelector}{position:relative}
    
                        ${rootClassSelector}${classSelector}{border-width:6px; border-style:solid}
                        ${rootClassSelector}${classSelector}.warning{border-color:rgba(254, 249, 195, 1); background-color:rgba(254, 249, 195, .2)}
                        ${rootClassSelector}${classSelector}.success{border-color:rgba(220, 252, 231, 1); background-color:rgba(220, 252, 231, .2)}
    
                        ${rootClassSelector}${classSelector}::after{position:absolute; left:0; top:0; z-index:9999; padding: 0 2px 0 2px; font-size:10px}
                        ${rootClassSelector}${classSelector}.v-200::after{content:"200"; background-color:rgba(220, 252, 231, 1)}
                        ${rootClassSelector}${classSelector}.v-404::after{content:"404"; background-color:rgba(254, 249, 195, 1)}
                        ${rootClassSelector}${classSelector}.v-novalid::after{content:"novalid"; background-color:red}

                        ${rootClassSelector}${classSelector}.selectedItem{animation: selectedItemAnimation 1s infinite;}
                    `);
            } else {
                this.responceStatusClass(`
                        ${rootClassSelector}${classSelector}{position:relative}
    
                        ${rootClassSelector}${classSelector}::before{content:""; position:absolute; left:0; top:0; z-index:9999; width:100%; height:100%; border-width:4px; border-style:solid}
                        ${rootClassSelector}${classSelector}.success::before{border-color:rgba(220, 252, 231, 1); background-color:rgba(220, 252, 231, .2)}
                        ${rootClassSelector}${classSelector}.warning::before{border-color:rgba(254, 249, 195, 1); background-color:rgba(254, 249, 195, .2)}                                    
    
                        ${rootClassSelector}${classSelector}::after{position:absolute; left:0; top:0; z-index:9999; padding: 0 2px 0 2px; font-size:10px}
                        ${rootClassSelector}${classSelector}.v-200::after{content:"200" !important; background-color:rgba(220, 252, 231, 1)}
                        ${rootClassSelector}${classSelector}.v-404::after{content:"404" !important; background-color:rgba(254, 249, 195, 1)}
                        ${rootClassSelector}${classSelector}.v-novalid::after{content:"novalid" !important; background-color:red}

                        ${rootClassSelector}${classSelector}.selectedItem::before{animation: selectedItemAnimation 1s infinite;}
                    `);
            }
        }
    }

    async elementSelector(item, element, css) {
        item.docElementSelector !== undefined ? element.classList.add(css) : '';
    }

    async totalUse(item, count) {

        const headTotalSelector = document.querySelector(`[data-name="${item.type}"] [data-name="use"] [data-name="count"]`);
        const innerTotalSelector = document.querySelector(`[data-type="${item.type}"] [data-name="use"] [data-name="count"]`);
        if (headTotalSelector) {
            headTotalSelector.textContent = count;
        }
        if (innerTotalSelector) {
            innerTotalSelector.textContent = count;
        }

    }

    async countSuccess(item) {

        if (this.reportSuccessInfo[item.type]) {
            this.reportSuccessInfo[item.type].count++
        } else {
            this.reportSuccessInfo[item.type] = { "count": 1 };
        }

        const headTotalSelector = document.querySelector(`[data-name="${item.type}"] [data-name="success"] [data-name="count"]`);
        const innerTotalSelector = document.querySelector(`[data-type="${item.type}"] [data-name="success"] [data-name="count"]`);
        if (headTotalSelector && this.reportSuccessInfo[item.type].count) {
            headTotalSelector.textContent = this.reportSuccessInfo[item.type].count;
        }
        if (innerTotalSelector && this.reportSuccessInfo[item.type].count) {
            innerTotalSelector.textContent = this.reportSuccessInfo[item.type].count;
        }

    }

    async countWarning(item) {

        if (this.reportWarningInfo[item.type]) {
            this.reportWarningInfo[item.type].count++
        } else {
            this.reportWarningInfo[item.type] = { "count": 1 };
        }

        const headTotalSelector = document.querySelector(`[data-name="${item.type}"] [data-name="warning"] [data-name="count"]`);
        const innerTotalSelector = document.querySelector(`[data-type="${item.type}"] [data-name="warning"] [data-name="count"]`);
        if (headTotalSelector && this.reportWarningInfo[item.type].count) {
            headTotalSelector.textContent = this.reportWarningInfo[item.type].count;
        }
        if (innerTotalSelector && this.reportWarningInfo[item.type].count) {
            innerTotalSelector.textContent = this.reportWarningInfo[item.type].count;
        }

    }

    async countAlert(item, count) {
        const headTotalSelector = document.querySelector(`[data-name="${item.type}"] [data-name="alert"] [data-name="count"]`),
            innerTotalSelector = document.querySelector(`[data-type="${item.type}"] [data-name="alert"] [data-name="count"]`),
            innerAlertSelector = document.querySelector(`[data-type="${item.type}"] [data-name="alert"]`);

        if (innerAlertSelector) {
            if (item.rules) {

                let max = item.rules.use.max,
                    min = item.rules.use.min,
                    alertHtml,
                    alerts = {
                        'head': 0,
                        'inner': 0
                    };

                if (count < min.value) {
                    innerAlertSelector.classList.add("eglador-cursor-wait");
                    alertHtml += min.description + " ";
                    alerts.head++;
                    alerts.inner++;
                }
                if (count > max.value) {
                    innerAlertSelector.classList.add("eglador-cursor-wait");
                    alertHtml += max.description + " ";
                    alerts.head++;
                    alerts.inner++;
                }

                innerTotalSelector.textContent = alerts.inner;
                headTotalSelector.textContent = alerts.head;
                innerAlertSelector.setAttribute("title", alertHtml += item.rules.use.description);
            }
        }

    }

    async responseCountShow() {

        Object.entries(this.config.response.list).forEach(([key, element]) => {
            const selector = document.querySelector(`[data-name="useResponseStatus"] [data-name="response-${element.code}"] [data-name="count"]`);
            if (selector && this.responseStatus[element.code]) {
                selector.textContent = this.responseStatus[element.code].count;
            }
        });

    }

    async responseCount(status) {
        if (this.responseStatus[status]) {
            this.responseStatus[status].count++
        } else {
            this.responseStatus[status] = { "count": 1 };
        }
        this.responseCountShow()
    }

    async fetchAwait(url) {
        return await fetch(url)
            .then((response) => response.status);
    }

    async requesStatus(url, data, element) {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            if (url.charAt(0) == "/") {
                url = canonical.href !== "" ? canonical.href : '' + url;
            }
        }
        let request;
        await this.fetchAwait(url)
            .then(status => {
                if (this.requestMap[status]) {

                    request = Span(this.requestMap[status].color.bgColor.dark + " eglador-font-bold eglador-rounded-full eglador-py-1 eglador-px-2", "data-name", "request", status);

                    this.elementSelector(data, element, this.requestMap[status].class);
                }

                this.responseCount(status);

                //console.log(status);
            })
            .catch(err => {

                request = Span(this.requestMap['novalid'].color.bgColor.dark + " eglador-font-bold eglador-rounded-full eglador-py-1 eglador-px-2", "data-name", "request", this.requestMap['novalid'].code);

                this.responseCount('novalid');

                this.elementSelector(data, element, this.requestMap['novalid'].class);

                //console.log(err);
            });

        return request;
    }

    async staticAttributes(data, item) {
        let reportContentWrapper = Div();
        let reportContent;

        //console.log(data);

        let staticContent = item.textContent.replace(/\n/g, "")
            .replace(/\s/g, ""),
            staticJSON = JSON.parse(staticContent);

        //console.log(staticJSON);

        for (let i = 0, length = data.attributes.items.length; i < length; i++) {
            const attr = data.attributes.items[i];
            //console.log(attr, item);

            if (staticJSON[attr.name]) {
                reportContent = Div("eglador-p-2 eglador-bg-green-100");
                let name = Span("eglador-font-bold", "data-name", "attr-name", `${attr.name} : `);
                let value = Span("", "data-name", "attr-value", staticJSON[attr.name]);
                let request = Span("eglador-font-bold", "data-name", "request");

                this.countSuccess(data);
                reportContent.appendChild(name);
                if (attr.items) {
                    value = Span("", "data-name", "attr-value", "=>");
                }
                reportContent.appendChild(value);
                reportContent.appendChild(request);

                if (attr.items) {
                    let subReportContent = Div("eglador-p-2 eglador-bg-green-200");
                    let subName = Span("");
                    let subValue = Span("");

                    for (let j = 0, attrItemsLength = attr.items.length; j < attrItemsLength; j++) {
                        const subAttr = attr.items[j];
                        //console.log(staticJSON[attr.name][subAttr.name]);
                        if (staticJSON[attr.name][subAttr.name]) {
                            subReportContent = Div("eglador-p-2 -eglador-mx-2 eglador-bg-green-200");
                            subName = Span("eglador-font-bold", "data-name", "attr-name", `${subAttr.name} : `);
                            subValue = Span("", "data-name", "attr-value", staticJSON[attr.name][subAttr.name]);
                            this.countSuccess(data);
                        } else {
                            subReportContent = Div(`eglador-p-2 ${(attr.required == true ? "eglador-bg-yellow-100" : "eglador-bg-gray-100")}`);
                            subName = Span("eglador-font-bold", "data-name", "attr-name", `${subAttr.name} : `);
                            subValue = Span("", "data-name", "attr-value", "null");

                            attr.required == true ? this.countWarning(data) : '';
                        }
                        subReportContent.appendChild(subName);
                        subReportContent.appendChild(subValue);
                        reportContent.appendChild(subReportContent);
                    }
                }

            } else {
                reportContent = Div(`eglador-p-2 ${(attr.required == true ? "eglador-bg-yellow-100" : "eglador-bg-gray-100")}`);
                let name = Span("eglador-font-bold", "data-name", "attr-name", `${attr.name} : `);
                let required = Span("eglador-font-bold", "data-name", "attr-required", "null");
                let request = Span("eglador-font-bold", "data-name", "request", `${(attr.required == true ? "(* required)" : "")}`);
                reportContent.appendChild(name);
                reportContent.appendChild(required);

                //this.elementSelector(data, item, 'warning');
                attr.required == true ? this.countWarning(data) : '';
                reportContent.appendChild(request);
            }

            reportContentWrapper.appendChild(reportContent);
        }

        return reportContentWrapper;
    }

    async attributes(data, item) {
        let reportContentWrapper = Div();
        let reportContent;

        //console.log(data);

        for (let i = 0, length = data.attributes.items.length; i < length; i++) {
            const attr = data.attributes.items[i];
            //console.log(attr, item);

            if (item.getAttribute(attr.name)) {
                reportContent = Div("eglador-p-2 eglador-space-x-1 eglador-bg-green-100", "data-filter-name", attr.name);
                let name = Span("eglador-font-bold", "data-name", "attr-name", `${attr.name} : `);
                let value = Span("", "data-name", "attr-value", item.getAttribute(attr.name));
                let request = Span("eglador-font-bold", "data-name", "request");

                if (attr.preview) {
                    let preview = Img("eglador-w-8 eglador-h-8 eglador-float-left eglador-mr-2 eglador-mb-2", "src", item.getAttribute(attr.name));
                    reportContent.appendChild(preview);
                }

                if (attr.request) {
                    request = await this.requesStatus(item.getAttribute(attr.name), data, item);
                }

                this.elementSelector(data, item, 'success');
                this.countSuccess(data);
                reportContent.appendChild(name);
                reportContent.appendChild(value);
                reportContent.appendChild(request);
            } else {
                reportContent = Div(`eglador-p-2 eglador-space-x-1 ${(attr.required == true ? "eglador-bg-yellow-100" : "eglador-bg-gray-100")}`, "data-filter-name", attr.name);
                let name = Span("eglador-font-bold", "data-name", "attr-name", `${attr.name} : `);
                let required = Span("eglador-font-bold", "data-name", "attr-required", "null");
                let request = Span("eglador-font-bold", "data-name", "request", `${(attr.required == true ? "(* required)" : "")}`);
                reportContent.appendChild(name);
                reportContent.appendChild(required);

                this.elementSelector(data, item, (attr.required == true ? "warning" : ""));
                attr.required == true ? this.countWarning(data) : '';
                reportContent.appendChild(request);
            }

            reportContentWrapper.appendChild(reportContent);
        }

        return reportContentWrapper;
    }

    async noAttributes(data, item) {

        let reportContentWrapper;

        if (item.textContent !== "") {
            reportContentWrapper = Div("eglador-p-2 eglador-space-x-1 eglador-bg-green-100");
            let reportContent = Span("", "data-name", "attr-name", item.textContent);
            reportContentWrapper.appendChild(reportContent);

            this.elementSelector(data, item, 'success');
            this.countSuccess(data);
        } else {
            reportContentWrapper = Div("eglador-p-2 eglador-space-x-1 eglador-bg-yellow-100");
            reportContentWrapper.innerHTML = `
                <span data-name="attr-name">null</span>
                <span data-name="attr-required" class="eglador-font-bold">(* required)</span>
            `;

            this.elementSelector(data, item, 'warning');
            this.countWarning(data);
        }

        return reportContentWrapper;
    }

    async reportAppend(item, nodeEl) {
        const selector = document.querySelector(`[data-type="${item.type}"] [data-name="reports"]`);
        if (selector) {
            selector.appendChild(nodeEl);
        }
        this.itemProgress(item, false);
    }

    async addFilter(item) {
        const typeSelector = document.querySelector(`[data-type="${item.type}"]`);
        const selector = document.querySelector(`[data-type="${item.type}"] [data-name="filter"]`);
        const filterNav = (filteredValue) => {

            const filterDivs = typeSelector.querySelectorAll("[data-filter-name]");
            for (let index = 0, elLength = filterDivs.length; index < elLength; index++) {
                const element = filterDivs[index];
                element.classList.remove('eglador-hidden', 'eglador-block');

                if (filteredValue) {
                    if (filteredValue === element.getAttribute("data-filter-name")) {
                        element.classList.add('eglador-block');
                    } else {
                        element.classList.add('eglador-hidden');
                    }
                }
            }

        }

        if (selector) {
            const x = selector.querySelector('select');
            for (let i = 0, length = item.attributes.items.length; i < length; i++) {
                const element = item.attributes.items[i];
                let option = document.createElement("option");
                option.text = element.name;
                option.value = element.name;
                x.add(option);
            }
            x.addEventListener("change", (el) => {
                filterNav(x.value);
            });

        }
    }

    async filterHide(item) {
        const selector = document.querySelector(`[data-type="${item.type}"] [data-name="filter"]`);
        selector.classList.add('eglador-hidden');
    }

    async itemProgress(item, stat) {
        const headSelector = document.querySelector(`[data-type="${item.type}"]`);
        const innerSelector = document.querySelector(`[data-name="${item.type}"]`);
        if (stat) {
            headSelector.classList.add("eglador-animate-pulse");
            innerSelector.classList.add("eglador-animate-pulse");

            this.options.navs.classList.add("eglador-pointer-events-none", "eglador-opacity-10");
            this.options.pageNav.classList.add("eglador-animate-pulse");
            this.options.scanButton.classList.add("eglador-pointer-events-none", "eglador-animate-pulse");
            this.options.refreshButton.classList.add("eglador-pointer-events-none", "eglador-opacity-10");
        } else {
            headSelector.classList.remove("eglador-animate-pulse");
            innerSelector.classList.remove("eglador-animate-pulse");

            this.options.navs.classList.remove("eglador-pointer-events-none", "eglador-opacity-10");
            this.options.pageNav.classList.remove("eglador-animate-pulse");
            this.options.scanButton.classList.remove("eglador-animate-pulse");
            this.options.refreshButton.classList.remove("eglador-pointer-events-none", "eglador-opacity-10");
        }

    }

    async item(item) {

        const collectedItems = document.querySelectorAll(`${item.element}:not(.${this.collectedClass})`);



        if (collectedItems.length) {
            this.totalUse(item, collectedItems.length);
            this.countAlert(item, collectedItems.length);
        }

        this.selectorCssCreate(item, item.element);

        for (let i = 0, length = collectedItems.length; i < length; i++) {

            this.itemProgress(item, true);

            const element = collectedItems[i];
            const reportIndex = i + 1;

            const reportDiv = Div("eglador-w-full eglador-mb-2 eglador-flex eglador-break-all", "data-name", `report${reportIndex}`);
            const reportNumber = Div("eglador-w-10 eglador-py-2 eglador-pr-2 eglador-flex eglador-font-bold", "", "", reportIndex);
            const reportContentWrapper = Div("eglador-w-full");
            reportDiv.appendChild(reportNumber);

            if (item.attributes.status) {
                if (item.staticAttributes) {
                    reportContentWrapper.appendChild(await this.staticAttributes(item, element));
                } else {
                    reportContentWrapper.appendChild(await this.attributes(item, element));
                }

            } else {
                reportContentWrapper.appendChild(await this.noAttributes(item, element));
            }

            //element focus
            let viewportOffsetTop = element.getBoundingClientRect().top;
            reportDiv.addEventListener("click", () => {
                element.classList.toggle("selectedItem")
                window.scrollTo(0, viewportOffsetTop);
            });
            //element focus

            reportDiv.appendChild(reportContentWrapper);
            this.reportAppend(item, reportDiv);

            element.classList.add(this.collectedClass);
        }

        if (item.attributes.status) {
            if (item.staticAttributes) {
                this.filterHide(item);
            } else {
                this.addFilter(item);
            }
        } else {
            this.filterHide(item);
        }

    }

    async listItems(list) { //=> item
        for (let i = 0, listItemsLength = list.items.length; i < listItemsLength; i++) {
            const listItem = list.items[i];

            this.item(listItem);
        }
    }

    async contentList() { //=> listItem
        if (this.data.content.list) {
            //console.log("this.data.content.list", this.data.content.list);
            for (let i = 0, listLength = this.data.content.list.length; i < listLength; i++) {
                const list = this.data.content.list[i];
                //console.log("list", list);

                this.listItems(list);
            }
        }
    }

    async validationCLassClear() {
        const _this = this;
        const elems = document.querySelectorAll("." + this.collectedClass);
        [].forEach.call(elems, function (el) {
            el.classList.remove(_this.collectedClass);
        });
    }

    init() {

        console.log("valid clear");
        this.validationCLassClear();

        console.log("valid start");
        this.contentList();

    }
}
export default validate;