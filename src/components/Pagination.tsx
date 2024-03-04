import {memo, ReactElement, useContext, useState} from 'react';
import {Button, Flex} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {ReducerContext} from '../App/App.tsx';
import {Action} from '../App/reducer.ts';
import {fetchData, PRODUCTS_PER_PAGE} from '../functions/requests.ts';

const Pagination = memo((): ReactElement => {
    const context = useContext(ReducerContext);
    const [isLoading, setIsLoading] = useState(false);
    const handleButtonPrev = () => {
        // if (currentPage && currentPage > 1) {
        //     reducerContext?.setValue({type: Action.stepBack, items: []})
        // }
    }

    const isNextDisabled = (): boolean => {
        return context!.value.items.length <= PRODUCTS_PER_PAGE || isLoading;
    }

    const handleButtonNext = () => {
        setIsLoading(true);
        const newCurrentPageValue = context!.value.currentPage + 1;
        const filter = context?.value.filter;
        fetchData(newCurrentPageValue, filter!).then((items) => {
            context!.setValue({
                type: Action.setItems,
                items: items,
                nextButtonIsActive: items.length === PRODUCTS_PER_PAGE,
                currentPage: newCurrentPageValue,
            });
        })
            .then(() => setIsLoading(false));
    }

    return (
        <Flex justify="center" gap="20px">
            <Button disabled={context?.value.currentPage === 1} icon={<LeftOutlined/>}
                    onClick={handleButtonPrev}></Button>
            <Button disabled={isNextDisabled()} icon={<RightOutlined/>} onClick={handleButtonNext}></Button>
        </Flex>);
});
export default Pagination;
