import { useState } from 'react';

export function useTemporaryMessage(duration = 2000) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    const display = (msg: string) => {
        setText(msg);
        setShow(true);
        setTimeout(() => setShow(false), duration);
    };

    return { show, text, display };
}