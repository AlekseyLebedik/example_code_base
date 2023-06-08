/**
 * Copied from MDN web docs
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const matchRegExp = term => {
  const termParts = term.split(' ');
  const regexs = [];
  termParts.forEach(termPart => {
    const sanitizedTerm = escapeRegExp(termPart.trim().toLowerCase());
    if (sanitizedTerm === '') {
      return () => true;
    }

    const re = new RegExp(`.*${sanitizedTerm}.*`);
    regexs.push(re);
    return regexs;
  });

  return item => regexs.every(re => String(item).toLowerCase().match(re));
};
