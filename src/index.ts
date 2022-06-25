import './style/style.sass';

function htmlComponent(componentType: string, classNames: string[] = []) {
  const element = document.createElement(componentType);
  element.classList.add(classNames.join(' '));

  element.innerHTML = 'Перейти на 1С';

  return element;
}
const callDiv = document.querySelector('.call');
callDiv.appendChild(htmlComponent('button', ['btn']));
