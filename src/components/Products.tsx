import {Flex} from 'antd';
import Product from './Product.tsx';
import Pagination from './Pagination.tsx';
import {Dispatch, ReactElement, SetStateAction} from 'react';
import {IItem} from '../types.ts';
interface IProductProps {
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    nextButtonState: boolean,
    items: IItem[]
}

const Products = (props: IProductProps): ReactElement => {
    return (<>
        <Flex wrap="wrap" gap="20px" style={{marginBottom: '30px'}}>
            {props.items.map(item => {
                return (<Product
                    id={item.id}
                    brand={item.brand}
                    price={item.price}
                    name={item.product}
                    key={item.id}/>)
            })}
        </Flex>
        <Pagination
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
            nextIsDisabled={props.nextButtonState}/>
    </>)
}
export default Products;
