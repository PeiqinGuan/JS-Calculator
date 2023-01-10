function App () {
    const [current, setCurrent] = React.useState('0');
    const [previous, setPrevious] = React.useState('')

    const allClear = () => {
        setCurrent('0')
        setPrevious('')
    }

    const back = () => {
        if (previous.includes('=')) {
            setCurrent('0')
        } else {
            current.length == 1 ? setCurrent('0') : setCurrent((prev) => prev.slice(0, -1))
            previous.length == 1 ? setPrevious('') : setPrevious((prev) => prev.slice(0, -1))
        }
    }

    const chooseOperation = (operation) => {
        if (previous == '') setPrevious('0');
        if (previous.includes('=')) setPrevious(current);
        if (/[+*/-]/.test(previous[previous.length - 1])) {
            if (/[+*/-]/.test(previous[previous.length - 2])) {
                if (previous[previous.length - 1] == operation) {
                    return
                } else {
                    if (operation == "-") {
                        setPrevious((prev) => prev.slice(0, -1) + operation)
                    } else {
                        setPrevious((prev) => prev.slice(0, -2) + operation)
                    }
                }
            } else {
                if (operation == "-") {
                    setPrevious((prev) => prev + operation)
                } else {
                    setPrevious((prev) => prev.slice(0, -1) + operation)
                }
            }
        } else {
            setPrevious((prev) => prev + operation)
        }
        setCurrent(operation)
    }

    const appendNumber = (number) => {
        if (previous.includes('=')) {
            setPrevious('')
            setPrevious((prev) => prev + number)
            setCurrent('')
            setCurrent((prev) => prev + number)
        } else {
            if (number == '.' && current.includes('.')) return;
            if (current == '0' && previous == '0' && number !== '0') {
                setCurrent((prev) => prev.slice(0, -1))
                setPrevious((prev) => prev.slice(0, -1))
            }
            if (/[+*/-]/.test(current)) setCurrent('');
            if (current == 0 && previous == '' && number !== 0) setCurrent('');
            if (!current.includes('.') && number == 0 && current[0] == 0 && previous.length > 0) return;
            setCurrent((prev) => prev + number);
            setPrevious((prev) => prev + number);
        }
        
    }

    const calculate = () => {
        let result = eval(previous)
        setCurrent(result)
        setPrevious(prev => prev + '=' + result)
    }



    return (
        <div className="container">   
            <div className="grid">
                <div className="display">
                    <div id="current">{previous}</div>
                    <div id="display">{current}</div>
                </div>
                <div className="button" onClick={allClear} id="clear">AC</div>
                <div className="button" onClick={back} id="delete">C</div>
                <div className="button" onClick={() => chooseOperation('/')} id="divide">/</div>
                <div className="button" onClick={() => chooseOperation('*')} id="multiply">x</div>
                <div className="button" onClick={() => appendNumber('7')} id="seven">7</div>
                <div className="button" onClick={() => appendNumber('8')} id="eight">8</div>
                <div className="button" onClick={() => appendNumber('9')} id="nine">9</div>
                <div className="button" onClick={() => chooseOperation('-')} id="subtract">-</div>
                <div className="button" onClick={() => appendNumber('4')} id="four">4</div>
                <div className="button" onClick={() => appendNumber('5')} id="five">5</div>
                <div className="button" onClick={() => appendNumber('6')} id="six">6</div>
                <div className="button" onClick={() => chooseOperation('+')} id="add">+</div>
                <div className="button" onClick={() => appendNumber('1')} id="one">1</div>
                <div className="button" onClick={() => appendNumber('2')} id="two">2</div>
                <div className="button" onClick={() => appendNumber('3')} id="three">3</div>
                <div className="button" onClick={calculate} id="equals">=</div>
                <div className="button" onClick={() => appendNumber('0')} id="zero">0</div>
                <div className="button" onClick={() => appendNumber('.')} id="decimal">.</div>
            </div>
        </div> 
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
