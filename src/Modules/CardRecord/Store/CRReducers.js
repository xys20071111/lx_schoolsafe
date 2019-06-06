import { fromJS } from 'immutable';


const InitState = fromJS({
  data: [],
})


const CRReducer = (state = InitState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default CRReducer;