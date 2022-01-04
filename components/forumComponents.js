class Menu extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        const value = event.target.value;
        ReactDOM.render(<Container type={value}/>, document.getElementById("content"));
    }

    render() { 
        return(
        <div className="menu">        
            <nav>
                <ul>
                    <button onClick={this.handleClick} value="Forum">Forum</button>
                    <button onClick={this.handleClick} value="Trådar">Trådar</button>
                </ul>
            </nav>
        </div>
        )
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: ""}
    }

    render() {
        if(this.props.type == "Forum"){
            return <div className="container">
            <Post id={this.props.id} />
            </div>
        }else{
            return <div className="container">
            <ForumThreads />
            </div>
        }
    }
}

class Breadcrums extends React.Component {
    //Hämta category och lägg till som breadcrum
    render() { 
        return <div className="breadcrums">Trådar</div>;
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], show: false, placeholder: "Skriv ett svar", content: ""}
        this.handleClick = this.handleClick.bind(this);
        this.handleShowClick = this.handleShowClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    async componentDidMount(){
        //GET all comments on specific thread
        await fetch("/comments/"+this.props.id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        })
            .then((response) => response.json()).then(data => {
                console.log(data);
                this.setState({data: data});
        });
    }

    async createAnswer(){
        const date = new Date();
        const datetime = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const data = {
            "id": this.props.id,
            "content": this.state.content,
            "posted": datetime,
            "user": "Jimmy"
        }

        await fetch("/comments/"+this.props.id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json()).then(data => {
                this.componentDidMount();
                this.setState({content: ""})
        });
    }

    handleShowClick(message){
        console.log(message);
        if(message != ""){
            message = "[quote]"+message+"[/quote]";
        }
        
        this.state.show = !this.state.show;
        this.setState({show: this.state.show, content: message});
    }

    handleClick(){
        this.handleShowClick();
        this.createAnswer();
    }

    handleOnChange(event){
        this.setState({content: event.target.value});
    }

    render() { 
        return <div>
            <div className="threadhead"><Breadcrums /><div>Sök i tråd: <input type="text"></input></div></div>
            {this.state.data.map(tag=><div key={tag._id} className="post">
                <h1>{tag.topic}</h1>
                <div className="postHead">Datum: {tag.posted}</div>
                <div className="postContent">
                    <div className="postInfo">Användare: {tag.user}</div>
                    <div className="postComment">
                        <div className="postMessage"><Quote content={tag.content} /></div>
                        <div className="quoterow">
                            <button onClick={this.handleShowClick.bind(this, tag.content)}>Citera</button>
                        </div>
                    </div>
                </div>
            </div>)}
            {this.state.show ? <div className="createPost">
            <textarea onChange={this.handleOnChange} placeholder={this.state.placeholder} value={this.state.content}></textarea>
            <button onClick={this.handleClick}>Skicka svar</button>
        </div> : <button onClick={this.handleShowClick.bind(this, "")}>Skriv Svar</button>}
        </div>
    }
}

class Quote extends React.Component {
    constructor(props){
        super(props);
        this.state = {content: ""}
    }

    async componentDidMount(){
        var content = this.props.content;
        console.log(content);
        if(content.includes("[quote]")){
            content = content.replaceAll("[quote]", "<div class='quote'>");
            content = content.replaceAll("[/quote]", "</div>");
        }
        this.setState({content: content});
    }

    render() { 
        return <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
    }
}