/*
 * @Author: linkenzone
 * @Date: 2021-10-31 22:15:15
 * @Descripttion: Do not edit
 */

export function splitDicomTags(List: any[]) {
  if (List) {
    const Key = Object.keys(List);
    return Key;
  }
  const Null: any[] = [];
  return Null;
}

export function splitDicomValue(List: any[]) {
  if (List) {
    const Key = Object.keys(List);
    const Value = Key.map(function (i: any) {
      return List[i];
    });
    return Value;
  }
  const Null: any[] = [];
  return Null;
}
