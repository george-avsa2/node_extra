Promise.reject("1")
  .then((data) => console.log(data))
  .then(() => Promise.reject("2"))
  .catch((err) => console.log(err))
  .then(() => console.log("потомy"));

Promise.resolve()
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6));

// думаю:

// сразу reject, поэтому по идее сразу переносимся к catch,
// в err передается ошибка "1", поэтому выводим ее в консоль
// вывод 1: 1
// далее переходим к выполнению последнего then
// вывод 2: потому
// второй - по порядку: 4, 5, 6

// если неправильно, пытаюсь объяснить после прогона:

// после вывода: вдруг вспомнил, что микро-таски выполняются на 1 за 1-ой
// а поочердно. Соотвественно:
// reject - then (пропускаем)
// resolve - then (выполняем) - 4
// reject - then (пропускаем)
// resolve - then (выполняем) - 5
// reject - catch (выполняем) - 1
// resolve - then (выполняем) - 6
// reject - then (выполняем) - потому
