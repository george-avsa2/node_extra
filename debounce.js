function createDebounceFunction(callback, delay) {
  let timeoutId;

  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      console.log("Вызывается через:", +new Date() - start);
      callback();
    }, delay);
  };
}

function createDebounceFunctionPromise(callback, delay) {
  let timeoutId;
  let promiseResolver;

  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // сомнительно, но окЭй
    const promise = new Promise((resolve) => {
      promiseResolver = resolve;
    });

    timeoutId = setTimeout(() => {
      console.log(+new Date() - start);
      callback();
      promiseResolver();
    }, delay);

    return promise;
  };
}

let start = +new Date();

const log100 = () => console.log(100);
const debounceLog1000 = createDebounceFunctionPromise(log100, 1000);

debounceLog1000();
setTimeout(debounceLog1000, 200);
setTimeout(debounceLog1000, 400);
setTimeout(debounceLog1000, 500);
