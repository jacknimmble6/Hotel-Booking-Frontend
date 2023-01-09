import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import reducer from '../reducers/index'
import localforage from 'localforage'
import { devToolsEnhancer } from '@redux-devtools/extension'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import './styless.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '../styles/sty.css'

const persistConfig = {
  key: 'root',
  storage: localforage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = compose(applyMiddleware(thunk), devToolsEnhancer({ trace: true }))(createStore)(persistedReducer)

const persistor = persistStore(store)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID || ''}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  )
}
