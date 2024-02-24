import {ReactElement} from 'react';
import {Card} from 'antd';

interface IProductProps {
    brand: string | null,
    price: number,
    name: string,
    isLoading: boolean
}

const Product = (props: IProductProps): ReactElement => {
    return (
        <Card
            size="small"
            style={{
                wordWrap: 'normal',
                width: 230,
                height: 160
            }}>
            <p>{props.name}</p>
            <p>{props.price}</p>
            <p>{props.brand}</p>
        </Card>
    );
}

export default Product;
