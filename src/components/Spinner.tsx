import {ReactElement} from 'react';
import {Spin} from 'antd';

export const Spinner = (): ReactElement => {
    return (<Spin tip="Загрузка..." size="large" style={{marginTop: '20%'}}>
        <div className="content"/>
    </Spin>)
}
