import {Typography} from 'antd';
import React, {ReactNode, useContext, useState} from 'react';
import Search from 'antd/lib/input/Search';
import {FilterType} from '../../types.ts';
import {getDataForRequest, validatePrice} from './helpers.ts';
import {FilterContext} from '../../App/App.tsx';

interface SearchFormProps {
    children: ReactNode
}

interface InputProps {
    title: string;
    type: FilterType;
}

const Input: React.FC<InputProps> = ({title, type}) => {
        const [error, setError] = useState('');
        const context = useContext(FilterContext);

        const handleSubmit = (value: string) => {
            if (value.length === 0) {
                setError('Пожалуйста, введите значение');
                return;
            }
            if (type === FilterType.price) {
                if (!validatePrice(value)) {
                    setError('Пожалуйста, введите корректное число');
                    return;
                }
            }
            const res = getDataForRequest(type, value);
            setError('');
            if(context) {
                context.setValue(res);
            }
        }

        return (
            <div>
                <Typography.Title level={5} style={{margin: '30px 0 12px'}}>{title}</Typography.Title>
                <Search
                    onSearch={(value) => {
                        handleSubmit(value);
                    }
                    }
                    style={{
                        borderColor: 'black',
                        width: 250,
                    }}
                />
                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
        );
    }
;

const SearchForm: React.FC<SearchFormProps> & { Price: React.FC<InputProps> }
    & { Brand: React.FC<InputProps> }
    & { Name: React.FC<InputProps> } = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

SearchForm.Price = Input;
SearchForm.Brand = Input;
SearchForm.Name = Input;

export default SearchForm;
