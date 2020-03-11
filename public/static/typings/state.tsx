import { RouterState } from 'connected-react-router';
import { HomeState } from './';


export interface CombinedState {
    home: HomeState;
    router: RouterState
}