import { Button, Input, Space } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'

interface TListHeader {
    setTaskName: Dispatch<SetStateAction<string>>
    tab: string
    addTask: () => void
    taskName: string
}

const ListHeader: React.FC<TListHeader> = ({ setTaskName, tab, addTask, taskName }) => {

    const onClickKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.keyCode === 13 && taskName && addTask();
    }

    return (
        <Space.Compact style={{ width: '100%' }}>
            <Input
                aria-label='header__task__input'
                onKeyDown={onClickKeyDown}
                disabled={tab === 'Completed'}
                value={taskName}
                onChange={(e) => { setTaskName(e.target.value) }}
                placeholder='What needs to be done?'
            />
            <Button
                aria-label='header__task__button'
                disabled={!taskName}
                onClick={addTask}
                type="primary"
            >
                Add
            </Button>
        </Space.Compact>
    )
}

export default ListHeader