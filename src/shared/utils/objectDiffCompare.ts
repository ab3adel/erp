import _ from "lodash";

export function hasChanges(obj1: object, obj2: object): boolean {
  const commonAttributes = _.pick(obj1, Object.keys(obj2));
  return !_.isEqual(commonAttributes, obj2);
}
