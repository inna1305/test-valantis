import {Layout, Spin} from 'antd';
import {createContext, Dispatch, ReactElement, useEffect, useReducer, useState} from 'react';
import Filters from '../components/Filters/Filters.tsx';
import Products from '../components/Products/Products.tsx';
import {Action, initialState, IReducerAction, IReducerState, reducer} from './reducer.ts';
import {fetchData, PRODUCTS_PER_PAGE} from '../functions/requests.ts';

const {Sider, Content, Footer} = Layout;

interface IReducerContextValue {
    value: IReducerState,
    setValue: Dispatch<IReducerAction>
}

const initContextValue: IReducerContextValue = {
    value: initialState,
    setValue: () => {}
}

export const ReducerContext = createContext<IReducerContextValue>(initContextValue);
const App = (): ReactElement => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
        <Layout hasSider>
            <ReducerContext.Provider value={{value: state, setValue: dispatch}}>
                <Sider
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
                        {isLoading ?
                            <Spin tip="Загрузка..." size="large" style={{marginTop: '20%'}}>
                                <div className="content"/>
                            </Spin> :
                            <Products/>}
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
            </ReducerContext.Provider>
        </Layout>
    );
};

export default App
