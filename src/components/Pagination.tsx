import {memo, ReactElement, useContext, useState} from 'react';
import {Button, Flex} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {ReducerContext} from '../App/App.tsx';
import {Action} from '../App/reducer.ts';
import {fetchData, PRODUCTS_PER_PAGE} from '../functions/requests.ts';

const Pagination = memo((): ReactElement => {
    const context = useContext(ReducerContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleButton = (newPageNumber: number) => {
        setIsLoading(true);
        const filter = context.value.filter;
        fetchData(newPageNumber, filter).then((items) => {
            context.setValue({
                type: Action.setItems,
                items: items,
                nextButtonIsActive: items.length === PRODUCTS_PER_PAGE,
                currentPage: newPageNumber,
            });
        })
            .then(() => setIsLoading(false));
    }

    const isNextDisabled = (): boolean => {
        //context.value.filter !== null - stub (there is no pagination on the server for filtered products)
        return !(context.value.nextButtonIsActive) || context.value.filter !== null || isLoading;
    }

    const isPrevDisabled = (): boolean => {
        return context.value.currentPage === 1 || isLoading;
    }

    const currentPage = context.value.currentPage;
    return (
        <Flex justify="center" gap="20px">
            <Button disabled={isPrevDisabled()} icon={<LeftOutlined/>}
                    onClick={() => handleButton(currentPage - 1)}></Button>
            <Button disabled={isNextDisabled()} icon={<RightOutlined/>}
                    onClick={() => handleButton(currentPage + 1)}></Button>
        </Flex>);
});
export default Pagination;
