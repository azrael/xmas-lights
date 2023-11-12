import { lightsCount, rows, cols, offset } from './constants';

export const convertStrToArray = (data, palette = {}) => {
    const state = [...Array(lightsCount)];

    data.split('\n')
        .filter(Boolean)
        .forEach((line, y) => {
            const odd = y % 2 === 0;

            return line.split('').forEach((c, x) => {
                const i = lightsCount - (cols * y + (odd ? x : cols - x - 1)) - 1;
                state[i] = palette[c];
            });
        });

    return state;
};

export const convertArrayToStr = (state) => {
    const arr = state.slice(offset).reverse();

    return [...Array(rows)]
        .map((_, y) => {
            const odd = y % 2 === 0;
            const line = arr.slice(cols * y, cols * (y + 1)).map((c) => (c ? 'x' : ' '));

            if (!odd) line.reverse();

            return line.join('');
        })
        .join('\n');
};
