import Navigation from "../component/navigation";
import {AppProps} from "next/app";
import {Provider} from 'react-redux'
import {store} from "../redux/store";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

function MyApp({Component, pageProps}: AppProps) {
    let persistor = persistStore(store);
    return <>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation/>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    </>
}

export default MyApp
