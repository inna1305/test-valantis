import {memo, ReactElement, useContext} from 'react';
import {Button, Flex} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {Action} from '../App/reducer.ts';
import {fetchData, PRODUCTS_PER_PAGE} from '../functions/requests.ts';
import {LoadingContext, ReducerContext} from '../App/App.tsx';

const Pagination = memo((): ReactElement => {
    const {reducerValue, setReducerValue} = useContext(ReducerContext);
    const {setIsLoading} = useContext(LoadingContext);
    const handleButton = (newPageNumber: number) => {
        setIsLoading(true);
        const filter = reducerValue.filter;
        fetchData(newPageNumber, filter)
            .then((items) => {
                setReducerValue({
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
        return !(reducerValue.nextButtonIsActive) || reducerValue.filter !== null;
    }

    const isPrevDisabled = (): boolean => {
        return reducerValue.currentPage === 1;
    }

    const currentPage = reducerValue.currentPage;
    return (
        <Flex justify="center" gap="20px">
            <Button disabled={isPrevDisabled()} icon={<LeftOutlined/>}
                    onClick={() => handleButton(currentPage - 1)}></Button>
            <Button disabled={isNextDisabled()} icon={<RightOutlined/>}
                    onClick={() => handleButton(currentPage + 1)}></Button>
        </Flex>);
});
export default Pagination;
