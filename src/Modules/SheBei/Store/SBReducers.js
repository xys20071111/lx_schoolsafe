import _ from 'lodash';
import { fromJS } from 'immutable';


const InitState = fromJS({
  data: [],
})


const SReducer = (state = InitState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default SReducer;