/**
 * @param type
 * @return {string}
 */
const toEventName = (type: string) => {
  if (!type) return '';
  return `on${type[0].toUpperCase()}${type.slice(1)}`;
};
export type SectionContent = {
  sectionName: string;
  className: string[];
  header: string;
  description: string;
};

export type Sections = SectionContent[];

export class Component<HTMLElement> {
  root: Element | DocumentFragment;

  el: Element;

  listeners: string[];

  events: any[];

  className: string[];

  tag: string;

  content: string;

  constructor(
    root: Element | DocumentFragment,
    {
      className,
      listeners,
      tag = 'div',
    }: { className: string[]; listeners?: string[]; tag?: string }
  ) {
    this.root = root;
    this.el = null;
    this.listeners = listeners;
    this.events = [];
    this.className = className;
    this.tag = tag;
  }

  /**
   * Init DOM elements and all listeners
   */
  init() {
    this.el = document.createElement(this.tag);
    if (this.className) {
      this.className.map((name) => this.el.classList.add(name));
    }
    if (this.listeners) {
      this.events = this.listeners.map((type) => {
        const event: string = toEventName(type);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const handler = this[event];
        if (!handler) {
          throw Error(`handler ${type} is not implemented`);
        }
        this.el.addEventListener(type, handler);
        return { type, handler };
      });
    }
  }

  /**
   * Hook which is called after render
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function
  afterRender(): void {}

  /**
   * Clean up the dom and then render component HTML
   */
  render() {
    if (this.el) this.destroy();
    this.init();
    if (this.content) this.el.innerHTML = this.content;
    this.root.appendChild(this.el);
    this.afterRender();
  }

  /**
   * Returns component template
   * @return {string}
   */
  // eslint-disable-next-line class-methods-use-this
  toHTML(content: string) {
    this.content = content;
    return this;
  }

  /**
   * Clean up all events and dom elements
   */
  destroy() {
    this.events.forEach(({ type, handler }) => {
      this.el.removeEventListener(type, handler);
    });
    this.events = [];
    this.el.remove();
  }
}
