import { useMemo, useState } from 'react';
import cx from 'classnames';
import { lightsCount, rows, cols, offset } from '../tools';
import { Cell } from './cell';
import { Panel } from './panel';
import { boardContext } from './lib';
import s from './index.css';

// Start from the top left corner
const grid = [...Array(rows)].map((_, i) => ({
    key: i,
    cells: [...Array(cols)].map((_, j) => ({ i: lightsCount - 1 - i * cols - j }))
}));

const tail = [...Array(lightsCount - rows * cols)].map((_, i) => ({ i: offset - i - 1 }));
tail.splice(1, 0, null);

export const Board = ({ mode, state: initial }) => {
    const [state, setState] = useState(initial);

    const context = useMemo(
        () => ({
            mode,
            state,
            update: (i, color) => {
                setState(state.map((_, j) => (i === j ? color : _)));
            },
            reset: (newState) => setState(newState || [...Array(lightsCount)])
        }),
        [state]
    );

    return (
        <div className={s.board}>
            <boardContext.Provider value={context}>
                <Panel />
                {grid.map((row, i) => (
                    <div key={row.key} className={cx(s.row, i % 2 === 1 && s.even)}>
                        {row.cells.map((item) => (
                            <Cell key={item.i} i={item.i} />
                        ))}
                    </div>
                ))}
                <div className={s.tail}>{tail.map((item) => (item ? <Cell key={item.i} i={item.i} /> : <div key={-1} className={s.gap} />))}</div>
            </boardContext.Provider>
        </div>
    );
};

Board.defaultProps = {
    mode: 'simple',
    state: [...Array(lightsCount)]
};
