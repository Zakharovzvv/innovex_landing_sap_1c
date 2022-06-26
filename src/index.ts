import './style/style.sass';
import content from './assets/content.json';
import {
  Component,
  SectionContent,
  Sections,
  // eslint-disable-next-line import/extensions
} from './components/BaseHTMLComponent';

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

function setContent(data: Sections) {
  const fragment = document.createDocumentFragment();
  data.map((el: SectionContent) => {
    const section = new Component(fragment, {
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
  const container = document.querySelector('.container');
  container.appendChild(fragment);
}

async function fetchData() {
  // const response = await axios.get<Sections>('content.json');
  await fetch(content.toString())
    .then((response) => response.json())
    .then((data) => setContent(data))
    .catch((e) => {
      console.log(e);
    });
}

function init() {
  fetchData();
}

function renderApp() {
  init();
}

renderApp();

// const contentData = () => async () => {
//   try {
//     const response = await axios.get('../data/content.json');
//     return response.data;
//   } catch (e) {
//     return '';
//   }
// };
