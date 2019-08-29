/**
 * @file
 * This is the global trimlines functionality.
 *
 * `line_clamps` is global config with CSS selector, trim value and optional breakpoints trims.
 *
 * If browser supports `-webkit-clamp-lines` will be used trimCSS, else trimJs.
 */

import lineClamp from 'line-clamp';

export default (trimmedElements, context = document ) => {

  const lineClampSupported = CSS.supports('line-clamp: 1') || CSS.supports('-webkit-line-clamp: 1');

  for (const el in trimmedElements) {
    if (trimmedElements.hasOwnProperty(el)) {
      const element = trimmedElements[el];
      index(element);
    }
  }

  function index(element) {
    context.addEventListener('DOMContentLoaded', () => {
      Array.prototype.forEach.call(context.querySelectorAll(element.selector), (el) => {
        if (el.classList.contains('init')) {
          return;
        }
        el.classList.add('init');
        let wrapper = wrapInner(el);
        trim(wrapper, element.trim, element.forceJs);
      });
    });
  }

  function removeClampCss(el) {
    for (let className of Array.from(el.classList)) {
      if (className.startsWith('line-clamp-')) {
        el.classList.remove(className);
      }
    }
  }

  function setLineHeight(el) {
    el.style.removeProperty('line-height');
    let lineHeight = window.getComputedStyle(el, null).getPropertyValue('line-height');
    if (lineHeight.indexOf('px') >= 0) {
      el.setAttribute('style', 'line-height:' + Math.ceil(parseFloat(lineHeight)) + 'px');
    }
  }

  function trim(el, lines, forceJs) {
    if (!forceJs) {
      removeClampCss(el);
      el.classList.add('line-clamp-' + lines);
    }

    if (!lineClampSupported || forceJs) {
      setLineHeight(el);
      lineClamp(el, lines);
    }
  }

  function wrapInner(el) {
    const wrapper = context.createElement('div');
    el.appendChild(wrapper).classList.add('clamp-wrapper');
    while (el.firstChild !== wrapper) {
      wrapper.appendChild(el.firstChild);
    }
    return wrapper;
  }
}
