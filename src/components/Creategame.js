import React from "react";

class CreateGame extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      manufacturer: "",
      category: "",
      image_url: "",
      wishlist: false,
      owned: false,
      favorite: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleToggle = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onCreateGame(this.state);
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>ImageUrl</label>
            <input
              type="text"
              name="image_url"
              value={this.state.image_url}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={this.state.manufacturer}
              onChange={this.handleChange}
            />
          </div>
          <label>
            <input
              type="checkbox"
              name="owned"
              value={this.state.owned}
              onClick={this.handleToggle}
            />
            Owned{" "}
          </label>
          <label>
            <input
              type="checkbox"
              name="wishlist"
              value={this.state.wishlist}
              onClick={this.handleToggle}
            />
            Wishlist{" "}
          </label>
          <label>
            <input
              type="checkbox"
              name="favorite"
              value={this.state.favorite}
              onClick={this.handleToggle}
            />
            Favorite{" "}
          </label>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateGame;
