import {Flex} from 'antd';
import Product from '../Product.tsx';
import Pagination from '../Pagination.tsx';
import {ReactElement, useContext} from 'react';
import {ReducerContext} from '../../App/App.tsx';
import {getUniqueItems} from './helpers.tsx';
import {IItem} from '../../types.ts';

const Products = (): ReactElement => {
    const reducerContext = useContext(ReducerContext);
    let items: IItem[] = [];
    if (reducerContext.value.items.length > 0) {
        items = getUniqueItems(reducerContext.value.items);
    }

    return (<>
        <Flex wrap="wrap" gap="20px" style={{marginBottom: '30px'}}>
            {items.length === 0 ? <p>Продукты не найдены</p> : items.map(item => {
                return (<Product
                    id={item.id}
                    brand={item.brand}
                    price={item.price}
                    name={item.product}
                    key={item.id}/>)
            })}
        </Flex>
        <Pagination/>
    </>)
}
export default Products;
