import {memo, ReactElement} from 'react';
import {Flex} from 'antd';
import {FilterType} from '../../types.ts';
import SearchForm from './SearchForm.tsx';


interface IFilterProps {
    //setFilter: Dispatch<SetStateAction<IFilterValue>>
}

const Filters = memo(function (props: IFilterProps): ReactElement {
    //TS2322: Type (price: number) => void is not assignable to type FormEventHandler<HTMLInputElement>
    // const onSubmitPrice = (event: FormEventHandler<HTMLInputElement>) => {
    //     console.log(event.value)
    // if (price > 0) {
    //     const filter: IFilterValue = {
    //         filter: Filters.price,
    //         value: price
    //     }
    //     props.setFilter(filter);
    // }
    //}

    // const onSubmitBrand = (brand: string) => {
    //     if (brand.length > 0) {
    //         const filter: IFilterValue = {
    //             filter: Filters.brand,
    //             value: brand
    //         }
    //         props.setFilter(filter);
    //     }
    // }

    const handleSubmit = (inputValue: string) => {
        console.log('main component Отправлено значение:', inputValue);
    };


    return (
        <Flex vertical
              align="center"
              gap="middle"
              style={{margin: '50px'}}>
            <SearchForm>
                <SearchForm.Name
                    title='Наименование'
                    type={FilterType.product}
                    onSubmit={handleSubmit}
                />
                <SearchForm.Price
                    title='Цена'
                    type={FilterType.price}
                    onSubmit={handleSubmit}
                />
                <SearchForm.Brand
                    title='Бренд'
                    type={FilterType.product}
                    onSubmit={handleSubmit}
                />
            </SearchForm>
        </Flex>);
});
export default Filters;
