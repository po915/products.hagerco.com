import CenshareBackend from '../../boundary_layer/censhare_backend';
import homeActions from './homeActions';
import navbarActions from './navbarActions';
import authActions from './authActions';
import productActions from './productActions';
import contentActions from './contentActions';
import accessControlActions from './accessControlActions';
import distributorActions from './distributorActions';
import repsActions from './repsActions';
import searchActions from './searchActions';

export default function useActions(state, dispatch) {
    const backend = new CenshareBackend();

    const accessControl = accessControlActions(state, dispatch, backend);
    const home = homeActions(state, dispatch, backend);
    const navbar = navbarActions(state, dispatch, backend);
    const auth = authActions(state, dispatch, null);
    const products = productActions(state, dispatch, backend);
    const content = contentActions(state, dispatch, backend);
    const distributors = distributorActions(state, dispatch, backend);
    const reps = repsActions(state, dispatch, backend);
    const search = searchActions(state, dispatch, backend);

    return {
        home,
        navbar,
        auth,
        products,
        content,
        accessControl,
        distributors,
        reps,
        search
    };
}
