import {latte} from "./latte";

export namespace ui{

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

    /**
     *
     */
    export class Animation extends PropertyTarget{

        //region Static

        /**
         * Stack of active animations
         * @type {Array}
         */
        static stack: Animation[] = [];

        /**
         * Gets the requestAnimationRequest function, cross-browser
         */
        static get requestAnimationFrame(): any{
            return window.requestAnimationFrame || (function() {
                let timeLast = 0;

                return window['webkitRequestAnimationFrame'] || function(callback: (d: number) => any) {
                    let timeCurrent = (new Date()).getTime(), timeDelta: number;

                    /* Dynamically set the delay on a per-tick basis to more closely match 60fps. */
                    /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671. */
                    timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
                    timeLast = timeCurrent + timeDelta;

                    return setTimeout(function() { callback(timeCurrent + timeDelta); }, timeDelta);
                };
            })();
        }

        static loopActive:boolean = false;

        /**
         * Starts the animation loop.
         */
        static loop(){

            Animation.loopActive = true;

            let now = DateTime.now;
            let runningAnimations = 0;

            for (let i = 0; i < Animation.stack.length; i++) {

                // Get animation to attend
                let a = Animation.stack[i];

                // If animation no longer valid, continue
                if(!a || !a.running) continue;

                let value = a.currentValue;

                //log("Updating: %s-%s -> %s", a.startValue, a.endValue, a.currentValue)
                if(now.compareTo(a.endTime) > 0 || value >= a.endValue) {
                    a.setPropertyValue('running', false, Boolean);
                    a.raise('update', a.endValue);
                    a.raise('ended');
                }else {
                    a.raise('update', a.endValue);
                    runningAnimations++;
                }
            }

            if(runningAnimations > 0){
                let rq = Animation.requestAnimationFrame;
                //log("Relooping")
                rq(Animation.loop);
            }else{
                // Clear stack
                //log("Ending Loop")
                Animation.stack = [];
                Animation.loopActive = false;
            }

        }

        //endregion

        /**
         * Creates the animation
         * @param startValue
         * @param endValue
         * @param duration Duration of animation in seconds
         */
        constructor(startValue: number,
                    endValue: number,
                    duration: number,
                    updateHandler: (value?: number) => any = null,
                    endHandler: () => any = null) {

            super();

            this.setPropertyValues({
                duration: duration,
                startValue: startValue,
                endValue: endValue
            });

            if(updateHandler) {
                this.on('update', updateHandler);
            }

            if(endHandler) {
                this.on('ended', endHandler);
            }
        }

        //region Private Methods
        //endregion

        //region Methods
        /**
         * Gets the value of the animation for the specified second of the animation
         * @param f
         * @returns {number}
         */
        getValueForSecond(s: number){
            //if(this.startValue  + (this.speed * s) > 600) {
            //    debugger;
            //}
            return this.startValue + (this.speed * s);
        }

        /**
         * Starts the animation
         */
        start(){

            this.updateStartDate();

            Animation.stack.push(this);
            if(!Animation.loopActive)
                Animation.loop(); // Start the animation loop
        }

        /**
         * Updates the start date to now
         */
        updateStartDate(){
            this.setPropertyValue('startTime', this.nowSupplier(), DateTime);
        }

        //endregion

        //region Properties
        /**
         * Gets the current value of distance to the current frame
         *
         * @returns {number}
         */
        get currentValue():number {
            return this.getValueForSecond((this.nowSupplier()).subtractDate(this.startTime).totalSeconds);
        }

        /**
         * Gets the distance of the animation
         *
         * @returns {number}
         */
        get distance():number {
            return this.endValue - this.startValue;
        }

        /**
         * Gets the duration of the animation, in seconds
         */
        get duration(): number {
            return this.getPropertyValue('duration', Number, 0);
        }

        /**
         * Gets the final value of the animation
         */
        get endValue(): number {
            return this.getPropertyValue('endValue', Number, 0);
        }

        /**
         * Gets the end time of the animation
         *
         * @returns {number}
         */
        get endTime():DateTime {
            return this.startTime.addSeconds(this.duration);
        }

        /**
         * Gets or sets the function that supplies the -now- object for animation computation
         */
        get nowSupplier(): () => DateTime {
            return this.getPropertyValue('nowSupplier', Any, () => DateTime.now);
        }

        /**
         * Gets or sets the function that supplies the -now- object for animation computation
         *
         * @param {() => DateTime} value
         */
        set nowSupplier(value: () => DateTime) {
            this.setPropertyValue('nowSupplier', value, Any);
        }

        /**
         * Gets if the animation is currently running
         */
        get running(): boolean {
            return this.getPropertyValue('running', Boolean, false);
        }

        /**
         * Gets the start value of the animation
         */
        get startValue(): number {
            return this.getPropertyValue('startValue', Number, undefined);
        }

        /**
         * Gets or sets the initial time of the animation
         */
        get startTime(): DateTime {
            return this.getPropertyValue('startTime', DateTime, null);
        }

        /**
         * Gets or sets the initial time of the animation
         *
         * @param {DateTime} value
         */
        set startTime(value: DateTime) {
            this.setPropertyValue('startTime', value, DateTime);
        }

        /**
         * Gets the speed of the animation value, in distance per second
         *
         * @returns {number}
         */
        get speed():number {
            return this.distance / this.duration;
        }

        /**
         * Gets or sets some tag for the animation
         */
        get tag(): any {
            return this.getPropertyValue('tag', Any, undefined);
        }

        /**
         * Gets or sets some tag for the animation
         *
         * @param {any} value
         */
        set tag(value: any) {
            this.setPropertyValue('tag', value, Any);
        }

        //endregion
    }

    /**
     * Basic Element wrapper
     * Events:
     *  - attach: when the element is attached to the DOM
     *  - detach: when the element is detached from the DOM
     */
    export class Element<T extends HTMLElement> extends PropertyTarget{

        //region Static
        /**
         * Creates a new element by also creating the raw element.
         * @param {K} tagName
         * @returns {ui.Element<HTMLElementTagNameMap[K]>}
         */
        static of<K extends keyof HTMLElementTagNameMap>(tagName: K): Element<HTMLElementTagNameMap[K]>{
            let raw = document.createElement(tagName);
            return new Element<HTMLElementTagNameMap[K]>(raw);
        }

        //endregion

        //region Fields
        private animations: Animation[] = [];
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
                    this.setPropertyValue('isBeingAnimated', false, Boolean);
                });

                // Handle end
                if (callback) {
                    leader.on('ended', callback);
                }

                this.setPropertyValue('isBeingAnimated', true, Boolean);

                leader.start();

                // Update start time of animations
                animations.forEach(
                    a => a.startTime = DateTime.now);

                return this;
            }

            this.animations = this.animations.concat(animations);

            // Clean animations array
            this.animations = this.animations.filter(
                a => a.running);
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
                    return this.getPropertyValue(p, Any, undefined);
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
         * Gets the attribute of the element
         * @param {string} name
         * @returns {any}
         */
        getAtt(name: string): any{
            return this.raw.getAttribute(name);
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
         */
        get isBeingAnimated(): boolean {
            return this.getPropertyValue('isBeingAnimated', Boolean, false);
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

        //region Methods

        /**
         * Change Handler
         * @param {latte.ChangedEvent} e
         */
        didSet(e: DidSet){
            super.didSet(e);

            if (e.property == 'langDirection'){
                switch (this.langDirection) {
                    case LanguageDirection.AUTO: this.setAtt('dir', 'auto'); break;
                    case LanguageDirection.LTR: this.setAtt('dir', 'ltr'); break;
                    case LanguageDirection.RTL: this.setAtt('dir', 'rtl'); break;
                }
            }

        }

        //endregion

        //region Properties

        /**
         * Gets or sets the direction of language
         */
        get langDirection(): LanguageDirection {
            return this.getPropertyValue('langDirection', Any, LanguageDirection.AUTO);
        }

        /**
         * Gets or sets the direction of language
         *
         * @param {LanguageDirection} value
         */
        set langDirection(value: LanguageDirection) {
            this.setPropertyValue('langDirection', value, Any);
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

    export class Item extends DivElement{
        constructor(e: HTMLDivElement | string = null){
            super(e);

            this.addClass('item');
        }
    }

    export class InputElement extends UiElement<HTMLInputElement>{
        constructor(e: HTMLInputElement = null){
            super(e || document.createElement('input'));
        }
    }

    export class Icon extends Item{
        constructor(){
            super('icon');
        }
    }

    export class Label extends DivElement{

        //region Fields
        private divText: DivElement;
        private divDesc: DivElement;
        //endregion

        constructor(){
            super('label');
        }

        //region Private Methods

        private updateLayout(){

            

        }

        //endregion

        //region Methods

        /**
         * Change Handler
         * @param {latte.ChangedEvent} e
         */
        didSet(e: DidSet){
            super.didSet(e);

            if (e.property == 'text' || e.property == 'description'){
                this.updateLayout();
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

        //endregion

    }

    /**
     * Represents a clickable item
     */
    export class Clickable extends Item{

        constructor(){
            super();

            this.addEventListener('click', e => this.raise('click', e));
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