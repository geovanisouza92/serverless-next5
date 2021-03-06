import React from "react";
import Router from "next/router";

export default class extends React.Component {
  static getInitialProps() {
    return {
      photos: new Array(15).map((v, i) => i + 1)
    };
  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(event) {
    if (!this.props.url.query.photoId) {
      return;
    }

    if (e.keyCode === 27) {
      this.props.url.back();
    }
  }

  dismissModal() {
    Router.push("/");
  }

  showPhoto(event, id) {
    e.preventDefault();
    Router.push(`/?photoId=${id}`, `/?photoId=${id}`);
  }

  render() {
    const { url, photos } = this.props;

    return (
      <div className="list">
        {url.query.photoId && (
          <Modal id={url.query.photoId} onDismiss={() => this.dismissModal()} />
        )}
        {photos.map((id, i) => (
          <div key={i} className="photo">
            <a
              className="photoLink"
              href={`/photo?id=${id}`}
              onClick={e => this.showPhoto(e, id)}
            >
              {id}
            </a>
          </div>
        ))}
        <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .photo {
            display: inline-block;
          }

          .photoLink {
            color: #333;
            verticalalign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 250px;
            line-height: 250px;
            margin: 10px;
            border: 2px solid transparent;
          }

          .photoLink:hover {
            bordercolor: blue;
          }
        `}</style>
      </div>
    );
  }
}
