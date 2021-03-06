class Header extends React.Component {
    render() { 
        return <div className="head">
            <div>Logo</div>
            <div className="buttons">
                <CreateUserForm />
                <LoginUserForm />
            </div>
        </div>
    }
}

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
        return <button onClick={this.handleClick}>{this.props.name}</button>;
    }
}

class DialogBox extends React.Component {
    render() { 
        return <div className="box"><button onClick={this.handleClick} className="closeButton">X</button>{this.props.children}</div>
    }
}

class CreateUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state= {show: false, username: "", created: ""};
        this.handleClick = this.handleClick.bind(this);
        this.createUserClick = this.createUserClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    async createUserClick(){
        //create comment on city chatt
        await fetch("/users/"+this.state.username, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
        })
            .then((response) => response.json()).then(data => {
                console.log(data);
                this.setState({created: data.username});
        });
    }

    handleClick(){
        this.state.show = !this.state.show;
        this.setState({show: this.state.show});
    }

    handleOnChange(event){
        console.log(event.target.value);
        this.setState({username: event.target.value});
    }

    render() { 
        if(this.state.show){
        return <div><button onClick={this.handleClick}>Skapa användare</button>
            <DialogBox>
                <h1>Skapa användare</h1>
                <label>Användarnamn</label>
                <input type="text" onChange={this.handleOnChange}></input>
                <input type="button" value="Skapa användare" onClick={this.createUserClick}></input>
                <div>Skapade användare: {this.state.created}</div>
            </DialogBox>
            </div>
        }else{
            return <div><button onClick={this.handleClick}>Skapa användare</button></div>
        }
    }
}
 
class LoginUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state= {show: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.state.show = !this.state.show;
        this.setState({show: this.state.show});
    }

    render() { 
        if(this.state.show){
        return <div><button onClick={this.handleClick}>Logga in</button>
            <DialogBox>
                <h1>Logga in</h1>
                <label>Användarnamn</label>
                <input type="text"></input>
                <input type="button" value="Logga in"></input>
            </DialogBox>
            </div>
        }else{
            return <div><button onClick={this.handleClick}>Logga in</button></div>
        }
    }
}