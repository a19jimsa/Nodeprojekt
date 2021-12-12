class ForumThreads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        //create comment on city chatt
        await fetch("/threads/", {
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        })
            .then((response) => response.json()).then(data => {
                console.log(data);
                this.setState({data: data});
        });
    }

    handleClick(id){
        ReactDOM.render(<Container type="Forum" id={id}/>, document.getElementById("content"));
    }

    render() { 
        return <div>
            <div className="head"><CreateThread /><div>Sök: <input type="text"></input></div></div>
            <table>
                <thead>
                <tr>
                    <th>Rubrik</th><th>Kategori</th><th>Senaste inlägg</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.data.map(tag => <tr key={tag.id}>
                        <td onClick={this.handleClick.bind(this, tag.id)}>{tag.topic}</td><td>{tag.category}</td><td>{tag.content} av {tag.user}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    }
}

class CreateThread extends React.Component {
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
            return <div>
                <button onClick={this.handleClick} name="createThread">Skapa ny tråd</button>
                <ThreadForm />
            </div>
        }else{
            return(
            <div>
                <button onClick={this.handleClick} name="createThread">Skapa ny tråd</button>
            </div>
            )
        }
    }
}

class ThreadForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    async createThread(){
        const data = {
            "topic": this.state.topic,
            "category": this.state.category,
            "content": this.state.content,
            "user": "Jimmy",
            "posted": Date.now().toLocaleString()
        }

        //Create thread
        await fetch("/threads/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json()).then(data => {
                console.log(data);
        });

        //Create thread comment on comments
        await fetch("/comments/1", {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json()).then(data => {
                console.log(data);
        });
    }

    handleClick(){
        this.createThread();
    }

    handleOnChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
        [name]: value
        });
        console.log(name+" " +value);

    }

    render() { 
        return <div className="box">
            <h1>Skapa ny tråd</h1>
            <label>Rubrik</label>
            <input type="text" name="topic" onChange={this.handleOnChange}/>
            <label>Kategori</label>
            <input type="text" name="category" onChange={this.handleOnChange}/>
            <label>Inlägg</label>
            <textarea name="content" onChange={this.handleOnChange}/>
            <input type="submit" value="Skapa tråd" onClick={this.handleClick}/>
        </div>
    }
}
