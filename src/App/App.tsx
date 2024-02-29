import {Layout, Spin} from 'antd';
import {createContext, Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import {getIds, getProducts} from '../functions/requests.ts';
import Filters from '../components/Filters/Filters.tsx';
import {IFilterValue, IItem} from '../types.ts';
import Products from '../components/Products.tsx';
const {Sider, Content, Footer} = Layout;

interface FilterContextValue {
    value: IFilterValue | null,
    setValue: Dispatch<SetStateAction<IFilterValue | null>>
}


export const FilterContext = createContext<FilterContextValue | null>(null)
const App = (): ReactElement => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ids, setIds] = useState<string[] | null>(null);
    const [items, setItems] = useState<IItem[]>([]);
    const [nextIsDisabled, setNextIsDisabled] = useState(false);
    const [currentFilter, setCurrentFilter] = useState<IFilterValue | null>(null);
    //const [isPending, startTransition] = useTransition();

    useEffect(() => {
        getIds(currentPage, currentFilter)
            .then(resp => {
                const arrIds = resp.data.result;
                if (arrIds.length <= 50) {
                    setNextIsDisabled(true);
                }
                const uniqIds: string[] = Array.from(new Set(arrIds));
                setIds(uniqIds);
                return uniqIds;
            })
            .then(ids => getProducts(ids))
            .then(resp => {
                setItems(resp.data.result);
            });
    }, [currentPage, currentFilter]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const resp = await getIds(currentPage, currentFilter);
    //             const arrIds = resp.data.result;
    //             if (arrIds.length <= 50) {
    //                 setNextIsDisabled(true);
    //             }
    //             const uniqIds: string[] = Array.from(new Set(arrIds));
    //             setIds(uniqIds);
    //
    //             const productsResp = await getProducts(uniqIds);
    //             setItems(productsResp.data.result);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //
    //     fetchData();
    //}, [currentPage, currentFilter]);

    return (
        <Layout hasSider>
            <FilterContext.Provider value={{value: currentFilter, setValue: setCurrentFilter}}>
                <Sider
                    width="360"
                    style={{
                        background: 'white',
                        overflow: 'auto',
                        height: '100vh',
                    }}>
                    <Filters/>
                </Sider>
                <Layout> {
                    <Content
                        style={{
                            margin: '0 16px 0 0px',
                            padding: 24,
                            minHeight: 280,
                            background: 'light',
                            borderRadius: '10px',
                        }}
                    >{ids?.length === 0 ? <p>Продукты не найдены</p>
                        // <Spin tip="Загрузка..." size="large" style={{marginTop: '20%'}}>
                        //     <div className="content"/>
                        // </Spin> :
                        : <Products currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    nextButtonState={nextIsDisabled}
                                    items={items} />
                        }
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
            </FilterContext.Provider>
        </Layout>
    );
};

export default App
