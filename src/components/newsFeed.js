import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";


class NewsFeed extends Component {

    constructor(){
        super();
        this.state = {
            feeds: []
        }
    }

    async componentDidMount(){
        await this.props.getFeeds();
        this.setState({
            feeds: this.props.feeds
        });
    }

    viewMoreArticles = (index) => {
        const myFeeds = this.state.feeds;
        myFeeds[index].showX = 6;
        this.setState({
            feeds: myFeeds
        });
    }

    render(){
        return(
            <div>
                <hr/>
                <div className="news-wrapper">
                    {   this.state.feeds.map((f, fi) => {
                        const {title, data} = f;
                        return(
                            <div className="news-wrapper__feed-wrapper" key={fi}>
                                <h3>{title}</h3>
                                {   (data && data.articles && data.articles.length > 0) ?
                                    <ul>
                                        {
                                            data.articles && data.articles.slice(0, (f.showX ? f.showX : 3)).map((a, i) => {
                                                const {author, url, content, urlToImage} = a;
                                                const articleTitle = a.title;
                                                return(
                                                    <li key={i} onClick={() => window.location = url}>
                                                        <div className="article-img-wrapper">
                                                            <img src={urlToImage} />
                                                        </div>
                                                        <div className="article-body">
                                                            <h3 href={url}>{articleTitle}</h3>
                                                            <p>{author} - {content && content.split("[+")[0]}</p>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                        {   f.showX != 6 &&
                                            <li className="view-more">
                                                <div>
                                                    <button onClick={() => this.viewMoreArticles(fi)}>
                                                        View More Articles
                                                    </button>
                                                </div>
                                            </li>
                                        }
                                    </ul>
                                    :
                                    <div>
                                        <h3>Sorry, there are no articles available at this time.</h3>
                                    </div>
                                }
                          
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        feeds: state.news.streams
    }
}

export default connect(mapStateToProps, actions)(NewsFeed);