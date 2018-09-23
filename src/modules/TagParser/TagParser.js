import Button from "../../components/Button/Button.js"

class TagParser {

    constructor() {
        this.tagExpr = /<\/?([^>\s\/]+)\s*([^>]*)\/?>/g;
        this.contextExpr = /{{([^=]*)=([^}]*)}}/g;
        this.tags = [];

        this.tagMap = {
            "Button" : () => new Button()
        };
    }

    toHTML(template) {

    }

    _getTags(template) {
        let tagResult;
        let html = template;
        while(tagResult = this.tagExpr.exec(template)) {
            let object = {};
            object.tag = tagResult[1];
            let contextResult;
            while (contextResult = this.contextExpr.exec(tagResult[2])) {
                object[contextResult[1]] = contextResult[2];
            }
            if (this.tagMap[object.tag]) {
                const compiled = this._getElement(object);
                html = html.replace(tagResult[0], compiled.outerHTML);
            }
        }
        return html;
    }

    _getElement(config) {
        const component = this.tagMap[config.tag]();
        component.compile(config);
        return component.element;
    }

}

let tagParser = new TagParser();
export default tagParser;