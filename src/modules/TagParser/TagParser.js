import Button from "../../components/Button/Button.js"
import Input from "../../components/Input/Input.js"

class TagParser {

    constructor() {
        this.tagExpr = /<\/?([^>\s\/]+)\s*([^>]*)\/?>/g;
        this.contextExpr = /{{([^=]*)=([^}]*)}}/g;
        this.tags = [];

        this.tagMap = {
            Button: () => new Button(),
            Input: () => new Input()
        };
    }

    toHTML(template) {
        let tagResult;
        let html = template;
        while (tagResult = this.tagExpr.exec(template)) {
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
        console.log(config);
        component.compile(config);
        return component.element;
    }

}

const tagParser = new TagParser();
export default tagParser;