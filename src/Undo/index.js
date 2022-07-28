import React, { useState, useCallback, useRef, useEffect } from "react";
import createUndoRedo from "./UndoRedo";
import Todo from "./Todo";
import Logs from "./Logs";
import "../App.css";

function useTimeline(initialValue) {
    const timelineRef = useRef(new createUndoRedo(initialValue));
    const [state, setState] = useState(timelineRef.current.current);

    const update = value => {
        const nextState = timelineRef.current.update(value);
        setState(nextState);
    };

    const undo = () => {
        const nextState = timelineRef.current.undo();
        setState(nextState);
    };

    const redo = () => {
        const nextState = timelineRef.current.redo();
        setState(nextState);
    };

    return [state, { ...timelineRef.current, update, undo, redo }];
}

const createTodo = value => ({
    value,
    done: false,
    id: Date.now()
});

export default function Undo() {
    const [value, setValue] = useState("");
    const [
        todos,
        { update, undo, redo, timeline, canUndo, canRedo }
    ] = useTimeline([]);

    const onValueChange = ({ target }) => setValue(target.value);

    const add = () => {
        const newTodo = createTodo(value);
        const nextTodos = [...todos, newTodo];
        update(nextTodos);
        setValue("");
    };

    const toggleTodo = useCallback(
        id => {
            const nextTodos = todos.map(todo => {
                if (todo.id !== id) {
                    return todo;
                }
                return {
                    ...todo,
                    done: !todo.done
                };
            });
            update(nextTodos);
        },
        [todos, update]
    );

    const remove = useCallback(
        id => {
            const nextTodos = todos.filter(todo => todo.id !== id);
            update(nextTodos);
        },
        [todos, update]
    );

    const undoRedo = useCallback(
        ({ target }) => {
            // dynamically get the method name
            //eg:undoredoManager.undo / undoredoManager.redo
            target.name === "undo" ? undo() : redo();
        },
        [undo, redo]
    );
    // console.log(timeline);
    return (
        <div className="App">
            <div className="left">
                <div className="controls">
                    <input value={value} onChange={onValueChange} />
                    <div className="actions">
                        <button className="button-24" onClick={add} disabled={!value}>
                            Add
                        </button>

                        <button className="button-24" disabled={!canUndo} name="undo" onClick={undoRedo}>
                            {`${timeline.history.length} undo`}
                        </button>
                        <button className="button-24" disabled={!canRedo} name="redo" onClick={undoRedo}>
                            {`${timeline.future.length} redo`}
                        </button>
                    </div>
                </div>
                {todos.map(todo => (
                    <Todo key={todo.id} onMark={toggleTodo} onRemove={remove} {...todo} />
                ))}
            </div>
            <div className="right">
                <div className="right-title">LOG</div>
                <div>
                    <div className="logs">
                        <Logs title="history" items={timeline.history} />
                        <Logs title="future" items={timeline.future} />
                    </div>
                </div>
            </div>
        </div>
    );
}