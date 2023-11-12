import { useCallback, useState } from 'react';
import { presets } from '../../presets';
import { convertArrayToStr } from '../../tools';
import { useBoard } from '../lib';
import s from './index.css';

export const Panel = () => {
    const { state, reset } = useBoard();
    const [rand, setRand] = useState(0);

    const handleReset = useCallback(
        (event) => {
            setRand(Math.random());
            reset();
        },
        [reset]
    );

    const handleExport = useCallback(() => {
        const str = convertArrayToStr(state);

        const type = 'text/plain';
        const blob = new Blob([str], { type });
        const data = [new ClipboardItem({ [type]: blob })];

        navigator.clipboard.write(data);

        console.log(str);
    }, [state]);

    const handleSetPreset = useCallback(
        (event) => {
            reset(presets[event.target.value]);
        },
        [reset]
    );

    const handleUpload = useCallback((event) => {
        console.log('upload');
    }, []);

    return (
        <div className={s.panel}>
            Preset:
            <select key={rand} className={s.button} onChange={handleSetPreset}>
                <option value={null}>...</option>
                {Object.keys(presets).map((id) => (
                    <option key={id} value={id}>
                        {id}
                    </option>
                ))}
            </select>
            <div className={s.delimiter} />
            <button className={s.button} onClick={handleReset}>
                Reset
            </button>
            <button className={s.button} onClick={handleExport}>
                Export
            </button>
            <div className={s.delimiter} />
            <button className={s.button} onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
};
