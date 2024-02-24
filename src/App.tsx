import {Layout, Flex, Button, Spin} from 'antd';
import {ReactElement, useEffect, useState} from 'react';
import {getIds, getProducts, IResponseItems} from './functions/requests.ts';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import Product from './components/Product.tsx';
import FilterForm from './components/FilterForm.tsx';

const {Sider, Content, Footer} = Layout;

export interface IResponseIds {
    result: string[];
}

const App = (): ReactElement => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ids, setIds] = useState<string[]>([]);
    const [items, setItems] = useState<IResponseItems[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextIsDisabled, setNextIsDisabled] = useState(false);

    useEffect(() => {
        getIds(currentPage)
            .then(resp => {
                const arrIds = resp.data.result;
                if (arrIds.length <= 50) {
                    setNextIsDisabled(true);
                }
                setIds(arrIds);
                return arrIds;
            })
            .then(ids => getProducts(ids))
            .then(resp => {
                setItems(resp.data.result);
                setIsLoading(false);
            });
        console.log('queries');
    }, [currentPage]);

    return (
        <Layout hasSider>
            <Sider
                width="360"
                style={{
                    background: 'white',
                    overflow: 'auto',
                    height: '100vh',
                }}>
                <FilterForm/>
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
                >{isLoading ?
                    <Spin tip="Загрузка..." size="large" style={{marginTop: '20%'}}>
                        <div className="content"/>
                    </Spin> :
                    <>
                        <Flex wrap="wrap" gap="20px" style={{marginBottom: '30px'}}>
                            {items.map(item => {
                                return (<Product
                                    id={item.id}
                                    brand={item.brand}
                                    price={`${item.price} p.`}
                                    name={item.product}
                                    key={item.id}/>)
                            })}</Flex>
                        <Flex justify="center" gap="20px">
                            <Button disabled={currentPage === 1} icon={<LeftOutlined/>} onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1)
                                }
                            }
                            }></Button>
                            <Button disabled={nextIsDisabled} icon={<RightOutlined/>} onClick={() => {
                                setCurrentPage(currentPage + 1)
                            }}></Button>
                        </Flex>
                    </>}
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
        </Layout>
    )
        ;
};

export default App
