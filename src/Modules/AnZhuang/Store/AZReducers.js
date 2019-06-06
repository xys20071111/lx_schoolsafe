import { fromJS } from 'immutable';


const InitState = fromJS({
  data: [],
})


const AZReducer = (state = InitState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default AZReducer;