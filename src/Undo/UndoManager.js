import React, {useEffect, useRef, useState} from 'react';
import '../App.css'
import Undo from "./Undo";

export default function UndoManager() {

    const [data, setData] = useState(Undo.data);

    return (
        <div className="container-undo-manager">
            <button className="button-24" onClick={() => Undo.undo()}>Undo</button>
            <button className="button-24" onClick={() => Undo.redo()}>Redo</button>

            <button className="button-24" onClick={() => Undo.doCommand(Undo.PUSH, 'nodes')}> INCREMENT </button>
            <button className="button-24" onClick={() => Undo.doCommand(Undo.POP, 'nodes')}> DECREMENT </button>
        </div>
    );
}