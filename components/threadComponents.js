class ForumThreads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        ReactDOM.render(<Container type="Forum" />, document.getElementById("content"));
    }

    render() { 
        return <div>
            <div className="head"><CreateThread /><div>Sök: <input type="text"></input></div></div>
            <table>
                <thead>
                <tr>
                    <th>Rubrik</th><th>Kategori</th><th>Inlägg</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.data.map(tag => <tr key={tag.id}>
                        <td onClick={this.handleClick}>{tag.topic}</td><td>{tag.category}</td><td>{tag.lastPost}</td><td>{tag.user}</td>
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
    }

    async createThread(){
        //create comment on city chatt
        await fetch("/comments/"+this.props.name, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json()).then(data => {
            this.componentDidMount();
            this.handleClick();
            this.handleClick();
        });
    }

    handleClick(){
        this.createThread();
    }

    render() { 
        return <div className="box">
            <h1>Skapa ny tråd</h1>
            <label>Rubrik</label>
            <input type="text" name="topic" />
            <label>Kategori</label>
            <input type="text" name="category" />
            <label>Inlägg</label>
            <textarea name="content" />
            <input type="submit" value="Skapa tråd" onClick={this.handleClick}/>
        </div>
    }
}
