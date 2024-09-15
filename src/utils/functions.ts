export const isValidShamsiDate = (dateStr: string): boolean => {
  const regex = /^(\d{4})\/(\d{2})\/(\d{2})$/;
  const match = dateStr.match(regex);

  if (!match) return false;

  const [, year, month, day] = match.map(Number);

  if (year < 1300 || year > 1500) return false;
  if (month < 1 || month > 12) return false;

  const daysInMonth = [31, 31, 31, 31, 31, 31, 31, 31, 30, 30, 30, 29];
  if (
    month === 12 &&
    !((year % 4 === 3 && year % 100 !== 99) || year % 400 === 0)
  ) {
    daysInMonth[11] = 30;
  }

  if (day < 1 || day > daysInMonth[month - 1]) return false;

  return true;
};

export const isValidPersianName = (name: string): boolean => {
  const persianRegex = /^[\u0600-\u06FF\s]+$/;
  return persianRegex.test(name);
};

export const numberToPersianWords = (number: number): string => {
  if (number === 0) {
    return "";
  }

  const billion = Math.floor(number / 10000000000);
  const million = Math.floor((number % 10000000000) / 10000000);
  const thousand = Math.floor((number % 10000000) / 10000);
  const remainder = (number % 10000) / 10;
  const stringRemainder = String(remainder);
  const remainderHandler = stringRemainder.includes(".")
    ? stringRemainder.split(".")[0]
    : stringRemainder;
  const rialRemainder = stringRemainder.includes(".")
    ? stringRemainder.split(".")[1]
    : "";

  let result = "";

  if (billion > 0) {
    result += billion.toString() + " میلیارد" + " ";
  }
  if (million > 0) {
    result +=
      (result !== "" ? " و " : "") + million.toString() + " میلیون" + " ";
  }
  if (thousand > 0) {
    result +=
      (result !== "" ? " و " : "") + thousand.toString() + " هزار" + " ";
  }
  if (remainder >= 1) {
    result += (result !== "" ? " و " : "") + remainderHandler;
  }
  if (remainder > 0 && rialRemainder) {
    result +=
      (result !== "" ? "  تومان " + " و " : "") + rialRemainder + " ریال";
    return result;
  } else if (result) {
    return `${result}` + " تومان";
  } else {
    return "";
  }
};

export function convertPersianNumber2English(value: string) {
  return value.replace(/([۰-۹])/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}
