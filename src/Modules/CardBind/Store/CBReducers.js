import { fromJS } from 'immutable';


const InitState = fromJS({
  data: [],
})


const CBReducer = (state = InitState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default CBReducer;