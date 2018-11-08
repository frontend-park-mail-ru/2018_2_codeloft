'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import PagePointer from '../../components/PagePointer/PagePointer.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import Transport from '../../modules/Transport/Transport.js';
import '../../static/css/leaderboard-page.scss';

export default class HighScore extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<ScoreTable>
                         <Block {{class=leaders-page__pagination-block}}>
                         <Button {{text=Back}} {{class=button}} {{click=goMenu}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				this.scoreTable = this.elementsArray[0];
				this.paginator = this.elementsArray[1];
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__leaders-block');
				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});
				this.element = div;
				this.logoText = 'Leaders';
				this._innerName = 'Score';
				this.currentPage = 1;
				this.paginate(this.currentPage);
				eventBus.on('getPage', this.paginate.bind(this));
				resolve();
			});
		});
	}

	initPaginator() {
		this.pagesArray = [];
		this.pagesArray.push(new PagePointer('<<'));
		for (let i = 0; i < 5; i++) {
			this.pagesArray.push(new PagePointer(i + 1));
		}
		this.pagesArray.push(new PagePointer('>>'));
		this.pagesArray[1].render().setAttribute('class', 'active');
		this.pagesArray.forEach((pagePointer) => {
			this.paginator.render().appendChild(pagePointer.render());
		});
	}

	paginate(action) {
		if (!this.pagesArray) {
			this.initPaginator();
		}
		this.pageMap = {
			'-1': this.currentPage - 1,
			'+1': this.currentPage + 1,
		};
		const tempPage = this.pageMap[action] || action;
		if (tempPage > 5 || tempPage < 1) {
			return;
		}
		Transport.Get(`/user?page=${tempPage}&page_size=5`)
			.then((usersJSON) => usersJSON.json())
			.then((users) => {
				this.scoreTable.render().innerHTML = '';
				users.forEach((user) => {
					this.scoreTable.render().innerHTML += `<p>${user.login} ${user.score}</p>`;
				});
				this.pagesArray[this.currentPage].setUsual();
				this.pagesArray[tempPage].setActive();
				this.currentPage = tempPage;
			});
	}

	afterRender() {
		return super.afterRender();
	}
}
