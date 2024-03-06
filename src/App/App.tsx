import {Layout} from 'antd';
import {createContext, Dispatch, ReactElement, useEffect, useReducer, useState} from 'react';
import Filters from '../components/Filters/Filters.tsx';
import Products from '../components/Products/Products.tsx';
import {fetchData, PRODUCTS_PER_PAGE} from '../functions/requests.ts';
import {Action, initialState, IReducerAction, IReducerState, reducer} from './reducer.ts';

const {Sider, Content, Footer} = Layout;

interface ILoadingContextValue {
    isLoading: boolean,
    setIsLoading: Dispatch<boolean>
}

interface IReducerContextValue {
    reducerValue: IReducerState,
    setReducerValue: Dispatch<IReducerAction>
}

const initLoadingValue: ILoadingContextValue = {
    isLoading: false,
    setIsLoading: () => {
    }
}
const initReducerContextValue: IReducerContextValue = {
    reducerValue: initialState,
    setReducerValue: () => {
    }
}
export const ReducerContext = createContext<IReducerContextValue>(initReducerContextValue);
export const LoadingContext = createContext(initLoadingValue);

const App = (): ReactElement => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        fetchData(1, null)
            .then((items) => {
                dispatch({
                    type: Action.setItems,
                    items: items,
                    nextButtonIsActive: items.length === PRODUCTS_PER_PAGE,
                    currentPage: 1
                });
            })
            .then(() => setIsLoading(false));
    }, []);

    return (
        <Layout hasSider style={{minHeight: '100vh'}}>
            <ReducerContext.Provider value={{reducerValue: state, setReducerValue: dispatch}}>
                <LoadingContext.Provider value={{isLoading: isLoading, setIsLoading: setIsLoading}}> <Sider
                    width="360"
                    style={{
                        position: 'fixed',
                        background: 'white',
                        overflow: 'auto',
                        height: '100vh',
                    }}>
                    <Filters/>
                </Sider>
                    <Layout style={{marginLeft: 360}}> {
                        <Content
                            style={{
                                margin: '0 16px 0 0px',
                                padding: 24,
                                minHeight: 280,
                                background: 'light',
                                borderRadius: '10px',
                            }}>
                            <Products/>
                        </Content>}

                        <Footer
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                columnGap: '5px'
                            }}>
                            Turova Inna {new Date().getFullYear()} <a href="https://github.com/inna1305">GitHub</a>
                        </Footer>
                    </Layout>
                </LoadingContext.Provider>
            </ReducerContext.Provider>
        </Layout>
    );
};

export default App
