
function stringToColor(str: string): string {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    // Generate a hash code from the string
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a 6-digit hexadecimal color code
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();

  // Pad with leading zeros if necessary
  return "#" + "000000".substring(0, 6 - c.length) + c;
}

export default stringToColor;
