
type AnyValue = string | number | boolean | null | undefined | AnyValue[] | { [key: string]: AnyValue };

export default function objToString(obj: AnyValue, spltStr: string): string {
  let result: string = '';
  let stack: AnyValue[] = [obj];

  while (stack.length > 0) {
    const item = stack.pop();



    if (typeof item === 'string') {
      result += spltStr + item;
    } else if (typeof item === 'number' || typeof item === 'boolean') {
      result += spltStr + item.toString();
    } else if (item === null || item === undefined) {
      result += '';
    } else if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i]);
      }
    } else if (typeof item === 'object') {
      for (const value of Object.values(item)) {
        stack.push(value);
      }
    }
  }

  return result;
}

