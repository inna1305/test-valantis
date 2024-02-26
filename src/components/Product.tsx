import {ReactElement} from 'react';
import {Card} from 'antd';

interface IProductProps {
    id: string,
    brand: string | null,
    price: number,
    name: string,
}

const Product = (props: IProductProps): ReactElement => {
    return (
            <Card
                style={{
                    width: 230,
                    height: 180,
                }}>
                <p style={{fontSize: '16px', fontWeight: '600', lineHeight: '1.2', paddingBottom: '10px'}}>{props.name}</p>
                <p>{props.price}</p>
                <p>{props.brand}</p>
                <p style={{fontSize: '9px'}}>{props.id}</p>
            </Card>
    );
}

export default Product;
