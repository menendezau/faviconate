export namespace ui{

    export class Element<T extends HTMLElement>{

        constructor(raw: T){
            if(!raw) {
                throw "HTMLElement Needed";
            }
        }

        //region Properties
        /**
         * Property field
         */
        private _raw: T = null;

        /**
         * Gets or sets the element
         *
         * @returns {T}
         */
        get raw(): T {
            return this._raw;
        }
        //endregion

    }

    export class GenericElement extends Element<HTMLDivElement>{

        constructor(e: HTMLDivElement = null){
            super(e || document.createElement('div'));
        }
    }

}