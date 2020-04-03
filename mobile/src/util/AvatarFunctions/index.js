export function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const obj = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
  return `rgb(${obj.r},${obj.g},${obj.b})`;
}

export function GetUserStr(str) {
  const res = str
    .split(' ')
    .filter((word) => {
      if (word === '') return null;
      return true;
    })
    .map((word) => word.toUpperCase());

  let sort = [];
  let bigger = '';
  const final = [];
  switch (res.length) {
    case 0:
      return null;

    case 1:
      return [res[0].charAt(0)];

    case 2:
      return [res[0].charAt(0), res[1].charAt(0)];

    default:
      sort = res.filter((word) => {
        if (word.length <= 2) return false;
        return true;
      });
      [final[0]] = sort[0].charAt(0);

      for (let i = 1; i < sort.length; i += 1)
        if (sort[i].length > bigger.length) bigger = sort[i];
      final[1] = bigger.charAt(0);
  }
  return final;
}
