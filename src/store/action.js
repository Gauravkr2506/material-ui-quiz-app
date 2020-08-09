const MODULE_NAME = "[AUTH]";

export const ActionType = {
  USER_JOIN: MODULE_NAME + "USER_JOIN",
  SET_LOADER: MODULE_NAME + "SET_LOADER",
  MODIFY_DATA: MODULE_NAME + "MODIFY_DATA",
  LOGOUT: MODULE_NAME + "LOGOUT",
};

export const logout = (payload) => ({
  type: ActionType.LOGOUT,
});

export const modifyDataAction = (payload) => ({
  type: ActionType.MODIFY_DATA,
  payload,
});

export const UserJoin = (user_name) => ({
  type: ActionType.USER_JOIN,
  payload: user_name,
});

export const getQuestionsAction = () => (dispatch) => {
  dispatch({ type: ActionType.SET_LOADER, payload: true });
  return fetch(
    "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
  )
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let questions = data.results.map((obj) => {
        let index = Math.floor(Math.random() * data.results.length);
        let options = [...obj.incorrect_answers];
        options.splice(index, 0, obj.correct_answer);

        return { ...obj, options };
      });
      dispatch({ type: ActionType.MODIFY_DATA, payload: { questions } });
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        error.text().then((data) => {
          console.log(data);
        });
      }
    })
    .finally(() => {
      dispatch({ type: ActionType.SET_LOADER, payload: false });
    });
};

export const setUserAnswersAction = (users_answer) => (dispatch, getState) => {
  let questions = getState().questions;
  let user_score = 0;

  questions.forEach((obj, index) => {
    if (users_answer[index] === obj.correct_answer) {
      user_score++;
    }
  });
  dispatch({ type: ActionType.MODIFY_DATA, payload: { user_score } });
};
