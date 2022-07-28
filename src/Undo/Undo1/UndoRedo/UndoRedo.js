const splitLast = arr => {
    // split the last item from an array and return a tupple of [rest, last]
    const length = arr.length;
    const lastItem = arr[length - 1];
    const restOfArr = arr.slice(0, length - 1);
    return [restOfArr, lastItem];
};

const sliceEnd = (arr, size) => {
    // slice array from to end by size
    const startIndex = arr.length < size ? 0 : size;
    const trimmedArr = arr.slice(startIndex, arr.length);
    return trimmedArr;
};

function createUndoRedo(initial, options = {}) {
    const { trace, historyLimit = Infinity } = options;
    let _historyLimit = historyLimit;
    let _timeline = {
        history: [],
        current: initial,
        future: []
    };
    log("init");

    function log(str = "") {
        trace && console.log(str, this.current);
    }

    function _getCurrent() {
        return _timeline.current;
    }

    function _canUndo() {
        return _timeline.history.length > 0;
    }

    function _canRedo() {
        return _timeline.future.length > 0;
    }

    function update(next) {
        // update the current value
        const { history, current } = _timeline;
        // calculate history storage limit
        const limitedHistory = sliceEnd(history, _historyLimit);
        _timeline = {
            history: [...limitedHistory, current],
            current: next,
            // reset redo, don't allow redo if we update in the middle of the timeline
            // this seems to be the idiomatic approach for most applications
            future: []
        };
        log("update");
        return this.current;
    }

    function undo() {
        if (this.canUndo) {
            const { history, current, future } = _timeline;
            const [restOfArr, lastItem] = splitLast(history);
            _timeline = {
                history: restOfArr,
                current: lastItem,
                future: [...future, current]
            };
            log("undo");
            return this.current;
        }
    }

    function redo() {
        if (this.canRedo) {
            const { history, current, future } = _timeline;
            const [restOfArr, lastItem] = splitLast(future, _historyLimit);
            _timeline = {
                history: [...history, current],
                current: lastItem,
                future: restOfArr
            };
            log("redo");
            return this.current;
        }
    }

    function resetHistory() {
        _timeline.history = [];
    }

    function resetFuture() {
        _timeline.future = [];
    }

    const publicAPI = {
        update,
        undo,
        redo,
        resetHistory,
        resetFuture,
        get current() {
            return _getCurrent();
        },
        get canRedo() {
            return _canRedo();
        },
        get canUndo() {
            return _canUndo();
        },
        get historyLimit() {
            return _historyLimit;
        },
        set historyLimit(val) {
            _historyLimit = val;
        },
        get timeline() {
            return _timeline;
        }
    };

    return publicAPI;
}

export default createUndoRedo;
