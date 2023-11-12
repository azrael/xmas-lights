import { useCallback } from 'react';
import cx from 'classnames';
import { useBoard } from '../lib';
import s from './index.css';

export const Cell = ({ i }) => {
    const { mode, state, update } = useBoard();

    const handleChange = useCallback(
        (event) => {
            update(i, event.target.value);
        },
        [i, update]
    );

    const handleClick = useCallback(() => {
        update(i, state[i] ? undefined : '#0000FF');
    }, [i, state, update]);

    return (
        <div
            className={cx(s.cell, !state[i] && s.empty)}
            data-i={i}
            style={{ color: state[i] }}
            onClick={mode === 'simple' ? handleClick : undefined}
        >
            {mode === 'picker' && <input type="color" value={state[i]} className={s.input} onChange={handleChange} />}
        </div>
    );
};
