/**
 * @param type
 * @return {string}
 */
const toEventName = (type: string) => {
    if (!type) return '';
    else return `on${type[0].toUpperCase()}${type.slice(1)}`
}

export class Component  {
    root:HTMLElement;
    el:HTMLElement;
    listeners:string[];
    events:any[];
    className:string;
    tag:string
    /**
     * @param {HTMLElement} root
     * @param { { listeners: string[], className: string } } options
     */
    constructor(root:HTMLElement, {listeners , className, tag = 'div'}: { listeners: string[]; className: string; tag?:string}) {
        this.root = root;
        this.el = null;
        this.listeners = listeners;
        this.events = [];
        this.className = className
        this.tag  = tag;
    }

    /**
     * Init DOM elements and all listeners
     */
    init() {
        this.el = document.createElement(this.tag);
        this.el.classList.add(this.className);
        this.events = this.listeners.map(type => {
            const event:string = toEventName(type);
            // @ts-ignore
            const handler = this[event];
            if (!handler) {
                throw Error(`handler ${type} is not implemented`);
            }
            this.el.addEventListener(type, handler);
            return { type, handler };
        })
    }

    /**
     * Hook which is called after render
     */
    afterRender() {}

    /**
     * Clean up the dom and then render component HTML
     */
    render() {
        if(this.el) this.destroy();
        this.init();
        this.el.innerHTML = this.toHTML();
        this.root.appendChild(this.el);
        this.afterRender()
    }

    /**
     * Returns component template
     * @return {string}
     */
    toHTML() { return ``;}

    /**
     * Clean up all events and dom elements
     */
    destroy() {
        this.events.forEach(({ type, handler }) => {
            this.el.removeEventListener(type, handler)
        })
        this.events = [];
        this.el.remove();
    }
}