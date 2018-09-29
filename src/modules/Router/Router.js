'use strict';

class Router {

    constructor() {
        this.routesMap = {};
        this.currentView = null;
    }

    start() {

        window.onpopstate = (event => {
            this._onRoute(window.location.pathname);
        });

        this._onRoute(window.location.pathname);
        console.log(window.location.pathname);
    }

    _onRoute(pathname) {
        const view = this.routesMap[pathname];
        console.log(view);

        if (!view) {
            return;
        }

        if (this.currentView) {
            this.currentView.hide();
        }
        this.currentView = view;
        this.currentView.show();
    }

    add(path, view) {
        this.routesMap[path] = view;
        return this;
    }

}

const router = new Router();
export default router;