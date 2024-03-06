import {Flex, Space} from 'antd';
import Product from '../Product.tsx';
import Pagination from '../Pagination.tsx';
import {ReactElement, useContext} from 'react';
import {getUniqueItems} from './helpers.tsx';
import {IItem} from '../../types.ts';
import {IsLoadingContext, ReducerContext} from '../../App/App.tsx';
import {Spinner} from '../Spinner.tsx';

const Products = (): ReactElement => {
    const reducerContext = useContext(ReducerContext);
    const loaderContext = useContext(IsLoadingContext);
    let items: IItem[] = [];
    if (reducerContext.value.items.length > 0) {
        items = getUniqueItems(reducerContext.value.items);
    }

    if (items.length === 0 && !loaderContext.value) {
        return (
            <Space direction="vertical">
                <p>Продукты не найдены</p>
            </Space>);
    }

    return (<>
        {reducerContext.value.filter?.value ? <h3>Поиск: {reducerContext.value.filter?.value}</h3> : null}
        {loaderContext.value ? <Spinner/> :
            <Flex wrap="wrap" gap="20px" style={{marginBottom: '30px'}}>
                {items.map(item => {
                    return (<Product
                        id={item.id}
                        brand={item.brand}
                        price={item.price}
                        name={item.product}
                        key={item.id}/>)
                })}
            </Flex>}
        <Pagination/>
    </>)
}
export default Products;
