const Section = (className = "", attrName = "", attrValue = "", html = "", attributes = []) => {
    let element = document.createElement("div");

    if (className) {
        element.className = className;
    }
    if (attrName) {
        element.setAttribute(attrName, attrValue);
    }
    for (let i = 0, length = attributes.length; i < length; i++) {
        element.setAttribute(attributes[i].name, attributes[i].value);
    }

    if (html) {
        element.innerHTML = html;
    }
    return element;
}

const Ul = (className = "", attrName = "", attrValue = "", html = "", attributes = []) => {
    let element = document.createElement("ul");

    if (className) {
        element.className = className;
    }
    if (attrName) {
        element.setAttribute(attrName, attrValue);
    }
    for (let i = 0, length = attributes.length; i < length; i++) {
        element.setAttribute(attributes[i].name, attributes[i].value);
    }

    if (html) {
        element.innerHTML = html;
    }
    return element;
}

const Li = (className = "", attrName = "", attrValue = "", html = "", attributes = []) => {
    let element = document.createElement("li");

    if (className) {
        element.className = className;
    }
    if (attrName) {
        element.setAttribute(attrName, attrValue);
    }
    for (let i = 0, length = attributes.length; i < length; i++) {
        element.setAttribute(attributes[i].name, attributes[i].value);
    }

    if (html) {
        element.innerHTML = html;
    }
    return element;
}

const Div = (className = "", attrName = "", attrValue = "", html = "", attributes = []) => {
    let element = document.createElement("div");

    if (className) {
        element.className = className;
    }
    if (attrName) {
        element.setAttribute(attrName, attrValue);
    }
    for (let i = 0, length = attributes.length; i < length; i++) {
        element.setAttribute(attributes[i].name, attributes[i].value);
    }

    if (html) {
        element.innerHTML = html;
    }
    return element;
}

const Span = (className = "", attrName = "", attrValue = "", html = "", attributes = []) => {
    let element = document.createElement("span");

    if (className) {
        element.className = className;
    }
    if (attrName) {
        element.setAttribute(attrName, attrValue);
    }
    for (let i = 0, length = attributes.length; i < length; i++) {
        element.setAttribute(attributes[i].name, attributes[i].value);
    }

    if (html) {
        element.innerHTML = html;
    }
    return element;
}

const Button = (className = "", attrName = "", attrValue = "", html = "", attributes = []) => {
    let element = document.createElement("button");

    if (className) {
        element.className = className;
    }
    if (attrName) {
        element.setAttribute(attrName, attrValue);
    }
    for (let i = 0, length = attributes.length; i < length; i++) {
        element.setAttribute(attributes[i].name, attributes[i].value);
    }

    if (html) {
        element.innerHTML = html;
    }
    return element;
}

const Img = (className = "", attrName = "", attrValue = "", html = "", attributes = []) => {
    let element = document.createElement("img");

    if (className) {
        element.className = className;
    }
    if (attrName) {
        element.setAttribute(attrName, attrValue);
    }
    for (let i = 0, length = attributes.length; i < length; i++) {
        element.setAttribute(attributes[i].name, attributes[i].value);
    }

    if (html) {
        element.innerHTML = html;
    }
    return element;
}

export { Div, Span, Section, Ul, Li, Button, Img };