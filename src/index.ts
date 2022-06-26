import './style/style.sass';

function htmlComponent(componentType: string, classNames: string[] = []) {
  const element = document.createElement(componentType);
  element.classList.add(classNames.join(' '));

  element.innerHTML = 'Перейти на 1С';

  return element;
}
const callDiv = document.querySelector('.call');
callDiv.appendChild(htmlComponent('button', ['btn']));


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
function btnClickHandler(e) {

}

function init(){

}

function renderApp(){
  init();
}