import { AppNavigator } from './app.router';
import { NavigationActions } from 'react-navigation';

let initialNavState = AppNavigator.router.getStateForAction(NavigationActions.init());

export default navReducer = (state = initialNavState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
}