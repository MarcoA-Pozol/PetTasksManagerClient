import { useState } from 'react';

export function useTemporaryMessage(duration = 2000) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [color, setColor] = useState("blue");

    const display = (msg:string, color:string="blue") => {
        setText(msg);
        setShow(true);
        setColor(color);
        setTimeout(() => setShow(false), duration);
    };

    return { show, text, color, display };
}