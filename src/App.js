import React, { Component } from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import "./App.css";

class App extends Component {
    state = {
        advice: "",
        bookmarks: [],
    };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        axios
            .get("https://api.quotable.io/random")
            .then((response) => {
                const { content } = response.data;

                this.setState({ advice: content });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    bookmarkAdvice = () => {
        const { advice, bookmarks } = this.state;
        if (advice) {
            const updatedBookmarks = [...bookmarks, advice];
            this.setState({ bookmarks: updatedBookmarks });
        }
    };

    render() {
        return (
            <div className="app">
                <div className="card">
                    <FontAwesomeIcon icon={faBookmark} className="bookmark-btn" onClick={this.bookmarkAdvice} />
                    <h1 className="heading">{this.state.advice}</h1>
                </div>
                <div>
                <button className="button" onClick={this.fetchAdvice}>
                        <span>Next Quote</span>
                    </button>
                </div>
                <div className="bookmarks">
                    <h2>Bookmarked Quotes:</h2>
                    <ul>
                        {this.state.bookmarks.map((quote, index) => (
                            <li key={index}>{quote}</li>
                        ))}
                    </ul>
                </div>
                
            </div>
        );
    }
}

export default App;
