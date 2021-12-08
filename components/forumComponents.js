class Container extends React.Component {
    render() { 
        return <div className="container">
            <Post />
            <Post />
            <AnswerButton />
            <CreateUser />
            <LoginUser />
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
                    <AnswerButton />
                </div>
            </div>
            
        </div>
    }
}

class AnswerButton extends React.Component {
    render() { 
        return <div className="answerButton"><button>Citera</button></div>;
    }
}
class Answer extends React.Component {
    render() { 
        return <div></div>;
    }
}

class Stuf extends React.Component {
    render() { 
        return <div></div>;
    }
}