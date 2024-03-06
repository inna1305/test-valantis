import {Layout} from 'antd';
import {createContext, Dispatch, ReactElement, useEffect, useReducer, useState} from 'react';
import Filters from '../components/Filters/Filters.tsx';
import Products from '../components/Products/Products.tsx';
import {fetchData, PRODUCTS_PER_PAGE} from '../functions/requests.ts';
import {Action, initialState, IReducerAction, IReducerState, reducer} from './contexts/itemsContext/reducer.ts';

const {Sider, Content, Footer} = Layout;

export interface IIsLoadingContextValue {
    value: boolean,
    setValue: Dispatch<boolean>
}

export interface IReducerContextValue {
    value: IReducerState,
    setValue: Dispatch<IReducerAction>
}

export const initIsLoadingValue: IIsLoadingContextValue = {
    value: false,
    setValue: () => {
    }
}
export const initContextValue: IReducerContextValue = {
    value: initialState,
    setValue: () => {
    }
}
export const ReducerContext = createContext<IReducerContextValue>(initContextValue);
export const IsLoadingContext = createContext(initIsLoadingValue);
const App = (): ReactElement => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        fetchData(1, null).then((items) => {
            dispatch({
                type: Action.setItems,
                items: items,
                nextButtonIsActive: items.length === PRODUCTS_PER_PAGE,
                currentPage: 1
            });
        }).then(() => setIsLoading(false));
    }, []);

    return (
        <Layout hasSider style={{minHeight: '100vh'}}>
            <ReducerContext.Provider value={{value: state, setValue: dispatch}}>
                <IsLoadingContext.Provider value={{value: isLoading, setValue: setIsLoading}}> <Sider
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
                </IsLoadingContext.Provider>
            </ReducerContext.Provider>
        </Layout>
    );
};

export default App
