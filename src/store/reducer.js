import { ActionType } from "./action";

const initial_state = {
  user_name: "",
  is_loader_on: false,
  questions: [],
  user_score: 0,
};

const Reducer = (state = initial_state, action) => {
  var new_state = Object.assign({}, state);
  switch (action.type) {
    case ActionType.USER_JOIN:
      return {
        ...new_state,
        user_name: action.payload,
      };
    case ActionType.LOGOUT:
      return initial_state;

    case ActionType.SET_LOADER:
      return {
        ...new_state,
        is_loader_on: action.payload,
      };

    case ActionType.MODIFY_DATA:
      return {
        ...new_state,
        ...action.payload,
      };

    default:
      return new_state;
  }
};
export default Reducer;
