'use strict';

const parseNum = (num) => String(num).length == 1 ? `0${num}` : String(num);
const parseMs = (num) =>
  String(num).length == 1 ?
  `00${num}` :
  String(num).length == 2 ?
  `0${num}` :
  String(num);

/**
 * @param {string} type
 * @param {string} text
 * @param {...any} args
 */
function log(type, text, ...args) {
  const date = new Date();
  console.log(
      `\x1b[44m${
        parseNum(date.getDate())
      }/${
        parseNum(date.getMonth()+1)
      }/${
        date.getFullYear()
      } ${
        parseNum(date.getHours())
      }:${
        parseNum(date.getMinutes())
      }:${
        parseNum(date.getSeconds())
      }::${
        parseMs(date.getMilliseconds())
      }\x1b[49m \x1b[36m${type}\x1b[39m ${text}`,
      ...args,
  );
};

export default log;
