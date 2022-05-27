import React from 'react';
import ReactDOM from 'react-dom';
import cloneDeep from 'lodash.clonedeep';
import confetti from 'canvas-confetti';
import './index.css';


function Row (props) {
    const allCombinations = props.value;
    const key = props.row;
    const isActive = (props.activeRow === key) ? ' active' : ''
    const resultsPerRow = props.resultsPerRow;
    const dot = ".";

    return (
        <tr className={`board-row board-row-${key}${isActive}`}>
            <td className={`square mm-icon mm-icon--${allCombinations[key][0]}`}/>
            <td className={`square mm-icon mm-icon--${allCombinations[key][1]}`}/>
            <td className={`square mm-icon mm-icon--${allCombinations[key][2]}`}/>
            <td className={`square mm-icon mm-icon--${allCombinations[key][3]}`}/>
            <td className="square mm-dots">
                <span className='mm-dot mm-dot--black'>{dot.repeat(resultsPerRow[key][0])}</span>
                <span className='mm-dot mm-dot--red'>{dot.repeat(resultsPerRow[key][1])}</span>
            </td>
        </tr>
    )
}

function Symbol (props) {
    return (
        <td>
            <button disabled={props.status==='You WON! 🎉🎉🎉' || props.status==='Press "Start" to begin'}
                    className={`mm-icon mm-icon--${props.value}`}
                    onClick={() => props.onClick()}>
            </button>
        </td>
    );
}

function Commands (props) {

    if (props.status==='Press "Start" to begin')  {
        return (
            <button onClick={props.onStartClick}>Start Game</button>
        )
    } else {
        return (
            <div>
                <button disabled={!props.confirmRequired} onClick={props.confirmClick}>Confirm</button>
                <button disabled={props.clearDisabled} onClick={props.clear}>Clear</button>
                <button onClick={props.restart}>Restart</button>
            </div>
        )
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCombination: [],
            bingo: [],
            allCombinations: {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[]},
            resultsPerRow: {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[]},
            counter: 0,
            activeRow: false,
            confirmRequired: false,
            clearDisabled: false,
            status: 'Press "Start" to begin'
        };
    }

    renderSymbol(i) {
        return (
            <Symbol
                value= {i}
                onClick={() => this.handleSymbolClick(i)}
                status={this.state.status}
            />
        );
    }

    renderRow(i) {
        return <Row
            value={this.state.allCombinations}
            row={i}
            activeRow={this.state.activeRow}
            resultsPerRow={this.state.resultsPerRow}
        />;
    }

    onStartClick() {
        this.setState({status: 'Choose your combination'})
        this.setState({activeRow: 0})
        this.setState({clearDisabled: false})

        let random = []
        for (let i = 0; i < 4; i++) {
            random.push(Math.floor((Math.random() * 4)))
        }
        this.setState({bingo: random})
        console.log(`bingo: ${random}`);
    }

    confirmClick() {
        this.setState({confirmRequired: false})

        const current = this.state.allCombinations[(this.state.counter)],
            bingo = this.state.bingo.slice(),
            comparingSample = current.slice()

        let index,
            result = 0,
            countMatched = 0,
            resultsPerRow = cloneDeep(this.state.resultsPerRow)

        for (let i = 0; i < 4; i++) {
            if (current[i] === bingo[i]) {
                result++;
            }
            if (comparingSample.includes(bingo[i])) {
                index = comparingSample.indexOf(bingo[i]);
                if (index > -1) {
                    comparingSample.splice(index, 1)
                    countMatched++;
                }
            }
        }

        resultsPerRow[(this.state.counter)] = [countMatched, result]
        this.setState({resultsPerRow: resultsPerRow})

        if (result === 4) {
            this.setState({status: 'You WON! 🎉🎉🎉'})
            this.setState({clearDisabled: true})
            confetti({
                particleCount: 200,
                spread: 120,
                origin: {
                    y: 0.6
                }
            });
        } else {
            this.setState({status: 'Choose your combination'})
            const counter = this.state.counter;
            this.setState({currentCombination: []})
            this.setState({counter: counter + 1})
            this.setState({activeRow: counter + 1})
        }
    }

    restart() { // this could probably be done in more elegant way, with clone-deep or something
        this.setState({currentCombination: []})
        this.setState({allCombinations: {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[]}})
        this.setState({resultsPerRow: {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[]}})
        this.setState({counter: 0})
        this.setState({activeRow: false})
        this.setState({confirmRequired: false})
        this.setState({bingo: []})
        this.setState({status: 'Press "Start" to begin'})
    }

    clear() {
        this.setState({currentCombination: []})
        let allCombinations = this.state.allCombinations;
        let resultsPerRow = this.state.resultsPerRow;
        allCombinations[this.state.counter] = [];
        resultsPerRow[this.state.counter] = [];
        this.setState({allCombinations: allCombinations})
        this.setState({resultsPerRow: resultsPerRow})

        let counter = this.state.counter;
        this.setState({counter: counter})
        this.setState({activeRow: counter})
        this.setState({confirmRequired: false})
        this.setState({status: 'Choose your combination'})
    }

    handleSymbolClick(i) {

        if (this.state.confirmRequired === true) {
            return
        }

        const currentCombination = this.state.currentCombination;
        const allCombinations = this.state.allCombinations;
        const counter = this.state.counter;

        currentCombination.push(i);
        if (currentCombination.length < 4) {
            this.setState({currentCombination: currentCombination})
            allCombinations[counter] = (currentCombination);
            this.setState({allCombinations: allCombinations})
        } else {
            this.setState({confirmRequired: true})
            this.setState({status: 'Confirm'})
        }
    }

    render() {
        return (
            <div>
                <div className="mm-status">
                    {this.state.status}
                </div>
                <div className="mm-commands">
                    <Commands
                        status={this.state.status}
                        confirmRequired={this.state.confirmRequired}
                        clearDisabled={this.state.clearDisabled}
                        onStartClick={() => this.onStartClick()}
                        confirmClick={() => this.confirmClick()}
                        restart={() => this.restart()}
                        clear={() => this.clear()}
                        />
                </div>
                <table className="mm-selection" cellSpacing="0">
                    <tbody>
                    <tr>
                        {this.renderSymbol(0)}
                        {this.renderSymbol(1)}
                        {this.renderSymbol(2)}
                        {this.renderSymbol(3)}
                    </tr>
                    </tbody>
                </table>
                <table className="board-content">
                    <tbody>
                    {this.renderRow(0)}
                    {this.renderRow(1)}
                    {this.renderRow(2)}
                    {this.renderRow(3)}
                    {this.renderRow(4)}
                    {this.renderRow(5)}
                    {this.renderRow(6)}
                    {this.renderRow(7)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function Game () {
    return (
        <div className="mm-game">
            <div className="mm-game__logo">
                <img alt='' src='mastermind.png' />
            </div>
            <div className="mm-game__board">
                <Board />
            </div>
            <div className="mm-game__info">
                Mastermind is a code-breaking game, invented in 1970 by Mordecai Meirowitz,
                Romanian-born Israeli postmaster and telecommunications expert.
                <img alt='' src='Mordecai-Meirowitz.jpg' /><br/><hr/>
                This is a ReactJS app. Feel free to send any suggestions on Github.

                <br/><br/><a href={'https://github.com/tahireu/mastermind'}>https://github.com/tahireu/mastermind</a>
            </div>
        </div>
    )
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
