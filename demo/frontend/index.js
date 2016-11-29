import React, { Component } from 'react';

export default class Button extends Component {
  render () {
    const {
      type,
      text,
      onClick,
    } = this.props;

    return (
      <button type={type} onClick={onClick}>
        {text}
      </button>
    );
  }
}

Button.defaultProps = {
  type: 'submit',
  text: 'Submit',
  onClick: () => {},
};

// ---------------------------------------------------

import React, { Component } from 'react';
import Button from '@private/button';

export default class Header extends Component {
  render () {
    return (
      <header>
        <Button
          type="button"
          onClick={this.props.signIn}
          text="Sign In"
        />
      </header>
    );
  }
}


// ---------------------------------------------------

import React, { Component } from 'react';
import Button from '@private/button';

export default class Form extends Component {
  render () {
    return (
      <form action="/users" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="user_name" />

        <Button />
      </form>
    );
  }
}
