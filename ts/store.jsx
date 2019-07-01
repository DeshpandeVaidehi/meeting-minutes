// import { applyMiddleware, createStore, compose } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import rootReducer from "./reducer.jsx";

// const configureStore = (initialData) => {
//     const middleware = [thunk];
//     const composeEnhancers =
//         typeof window === 'object' &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//             window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//                 // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//             }) : compose;

//     const enhancer = composeEnhancers(
//         applyMiddleware(...middleware),
//         // other store enhancers if any
//     );
//     return createStore(
//         rootReducer,
//         initialData,
//         enhancer
//     );
// };

// const defaultInitialData = {
//     managers: {
//         manager_list: {}
//     },
//     user: {
//         user_list: {}
//     },
// 	taxLots: {
// 		tax_lot_list: {}
// 	},
// 	trainingGuides:{
// 		train_Guide_list: {}
// 	},
// 	isReports : {
// 	    is_reports_list : {}
// 	},
// 	myAlerts : {
// 	    my_alerts : {}
// 	},
// 	loginAuth: {
// 		auth_info: {},
//         isAuthenticated: false,
// 	},
//     foaManager : {
//         foa_manager_list : {}
//     },
//     clientReport : {
//         client_info_report_list : {}
//     }
// };
// export const store = configureStore(defaultInitialData);

// export function dispatch() {
// 	return store.dispatch;
// }