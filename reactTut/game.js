var Star = React.createClass({
	render: function() {
		var stars = [];
		for (var i=0;i<this.props.num;i++) {
			stars.push(<span className="glyphicon glyphicon-star"></span>);
		}
		return (
			<div id="star-frame">
				<div className="well">
					{stars}
				</div>
			</div>
		);
	}
});

var ButtonFrame = React.createClass({
	render: function() {
		return (
			<div id="button-frame">
				<button className="btn btn-primary">=</button>
				<br/>
			</div>
		);
	}
});

var Answer = React.createClass({
	render: function() {
		var ansNums = [];
		console.log("selected array here in answer: "+this.props.selected);
		for (var i=0;i<(this.props.selected).length;i++) {
			console.log((this.props.selected)[i] +" with index: " + i);
			ansNums.push(<span onClick={this.props.unselectNum.bind(null,(this.props.selected)[i])}>{(this.props.selected)[i]}</span>);
		}
		return (
			<div id="answer-frame">
				<div className="well">
					{ansNums}
				</div>
			</div>
		);
	}
});

var Num = React.createClass({
	render: function() {
		var nums = [], className, selectNum=this.props.selectNum;
		for (var i=1;i<=9;i++) {
			className = "num selected-" + ((this.props.selected).indexOf(i)>-1);
			//console.log(className);
			nums.push(<div className={className} onClick={selectNum.bind(null, i)}>{i}</div>);
		}
		return (
			<div id="num-frame">
				<div className="well">
					{nums}
				</div>
			</div>
		);
	}
});

var Game = React.createClass({
	getInitialState: function() {
		return {num: Math.floor(Math.random()*9)+1, selected: []};
	},
	selectNum: function(selectNum) {
		if (this.state.selected.indexOf(selectNum)<0) {
			this.setState({selected: this.state.selected.concat(selectNum)});
			this.setState({num: this.state.num - selectNum});
		}
	},
	unselectNum: function(selectNum) {
		console.log("select num: " + selectNum + "  and selected array: " + this.state.selected);
		console.log(this.state.selected.indexOf(selectNum));
		this.state.selected.splice(this.state.selected.indexOf(selectNum),1);
		console.log("after splice: " + this.state.selected);
		this.setState({selected: this.state.selected});
		this.setState({num: this.state.num + selectNum});		
	},
	render: function() {
		return (
			<div id="game">
			<h2>Play Nine</h2>
			<hr/>
			<Star num={this.state.num} />
			<ButtonFrame />
			<Answer selected={this.state.selected} unselectNum={this.unselectNum} />
			<Num selected={this.state.selected} selectNum={this.selectNum}/>
			</div>
		);
	}
});

ReactDOM.render(
	<Game />,
	document.getElementById('container')
);