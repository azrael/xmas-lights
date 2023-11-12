import { convertStrToArray } from '../tools';

const req = require.context('.', true, /\.js$/);

export const presets = {};

req.keys().forEach((filename) => {
    const id = /\/([^/]+?)\.js$/.exec(filename)[1];

    if (id !== 'index') {
        const { data, palette } = req(filename);
        presets[id] = convertStrToArray(data, palette);
    }
});
