import {Typography} from 'antd';
import React, {ReactNode, useState} from 'react';
import Search from 'antd/lib/input/Search';
import {FilterType} from '../../types.ts';
import {validatePrice} from './helpers.ts';

interface SearchFormProps {
    children: ReactNode
}

interface InputProps {
    title: string;
    type: FilterType;
    onSubmit: (inputValue: string) => void;
}

const Input: React.FC<InputProps> = ({title, type, onSubmit}) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (value: string) => {
        if (value.length === 0) {
            setError('Пожалуйста, введите значение');
            return;
        }
        if (type === FilterType.price) {
            if (!validatePrice(value)) {
                setError('Пожалуйста, введите корректное число');
                return;
            } else {
                onSubmit(value);
                setError('');
                setInputValue('');
            }
            console.log('price submit attempt');
        }
    };

    return (
        <div>
            <Typography.Title level={5} style={{margin: '30px 0 12px'}}>{title}</Typography.Title>
            <Search
                onSearch={(value) => {
                    setInputValue(value);
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
};

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
