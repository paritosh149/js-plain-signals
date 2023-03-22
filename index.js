const appDiv = document.getElementById('app');
const clear = '[clear]';
const log = (message) => (appDiv.innerHTML += `<div>${message}</div>`);
log(clear);
// -----------------------------------
let caller = undefined;
const signal = (intialValue) => {
  let value = intialValue;
  let subscribers = [];

  let getter = () => {
    if (caller) {
      subscribers.push(caller);
    }
    caller = undefined;
    return value;
  };
  let setter = (newValue) => {
    // set the value
    value = newValue;
    // call all subscribers
    subscribers.forEach((sub) => sub());
  };
  return [getter, setter];
};

const effect = (fn) => {
  caller = fn;
  fn();
};
// -----------------------------------
const [getName, setName] = signal('James');
effect(() => log(getName()));
setName('Jinny');
setName('John');
