class Container extends React.Component {
    render() { 
        return <div className="container">
            <Post />
            <Post />
            <AnswerButton value="Skriv svar" />
        </div>;
    }
}

class Post extends React.Component {
    render() { 
        return <div className="post">
            <div className="postHead">Datum: 2021-12-0 18:11</div>
            <div className="postContent">
                <div className="postInfo">Användarinfo</div>
                <div className="postComment">
                    <div className="postMessage">Message</div>
                    <AnswerButton value="Citera" content="Detta är meddelandet att citera"/>
                </div>
            </div>
        </div>
    }
}

class AnswerButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.state.show = !this.state.show;
        this.setState({show: this.state.show});
    }

    render() { 
        if(this.state.show){
            return(
            <div className="createPost">
                <textarea type="text"onChange={this.handleOnChange}></textarea>
                <button>Svara</button>
            </div>
            )
        }else{
            return <div className="answerButton"><button onClick={this.handleClick}>{this.props.value}</button></div>
        }
        
    }
}

class Answer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() { 
        return <div>
            <textarea></textarea>
        </div>;
    }
}

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: "Skriv ett svar"}
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleClick(){

    }

    handleOnChange(event){
        this.state({value: event.target.value});
    }


    render() { 
        return <div className="createPost">
            <textarea onChange={this.handleOnChange} placeholder={this.state.content}></textarea>
            <button onClick={this.handleClick}>Svara</button>
        </div>;
    }
}
 
class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: "Skriv ett svar"}
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleClick(){

    }

    handleOnChange(event){
        this.state({value: event.target.value});
    }
    render() { 
        return <div className="createPost">
            <textarea onChange={this.handleOnChange} placeholder={this.state.content}></textarea>
            <button onClick={this.handleClick}>Svara</button>
        </div>;
    }
}

class Stuf extends React.Component {
    render() { 
        return <div></div>;
    }
}