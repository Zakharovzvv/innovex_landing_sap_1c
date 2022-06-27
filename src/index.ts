// git config core.autocrlf false
import './style/style.sass';
import content from './assets/content.json';
import {
    Component,
    SectionContent,
    Sections,
    // eslint-disable-next-line import/extensions
} from './components/BaseHTMLComponent';

let nav: HTMLElement;

// function htmlComponent(componentType: string, classNames: string[] = []) {
//   const element = document.createElement(componentType);
//   element.classList.add(classNames.join(' '));
//
//   element.innerHTML = 'Перейти на 1С';
//
//   return element;
// }
// const callDiv = document.querySelector('.call');
// callDiv.appendChild(htmlComponent('button', ['btn']));

// good practice. you causing reflow one time
// var fragment = document.createDocumentFragment(),
//     list = ['foo', 'bar', 'baz', ...],
//     el, text;
// for (var i = 0; i < list.length; i++) {
//   el = document.createElement('li');
//   text = document.createTextNode(list[i]);
//   el.appendChild(text);
//   fragment.appendChild(el);
// }
// document.body.appendChild(fragment);

// function btnClickHandler(e) {}

function setContent(data: Sections, container: any) {
    data.map((el: SectionContent) => {
        const section = new Component(container, {
            className: el.className,
        });
        section.render();

        new Component(section.el, {
            className: [`${el.sectionName}-title`],
            tag: 'h1',
        })
            .toHTML(el.header)
            .render();
        new Component(section.el, {
            className: [`${el.sectionName}-description`],
            tag: 'h4',
        })
            .toHTML(el.header)
            .render();
        return section;
    });
}

function scrollEventHandler() {
    if (window.scrollY === 0) {
        nav.classList.add('nav-hide');
    } else {
        nav.classList.remove('nav-hide');
        setTimeout(() => {
            nav.classList.add('nav-hide');
        }, 2000);
    }
}

function initNav() {
    nav = document.querySelector('.nav');
    window.addEventListener('scroll', scrollEventHandler);
}

function init() {
    initNav();
    // const fragment = document.createDocumentFragment();
    // setContent(content, fragment);
    // return fragment;
}

function renderApp() {
    init();
    // const app = init();
    // const container = document.querySelector('.container');
    // container.appendChild(app);
}
window.addEventListener('DOMContentLoaded', (event) => {
    renderApp();
});

// const contentData = () => async () => {
//   try {
//     const response = await axios.get('../data/content.json');
//     return response.data;
//   } catch (e) {
//     return '';
//   }
// };
