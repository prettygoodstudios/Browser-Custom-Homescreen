import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";


class NewsFeed extends Component {

    componentDidMount(){
        this.props.getStreams();
    }

    render(){
        return(
            <div>
                <hr/>
                <div className="news-wrapper">
                    {   this.props.feeds.map((f) => {
                        const {title, data} = f;
                        return(
                            <div className="news-wrapper__feed-wrapper">
                                <h3>{title}</h3>
                                {   (data.articles && data.articles.length > 0) ?
                                    <ul>
                                        {
                                            data.articles && data.articles.splice(0, 3).map((a, i) => {
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
                                        <li className="view-more">
                                            <div>
                                                <button>
                                                    View More Articles
                                                </button>
                                            </div>
                                        </li>
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