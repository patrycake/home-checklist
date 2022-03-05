import React from "react";

function Card() {
  return (
    <div className="container block">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box notification is-info">
            <p className="title">Hello World</p>
            <p className="subtitle">What is up?</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box notification is-info">
            <p className="title">Foo</p>
            <p className="subtitle">Bar</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box notification is-info">
            <p className="title">Third column</p>
            <p className="subtitle">With some content</p>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Card;
