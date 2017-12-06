import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

class GamesCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false,
      clicked: false,
      owned: false,
      favorite: false,
      wishlist: false,
      lent: false,
      borrowed: false,
      removeOption: "",
      removeMessage: "Add to Collection",
      buttonIcon: "add",
      heartIcon: "",
      bookmarkIcon: "",
      wishRibbon: "",
      likeRibbon: ""
    };

    let game = this.props.game.game.id;
    let userGames = this.props.user.user_games;

    if (userGames) {
      userGames.map(userGame => {
        if (userGame.game.id === game) {
          this.state = {
            added: false,
            clicked: false,
            owned: userGame.info.owned,
            favorite: userGame.info.favorite,
            wishlist: userGame.info.wishlist,
            lent: userGame.info.lent,
            borrowed: userGame.info.borrowed,
            removeOption: "",
            removeMessage: "Add to Collection",
            buttonIcon: "add",
            heartIcon: "",
            bookmarkIcon: "",
            wishRibbon: "",
            likeRibbon: ""
          };
        }
      });
    }
  }

  handleBooleanStates = () => {
    let game = this.props.game.game.id;
    let userGames = this.props.user.user_games;

    if (!!userGames) {
      userGames.map(userGame => {
        if (userGame.game.id === game) {
          this.setState(
            {
              owned: userGame.info.owned,
              favorite: userGame.info.favorite,
              wishlist: userGame.info.wishlist,
              lent: userGame.info.lent,
              borrowed: userGame.info.borrowed
            },
            this.updateButton()
          );
        }
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    this.handleBooleanStates();
    // window.location.reload();
  };

  handleClick = e => {
    const newState = !this.state.clicked;
    this.setState({
      clicked: newState
    });
  };

  handleAddToCollection = e => {
    if (this.state.removeOption === "negative") {
      this.removeFromCollection();
    } else {
      this.props.onAddGame(this.props.game);
      this.setState({ added: true, bookmarkIcon: "" });
    }
  };

  removeFromCollection = () => {
    this.props.onRemoveGame(this.props.game);
    this.setState({
      added: false,
      removeOption: "",
      removeMessage: "Add to Collection",
      buttonIcon: "add"
    });
  };

  handleLike = e => {
    let body = {
      attribute: "favorite",
      user: this.props.user.user_info.id,
      game: this.props.game.game.id
    };
    if (this.state.heartIcon === "red") {
      this.setState({
        heartIcon: "",
        likeRibbon: ""
      });
    }
    if (this.state.heartIcon === "") {
      this.setState({
        heartIcon: "red",
        likeRibbon: "ui red top right attached label"
      });
    }

    this.sendToPost(body);
  };

  handleWish = e => {
    let body = {
      attribute: "wishlist",
      user: this.props.user.user_info.id,
      game: this.props.game.game.id
    };
    if (this.state.bookmarkIcon === "yellow") {
      this.setState({
        bookmarkIcon: "",
        wishRibbon: ""
      });
    }
    if (this.state.bookmarkIcon === "") {
      this.setState({
        bookmarkIcon: "yellow",
        wishRibbon: "ui yellow bottom left attached label"
      });
    }
    this.sendToPost(body);
  };

  sendToPost = body => {
    this.props.attributePost(body);
  };

  redirectToShow = () => {
    this.props.history.push(`/boardgame/${this.props.game.game.slug}`);
  };

  componentDidMount = () => {
    this.handleBooleanStates();
  };

  updateButton = () => {
    if (this.state.owned === true) {
      this.setState({
        removeOption: "negative",
        removeMessage: "Remove",
        buttonIcon: "minus"
      });
    }

    if (this.state.favorite === true) {
      this.setState({
        heartIcon: "red",
        likeRibbon: "ui red top right attached label"
      });
    }

    if (this.state.wishlist === true) {
      this.setState({
        bookmarkIcon: "yellow",
        wishRibbon: "ui yellow bottom left attached label"
      });
    }

    if (this.state.owned === true) {
      this.setState({
        bookmarkIcon: "",
        wishRibbon: ""
      });
    }
  };

  render() {
    console.log(this.props.game.game.image_url);
    return (
      <div id="card">
        <div className="ui centered card">
          {this.state.clicked ? (
            <div className="content fluid">
              <div className="header">
                <a onClick={this.redirectToShow}>{this.props.game.game.name}</a>
              </div>
              <i
                className={`right floated like icon ${this.state.heartIcon}`}
                onClick={this.handleLike.bind(this)}
              />
              <i
                className={`right floated bookmark icon ${
                  this.state.bookmarkIcon
                }`}
                onClick={this.handleWish.bind(this)}
              />
              <div className="left floated meta">
                <a onClick={this.redirectToShow} className="meta">
                  Click for more info...
                </a>
              </div>

              <div
                className="extra content"
                onClick={this.handleClick.bind(this)}
              >
                <div className=" centered description">
                  {" "}
                  <br />
                  <br />
                  <p>{this.props.game.game.description.slice(0, 400)}...</p>
                  <p />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="ui centered content fluid image"
              onClick={this.handleClick.bind(this)}
            >
              <img
                src={
                  this.props.game.game.image_url
                    ? this.props.game.game.image_url
                    : "http://bottegarotolo.com.au/plugins/woocommerce/assets/images/placeholder.png"
                }
              />
            </div>
          )}
          {this.state.added ? (
            <div className="extra content">
              <div className="ui positive bottom attached button">
                <i className="checkmark icon" />
                Added to collection
              </div>
            </div>
          ) : (
            <div className="extra content">
              {this.state.likeRibbon === "ui red top right attached label" ? (
                <div className={this.state.likeRibbon}>
                  <span>Favorite</span>
                </div>
              ) : null}
              <div
                onClick={this.handleAddToCollection}
                className={`ui bottom attached button ${
                  this.state.removeOption
                }`}
              >
                <i className={`${this.state.buttonIcon} icon`} />
                {this.state.removeMessage}
              </div>
              {this.state.wishRibbon ===
              "ui yellow bottom left attached label" ? (
                <div className={this.state.wishRibbon}>
                  <span>Wishlist</span>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(GamesCard);
