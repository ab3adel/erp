import { Actions } from "@/shared/enums/actions";

export const generatePermissionText = (permissions: Actions[]) => {
  const actions: Actions[] = [...permissions];
  console.log(actions);
  if (actions.length === 0) {
    return "No Access";
  } else if (actions.length === 1) {
    return actions[0];
  } else {
    const lastAction = actions.pop();
    return actions.join(", ") + " & " + lastAction;
  }
};
