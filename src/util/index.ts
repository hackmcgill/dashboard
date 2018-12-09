function padStart(padNum: number, padValue: string, value: string): string {
  if (value.length < padNum) {
      const pad = String(padValue).repeat(padNum - value.length);
      return pad + value;
  }
  return value;
}

export { padStart };
