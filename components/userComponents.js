class UserButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.state.show = !this.state.show;
        this.setState({show: this.state.show});
    }
    render() { 
        return <div><CreateUser show={this.state.show} /><LoginUser show={this.state.show}/>
            <button onClick={this.handleClick}>Logga in</button><button onClick={this.handleClick}>Skapa konto</button></div>;
    }
}

class DialogBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.state.show = !this.state.show;
        this.setState({show: this.state.show});
    }

    render() { 
        if(this.state.show){
            return <div className="box"><button onClick={this.handleClick} className="closeButton">X</button>{this.props.children}</div>;
        }else{
            return <div></div>
        }
    }
}

class CreateUser extends React.Component {
    render() { 
        return <DialogBox>
            <h1>Skapa användare</h1>
            <input type="text"></input>
        </DialogBox>;
    }
}
 
class LoginUser extends React.Component {
    render() { 
        return <DialogBox>
            <h1>Logga in</h1>
            <input type="text"></input>
        </DialogBox>;
    }
}
 