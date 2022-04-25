export const parseSpecialCharacters = (str: string) =>
  str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

export const getRecords = (page: number, data: any) => {
  if (data.length > 0) {
    let start = 0;
    if (page > 0) {
      start = page * 10;
    }
    let end = start + 10;
    return data.slice(start, end);
  }
  return [];
};

export function coloredSource(source: string, color: string) {
  const r = /^#?(..)(..)(..)(..)?$/.exec(color)!;
  const arrColor = [r[1], r[2], r[3], r[4] || 'FF'].map(
    c => parseInt(c, 16) / 255,
  );
  return JSON.parse(
    JSON.stringify(source).replace(/"k":\[1,1,1,1\]/g, `"k":[${arrColor}]`),
  );
}
