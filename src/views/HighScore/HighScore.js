'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import PagePointer from '../../components/PagePointer/PagePointer.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import Transport from '../../modules/Transport/Transport.js';
import langService from '../../services/LangService/LangService.js';
import '../../static/css/leaderboard-page.scss';

export default class HighScore extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<ScoreTable>
							 <Block {{class=leaders-block__pagination-block}}>
							 <Button {{text=${langService.getWord('buttonBack')}}} {{class=leaders-block__back-button}} {{click=goMenu}}>`;
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
				this.minPage = 1;
				this.paginate(this.currentPage);
				eventBus.on('getPage', this.paginate.bind(this));
				resolve();
			});
		});
	}

	preRender() {
		return Transport.Get('/user').then((responseJSON) => responseJSON.json())
			.then((response) => {
				this.pageAmount = response.pagesCount;
			});
	}

	paginate(action) {
		this.pageMap = {
			'-1': this.currentPage - 1,
			'+1': this.currentPage + 1,
		};
		this.paginator.render().innerHTML = '';
		this.pagesMap = {};
		const backPointer = new PagePointer('<<');
		this.paginator.render().appendChild(backPointer.render());
		this.currentPage = this.pageMap[action] || action;

		if (this.currentPage < 1) {
			this.currentPage = 1;
		} else if (this.currentPage > this.pageAmount) {
			this.currentPage = this.pageAmount;
		}
		if (this.currentPage - this.minPage > 2) {
			this.minPage += this.currentPage - this.minPage - 2;
		}
		if (this.currentPage - this.minPage < 2 && this.minPage > 1) {
			this.minPage -= (2 - (this.currentPage - this.minPage));
		}
		for (let i = Math.max(1, this.minPage); i <= Math.min(this.minPage + 4, this.pageAmount); i++) {
			const tempPointer = new PagePointer(i);
			this.pagesMap[i] = tempPointer;
			this.paginator.render().appendChild(tempPointer.render());
		}

		const forwardPointer = new PagePointer('>>');
		this.paginator.render().appendChild(forwardPointer.render());
		this.pagesMap[this.currentPage].setActive();
		Transport.Get(`/user?page=${this.currentPage}&page_size=5`)
			.then((responseJSON) => responseJSON.json())
			.then((response) => {
				this.scoreTable.render().innerHTML = '';
				response.users.forEach((user) => {
					this.scoreTable.render().innerHTML += `<p>${user.login} ${user.score}</p>`;
				});
			});
	}

	afterRender() {
		return super.afterRender();
	}
}
