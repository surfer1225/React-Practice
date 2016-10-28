var Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var component = this;
    $.get("https://api.github.com/users/"+this.props.name, function(data){ 
      component.setState(data);
    });
  },
  render: function() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80"/>
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
    );
  }
});

var LogInForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = ReactDOM.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="github login" ref="login"/>
        <button>Add</button>
      </form>
    );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {logins: []};
  },
  addCardInMain: function(loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  render: function() {
    var cards = this.state.logins.map(function(login) {
      return (<Card name={login} />);
    });
    return (
      <div>
        <LogInForm addCard={this.addCardInMain} /> 
        {cards}
      </div>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById("root"));