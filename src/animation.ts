import {latte} from "./latte";

export namespace animation{
    import DateTime = latte.DateTime;
    import PropertyTarget = latte.PropertyTarget;

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
                    a.setPropertyValue('running', false);
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
        //region Fields
        //endregion
        /**
         * Creates the animation
         * @param startValue
         * @param endValue
         * @param duration Duration of animation in seconds
         */
        constructor(startValue: number, endValue: number, duration: number, updateHandler: (value?: number) => any = null, endHandler: () => any = null) {

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

            this.setPropertyValues({
                startTime: DateTime.now,
                running: true
            });

            Animation.stack.push(this);
            if(!Animation.loopActive)
                Animation.loop(); // Start the animation loop
        }
        //endregion

        //region Properties
        /**
         * Gets the current value of distance to the current frame
         *
         * @returns {number}
         */
        get currentValue():number {

            return this.getValueForSecond(DateTime.now.subtractDate(this.startTime).totalSeconds);
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
            return this.getPropertyValue('duration', 0);
        }

        /**
         * Gets the final value of the animation
         */
        get endValue(): number {
            return this.getPropertyValue('endValue', 0);
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
         * Gets if the animation is currently running
         */
        get running(): boolean {
            return this.getPropertyValue('running', false);
        }

        /**
         * Property field
         */
        private _startValue:number;

        /**
         * Gets the initial value for the animation
         *
         * @returns {number}
         */
        get startValue():number {
            return this._startValue;
        }

        /**
         * Gets or sets the initial time of the animation
         */
        get startTime(): DateTime {
            return this.getPropertyValue('startTime', null);
        }

        /**
         * Gets or sets the initial time of the animation
         *
         * @param {DateTime} value
         */
        set startTime(value: DateTime) {
            this.setPropertyValue('startTime', value);
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
            return this.getPropertyValue('tag', undefined);
        }

        /**
         * Gets or sets some tag for the animation
         *
         * @param {any} value
         */
        set tag(value: any) {
            this.setPropertyValue('tag', value);
        }

        //endregion
    }
}