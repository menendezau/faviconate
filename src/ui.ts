import {latte} from "./latte";
import {animation} from "./animation";

export namespace ui{

    import Animation = animation.Animation;
    import DateTime = latte.DateTime;
    import PropertyTarget = latte.PropertyTarget;
    import DidSet = latte.DidSet;
    import Any = latte.Any;

    export enum LanguageDirection{
        AUTO,
        RTL,
        LTR
    }

    interface IRawParams {
        [key: string]: number;
    }

    export class Element<T extends HTMLElement> extends PropertyTarget{

        /**
         * Creates a new element by also creating the raw element.
         * @param {K} tagName
         * @returns {ui.Element<HTMLElementTagNameMap[K]>}
         */
        static of<K extends keyof HTMLElementTagNameMap>(tagName: K): Element<HTMLElementTagNameMap[K]>{
            let raw = document.createElement(tagName);
            return new Element<HTMLElementTagNameMap[K]>(raw);
        }

        //region Static
        //endregion

        //region Fields
        /**
         * Property field
         */
        private _isBeingAnimated: boolean = false;
        //endregion

        constructor(raw: T){
            super();

            if(!raw) {
                throw "HTMLElement Needed";
            }

            this.setPropertyValue('raw', raw, HTMLElement);
        }

        //region Private Methods


        /**
         * Converts the value in css format to a number
         *
         * @param property
         * @returns {number}
         */
        private getCssNumericValue(property: string): number{

            return parseFloat(this.raw.style[property as any] as any || '0');
        }

        /**
         * Converts the value to a value + px, depending on the property
         *
         * @param property
         * @param value
         */
        private setCssNumericValue(property: string, value: number){

            if(property == 'opacity') {
                this.raw.style[property] = String(value);
            }else {
                this.raw.style[property as any] = value + 'px';
            }

        }

        //endregion

        //region Methods

        /**
         * Adds class(es) to the element. Multiple classes might be separated by spaces.
         * @param {string} name
         */
        addClass(name: string): this{
            if(name.indexOf(' ') > 0) {
                name.split(' ').forEach(token => this.raw.classList.add(token));
            }else{
                this.raw.classList.add(name);
            }
            return this;
        }

        /**
         * Adds the specified element to the child nodes
         * @param {ui.Element<T extends HTMLElement>} e
         * @returns {ui.Element<T extends HTMLElement>}
         */
        add(e: Element<HTMLElement> | Element<HTMLElement>[] | HTMLElement): this{

            if(e instanceof HTMLElement) {
                this.raw.appendChild(e);

            }else if(e instanceof Element) {
                this.add(e.raw);
                e.raise('attach');

            }else if(e instanceof Array) {
                e.forEach(piece => this.add(piece));
            }

            return this;
        }

        /**
         * Animates the element specified properties, by establishing the initial values for the properties to animate.
         *
         * @param startProperties
         * @param endProperties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        animateFrom(startProperties: any, endProperties: any, duration: number = 0.1, callback: () => void = null): this{

            let animations: Animation[] = [];

            let setValue = (p: any, value: number) => {
                if(!this.hasPropertyValue(p)) {
                    this.setCssNumericValue(p, value);
                }else {
                    this.setPropertyValue(p, value, Any);
                }
            };

            for(let p in startProperties){
                let a = new Animation(startProperties[p], endProperties[p], duration, null);
                a.tag = p;
                animations.push(a);
            }

            if(animations.length > 0) {
                let leader = animations[0];

                // Handle update
                leader.on('update', () => {
                    // Update all values
                    for (let i = 0; i < animations.length; i++) {
                        let a = animations[i];
                        setValue(a.tag, leader.running ? a.currentValue : a.endValue);
                    }
                });

                // Handle end of animations
                leader.on('ended',() => {
                    this._isBeingAnimated = false;
                });

                // Handle end
                if (callback) {
                    leader.on('ended', callback);
                }

                this._isBeingAnimated = true;

                leader.start();

                for (let i = 1; i < animations.length; i++) animations[i].startTime = DateTime.now;

                return this;
            }
        }

        /**
         * Animates the element properties, by letting the code to infer the initial values of the properties
         *
         * @param properties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        animate(properties: any, duration: number = 0.1, callback: () => void = null): this{
            let starts: any = {};

            let getValue = (p: any): number => {
                if(!this.hasPropertyValue(p)) {
                    return this.getCssNumericValue(p);
                }else {
                    return this.getPropertyValue(p, Any);
                }
            };

            for(let p in properties){
                starts[p] = getValue(p);
            }

            this.animateFrom(starts, properties, duration, callback);

            return this;
        }

        /**
         * Appends this element to a HTML element
         * @param {HTMLElement} e
         * @returns {ui.Element<T extends HTMLElement>}
         */
        attachTo(e: HTMLElement | Element<HTMLElement>): this{
            if(e instanceof Element) {
                (e as AnyElement).raw.appendChild(this.raw);
            }else{
                (e as HTMLElement).appendChild(this.raw);
            }
            this.raise('attach');
            return this;
        }

        /**
         * Handles the specified event
         * @param {keyof HTMLElementEventMap} name
         * @param {(ev: HTMLElementEventMap[keyof HTMLElementEventMap]) => any} listener
         * @returns {ui.Element<T extends HTMLElement>}
         */
        addEventListener(name: keyof HTMLElementEventMap, listener: (ev: HTMLElementEventMap[keyof HTMLElementEventMap]) => any): this {
            this.raw.addEventListener(name, listener);
            return this;
        }

        /**
         * Makes sure the class is either present or not present in the element
         * @param {string} className
         * @param {boolean} present
         */
        ensureClass(className: string, present: boolean = true): this{
            if(present) {
                this.addClass(className);
            }else{
                this.removeClass(className);
            }
            return this;
        }

        /**
         * Returns a value indicating if the class is present in the element
         * @param {string} className
         * @returns {boolean}
         */
        hasClass(className: string): boolean{
            return this.raw.classList.contains(className);
        }

        /**
         * Sets the value of the specified attribute
         * @param {string} name
         * @param {string} value
         */
        setAtt(name: string, value: string): this{
            this.raw.setAttribute(name, value);
            return this;
        }

        /**
         * Sets the value of the specified attribute
         * @param {string} name
         * @param {string} value
         */
        setAtts(keyValueMap: {[string: string]: any}): this{
            for(let key in keyValueMap)
                this.setAtt(key, String(keyValueMap[key]));
            return this;
        }

        /**
         * Removes the specified class
         * @param {string} name
         * @returns {this}
         */
        removeClass(name: string): this{
            this.raw.classList.remove(name);
            return this;
        }

        /**
         * Removes the node from its parent
         */
        removeFromParent(){
            this.raw.remove();
            this.raise('detach');
        }

        //endregion

        //region Properties

        /**
         * Gets or sets the inner text(html) of the element
         */
        get html(): string{
            return this.raw.innerHTML;
        }

        /**
         * Gets or sets the inner text(html) of the element
         *
         * @param {string} value
         */
        set html(value: string){
            // Set value
            this.raw.innerHTML = value;
        }

        /**
         * Gets the raw HTML element
         */
        get raw(): T {
            return this.getPropertyValue('raw', HTMLElement, undefined);
        }

        /**
         * Gets a boolean indicating if the element is currently being animated
         *
         * @returns {boolean}
         */
        get isBeingAnimated(): boolean {
            return this._isBeingAnimated;
        }
        //endregion


    }

    /**
     * Wildcard class
     */
    export class AnyElement extends Element<HTMLElement>{}

    /**
     * Base of Ui Constructs
     */
    export class UiElement<T extends HTMLElement> extends Element<T>{

        //region Properties

        /**
         * Gets or sets the direction of language
         */
        get langDirection(): LanguageDirection {
            return this.getPropertyValue('langDirection', LanguageDirection, LanguageDirection.AUTO);
        }

        /**
         * Gets or sets the direction of language
         *
         * @param {LanguageDirection} value
         */
        set langDirection(value: LanguageDirection) {
            this.setPropertyValue('langDirection', value, LanguageDirection);
        }

        //endregion


    }

    export class DivElement extends UiElement<HTMLDivElement>{

        static withClass(name: string): DivElement{
            let d = new DivElement();
            d.addClass(name);
            return d;
        }

        constructor(e: HTMLDivElement | string = null){
            super(e instanceof HTMLDivElement ? e : document.createElement('div'));

            if("string" === typeof e) {
                this.addClass(e);
            }
        }
    }

    export class InputElement extends UiElement<HTMLInputElement>{
        constructor(e: HTMLInputElement = null){
            super(e || document.createElement('input'));
        }
    }

    export class Label extends DivElement{

        constructor(){
            super('label');
        }

        //region Methods

        /**
         * Change Handler
         * @param {latte.ChangedEvent} e
         */
        didSet(e: DidSet){
            super.didSet(e);

            if (e.property == 'text'){
                this.divText.html = this.text;
            }

        }

        //endregion

        //region Properties
        /**
         * Gets or sets the text of the label
         */
        get text(): string {
            return this.getPropertyValue('text', String,null);
        }

        /**
         * Gets or sets the text of the label
         *
         * @param {string} value
         */
        set text(value: string) {
            this.setPropertyValue('text', value, String);
        }
        //endregion

        //region Elements

        /**
         * Gets the description element
         */
        get divDescription(): DivElement {
            return this.getLazyProperty('divDescription', DivElement, () => {
                return new DivElement('description');
            });
        }

        /**
         * Gets the text element
         */
        get divText(): DivElement {
            return this.getLazyProperty('divText', DivElement,() => {
                return new DivElement('text');
            });
        }


        //endregion

    }

    export class Clickable extends DivElement{

        constructor(){
            super();
        }

    }

    export class Selectable extends DivElement{

        constructor(){
            super('selectable');
        }

        //region Properties
        /**
         * Change Handler
         * @param {latte.ChangedEvent} e
         */
        didSet(e: DidSet){
            super.didSet(e);

            if (e.property == 'selected'){
                this.ensureClass('selected', this.selected);
            }

        }
        //endregion

        //region Properties

        /**
         * Gets or sets a flag indicating if the item is selected
         */
        get selected(): boolean {
            return this.getPropertyValue('selected', Boolean,null);
        }

        /**
         * Gets or sets a flag indicating if the item is selected
         *
         * @param {boolean} value
         */
        set selected(value: boolean) {
            this.setPropertyValue('selected', value, Boolean);
        }

        //endregion

        //region Elements

        /**
         * Gets the label
         */
        get divLabel(): Label {
            return this.getLazyProperty('divLabel', Label, () => {
                return new Label();
            });
        }

        //endregion

    }

    export class ListView extends DivElement{

        constructor(){
            super('list');
        }

    }

}