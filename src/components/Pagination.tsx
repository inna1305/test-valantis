import {Dispatch, ReactElement, SetStateAction} from 'react';
import {Button, Flex} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

interface IPaginationProps {
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    nextIsDisabled: boolean
}
const Pagination = (props: IPaginationProps): ReactElement => {
    return (<Flex justify="center" gap="20px">
        <Button disabled={props.currentPage === 1} icon={<LeftOutlined/>} onClick={() => {
            if (props.currentPage > 1) {
                props.setCurrentPage(props.currentPage - 1);
            }
        }
        }></Button>
        <Button disabled={props.nextIsDisabled} icon={<RightOutlined/>} onClick={() => {
            props.setCurrentPage(props.currentPage + 1)
        }}></Button>
    </Flex>);
}
export default Pagination;
