import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskBook from './TaskBook';

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

describe('TaskBookTests', () => {
    let headerTaskInput: Window | Node;
    let headerTaskButton: Window | Node;
    let newTaskName = 'not to forget to write some tests :)';
    beforeEach(() => {
        render(<TaskBook />)
        headerTaskInput = screen.getByRole('textbox', { name: 'header__task__input' });
        headerTaskButton = screen.getByRole('button', { name: 'header__task__button' });
    })

    it('render TaskBook components', () => {
        expect(headerTaskInput).toBeInTheDocument();
        expect(headerTaskButton).toBeInTheDocument();
        expect(screen.getByText('No data')).toBeInTheDocument();
    })

    it('adding new task to the list', () => {
        fireEvent.change(headerTaskInput, { target: { value: newTaskName } })
        fireEvent.click(headerTaskButton)
        expect(screen.getByText(newTaskName)).toBeInTheDocument();
    })

    it('finish added task from list', () => {
        const completeButton = screen.getByRole('button', { name: `complete ${newTaskName}` })
        expect(completeButton).toBeInTheDocument();
        fireEvent.click(completeButton)
    })

    it('delete added finish-task from list', () => {
        const deleteButton = screen.getByRole('button', { name: `delete ${newTaskName}` })
        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton)
        expect(screen.getByText('No data')).toBeInTheDocument();
    })

})