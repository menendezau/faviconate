import {ui} from "./ui";

export namespace viewport{

    import AnyElement = ui.AnyElement;

    /**
     * Handles resize of viewport
     * @param {ui.AnyElement} e
     * @param {(e: Event) => void} callback
     */
    export function onResize(e: AnyElement, callback: (e: Event) => void){

        // Register resize event
        window.addEventListener('resize', callback);

        // Remove window listener when detached
        e.on('detach', () => window.removeEventListener('resize', callback));

    }

}