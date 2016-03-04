var IwButton = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleClick: function(){
    console.log('button clicked ' + this.state.text);
  },
  handleTextChange: function(e){
    this.setState({text: e.target.value});
  },
  render: function() {
    return (
      <div className="testInputHook">
        <button onClick={this.handleClick}>Test</button>
        <input name="text" value={this.state.text} onChange={this.handleTextChange}></input>
      </div>
    );
  }
});

ReactDOM.render(
  <IwButton/>,
  document.getElementById('example')
);
