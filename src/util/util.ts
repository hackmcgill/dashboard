function padStart(padNum: number, padValue: string, value: string): string {
  if (value.length < padNum) {
    const pad = String(padValue).repeat(padNum - value.length);
    return pad + value;
  }
  return value;
}

function getNestedProp(obj: any, props: string[]) {
  return props.reduce(
    (nested, next) => (nested && nested[next] ? nested[next] : null),
    obj
  );
}

function getOptionsFromEnum(options: any) {
  return Object.keys(options).map((o) => ({
    label: options[o],
    value: options[o],
  }));
}

export { padStart, getNestedProp, getOptionsFromEnum };
