import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    children: string
    onChangeTitle: (value: string) => void
}

export const EditableSpan: React.FC<PropsType> = (
    {
        children, //?
        onChangeTitle
    }
) => {
    const [value, setValue] = useState(children)

    const [isEdit, setIsEdit] = useState(false)
    const onDoubleClickHandler = () => {
        setIsEdit(true)
    }

    const onBlurHandler = () => {
        setIsEdit(false)
        onChangeTitle(value)
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    };

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler()
        }
    };

    return (
        <>
            {
                isEdit ?
                    <input type="text"
                           onBlur={onBlurHandler}
                           onChange={onChangeHandler}
                           onKeyDown={onEnterHandler}
                           value={value}
                           autoFocus
                    /> :
                    <span onDoubleClick={onDoubleClickHandler}>
                        {value}
                    </span>
            }
        </>
    );
}
