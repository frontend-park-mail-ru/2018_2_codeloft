import Button from '../../components/Button/Button.js'
import Input from '../../components/Input/Input.js'
import ScoreTable from '../../components/ScoreTable/ScoreTable.js'
import UserInfo from '../../components/UserInfo/UserInfo.js'
import Block from '../../components/Block/Block.js'

/**
 * Класс, нужный для сборки документа по кастомному шаблону
 */
class TagParser {
  
    constructor() {
        /**
         * Находит тэги в шаблоне
         * @private
         * @type {RegExp}
         */
        this.tagExpr = /<\/?([^>\s\/]+)\s*([^>]*)\/?>/g;
        /**
         * Парсит содержимое тэга для вставки конткста в Handlebars
         * @private
         * @type {RegExp}
         */
        this.contextExpr = /{{([^=]*)=([^}]*)}}/g;

        /**
         * Мапа для отображения имени кастомного тэга в конкретную компоненту
         * @see MainComponent
         */
        this.tagMap = {
            Button: () => new Button(),
            Input: () => new Input(),
            ScoreTable: () => new ScoreTable(),
            UserInfo: () => new UserInfo(),
            Block: () => new Block()
        };
    }

    /**
     * Публичный метод для получения HTML кода
     * @param template - кастомный шаблон
     * @param attrs - атрибуты для родительского блока, который будет оберткой над шаблоном
     * @param tag - тэг обертки над шаблоном
     * @return {HTMLDivElement}
     */
    toHTML(template, attrs, tag) {
        let tagResult;
        const html = document.createElement(tag || 'div');
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

    /**
     * Метод для получения кода элемента по его кастомному тэгу
     * @param config - параметры для компиляции
     * @return {void|element|*} - код для вставки в элемент
     * @private
     */
    _getElement(config) {
        const component = this.tagMap[config.tag]();
        component.compile(config);
        return component.render();
    }
}

const tagParser = new TagParser()
export default tagParser