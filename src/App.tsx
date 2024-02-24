import {Layout, Flex, Button} from 'antd';
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
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        getIds(currentPage)
            .then(resp => {
                const arrIds = resp.data.result;
                setIds(arrIds);
                return arrIds;
            })
            .then(ids => getProducts(ids))
            .then(resp => {
                setItems(resp.data.result);
            })
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
            <Layout>
                <Content
                    style={{
                        margin: '0 16px 0 0px',
                        padding: 24,
                        minHeight: 280,
                        background: 'light',
                        borderRadius: '10px',
                    }}
                ><Flex wrap="wrap" gap="20px" style={{marginBottom: '30px'}}>
                    {items.map(item => {
                        return (<Product
                            brand={item.brand}
                            price={`${item.price} p.`}
                            name={item.product}
                            key={item.id}/>)
                    })}</Flex>
                    <Flex justify="center" gap="20px">
                        <Button icon={<LeftOutlined/>} onClick={() => setCurrentPage(currentPage - 1)}></Button>
                        <Button icon={<RightOutlined/>} onClick={() => setCurrentPage(currentPage + 1)}></Button>
                    </Flex>
                </Content>
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
