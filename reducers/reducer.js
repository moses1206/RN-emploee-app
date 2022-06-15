export const initialState = {
  employee: [],
  loading: true,
}

export const reducer = (state, action) => {
  if (action.type == 'ADD_EMPLOYEE') {
    return {
      ...state,
      employee: action.payload,
    }
  }
  if (action.type == 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    }
  }

  return state
}
