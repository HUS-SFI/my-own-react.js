const TEXT_ELEMENT = "TEXT_ELEMENT";

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  let dom;
  const isProperty = (key) => key !== "children";

  if (element.type === TEXT_ELEMENT) {
    dom = document.createTextNode(element.props.nodeValue);
  } else {
    dom = document.createElement(element.type);
  }

  const allProps = Object.keys(element.props);
  allProps.filter(isProperty).forEach((prop) => {
    dom[prop] = element.props[prop];
  });

  element.props?.children.forEach((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}

let nextUnitOfWork = null;

function workLoop(deadLine) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadLine.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

function performUnitOfWork() {
  // todo
}

export default { createElement, render };
