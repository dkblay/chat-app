import React, { Component } from "react";

class ChatBox extends Component {
  chatInput = React.createRef();

  onInput = event => {
    const { target } = event;
    const trimmed = target.innerText.trim();
    if (trimmed === "") {
      target.innerText = trimmed;
      return;
    }
    if (/[\n\r]/.test(target.innerText)) {
      target.innerText = target.innerText.trim();
    }
    this.content = target.innerText;
    this.props.onKey(target.innerText);
  };

  sendMessage = event => {
    const content = event.target.innerText;
    if (content === "") {
      return;
    }
    if (event.which === 13 || event.keyCode === 13) {
      this.props.onMessage(content);
      event.target.innerText = "";
      this.props.onKey("");
    }
  };

  componentDidUpdate() {
    if (!this.props.isTyping) {
      this.chatInput.current.innerText = this.props.cache;
    }
  }

  render() {
    return (
      <div className="chat__footer">
        <div className="footer">
          <div
            ref={this.chatInput}
            contentEditable="true"
            onInput={this.onInput}
            onKeyUp={this.sendMessage}
            className="footer__input"
          />
        </div>
      </div>
    );
  }
}

export default ChatBox;
