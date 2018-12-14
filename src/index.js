import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class NameForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    handleFormSubmission(event) {
        alert("This name was submitted" + this.state.value);
        event.preventDefault();

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    render() {
        return (
            <form onSubmit={this.handleFormSubmission}>
                <label>
                    Name:
                    <input type="textbox" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            );
    }
}
function NumberList(props) {
    const numbers = props.numbers;
    const listitems = numbers.map((number) =>
        <ListItem key={number.toString()}
            value={number} />
    );

    return (
        <ul>
            {listitems}
        </ul> 
        );
       
}
    
function ListItem(props) {
    return (
        <li>{props.value}</li>
        );
}

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }
    return (
        <div className="warning">
            Warning!!
        </div>
        ); 
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showWarning: true };
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(
            state => ({
                showWarning: !state.showWarning
            })
        );
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick} >
                    {this.state.showWarning?'Hide':'Show'}
                </button>
            </div>            
             );
    }

}


class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);

    }

    componentWillMount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({ date: new Date() });

    }

    render() {
        return (
            <div>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}



function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
        );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    renderSquare(i) {

        return (<Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />);
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });

    }



    render() {

        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = "Winner" + winner;
        }
        else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }

       

        return (
            <div>
               
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        const numbers = ['ReactJS', 'Redux', 'ASP .NET', 'Angular', 'JS'];
        return (
            <div className="game">
                <h3>Demo of list and keys</h3>
                <NumberList numbers={numbers} />
                <hr/>
                <h3>Demo of Conditional rendering & Handling Events</h3>
                <div className="toggle-warning"><Page /></div>
                <hr />
                <h3>Demo of State and LifeCycle</h3>
                <div className="header"><Clock /></div>
                <hr />
                <h1>Play Tic-Tac-Toe</h1>
                <div className="game-board">
                    <Board />
                </div>
                <hr />
                <div class="controlled-comp">
                    <NameForm/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================



ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
