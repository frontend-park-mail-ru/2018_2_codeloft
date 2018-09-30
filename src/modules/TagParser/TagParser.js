import Button from "../../components/Button/Button.js"
import Input from "../../components/Input/Input.js"
import ScoreTable from "../../components/ScoreTable/ScoreTable.js";
import UserInfo from "../../components/UserInfo/UserInfo.js";
import Block from "../../components/Block/Block.js";

class TagParser {

    constructor() {
        this.tagExpr = /<\/?([^>\s\/]+)\s*([^>]*)\/?>/g;
        this.contextExpr = /{{([^=]*)=([^}]*)}}/g;
        this.tags = [];

        this.tagMap = {
            Button: () => new Button(),
            Input: () => new Input(),
            ScoreTable: () => new ScoreTable(),
            UserInfo: () => new UserInfo(),
            Block: () => new Block()
        };
    }

    toHTML(template, attrs, tag) {
        let tagResult;
        let html = document.createElement(tag || 'div');
        while (tagResult = this.tagExpr.exec(template)) {
            let object = {};
            object.fullText = tagResult[0];
            object.tag = tagResult[1];
            let contextResult;
            while (contextResult = this.contextExpr.exec(tagResult[2])) {
                object[contextResult[1]] = contextResult[2];
            }
            html.appendChild(this._getElement(object));
        }
        for (let attr in attrs) {
            html.setAttribute(attr, attrs[attr]);
        }
        return html;
    }

    _getElement(config) {
        const component = this.tagMap[config.tag]();
        component.compile(config);
        return component.render();
    }

}

const tagParser = new TagParser();
export default tagParser;