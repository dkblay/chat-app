import React, { Component } from "react";
import User from "./components/User";
import ChatBox from "./components/ChatBox";

class App extends Component {
  chatContainer = React.createRef();

  state = {
    activeUser: undefined,
    users: [
      {
        id: 1,
        name: "Evan Charlton",
        messages: []
      },
      {
        id: 2,
        name: "Boning ZHANG",
        messages: []
      },
      {
        id: 3,
        name: "Cognite Group",
        messages: []
      }
    ],
    cache: {},
    isTyping: false
  };

  scroll = () => {
    const { current } = this.chatContainer;
    const shouldAutoScroll =
      current.scrollTop + current.clientHeight >= current.clientHeight;

    if (shouldAutoScroll) {
      current.scrollTop = current.scrollHeight;
    }
  };

  setActiveUser = activeUser => {
    this.setState(
      {
        activeUser,
        isTyping: false
      },
      () => this.scroll()
    );
  };

  sendMessage = message => {
    const { activeUser, users } = this.state;
    const index = users.findIndex(u => u.id === activeUser.id);
    const found = users[index];
    const messages = [...found.messages, message];
    const updatedUsers = [
      ...users.slice(0, index),
      { ...found, messages },
      ...users.slice(index + 1)
    ];
    this.setState(
      {
        users: updatedUsers
      },
      () => this.scroll()
    );
  };

  updateDraft = (text = "") => {
    const { activeUser } = this.state;
    const cache = {
      ...this.state.cache,
      ...{ [activeUser.id]: text }
    };
    this.setState({ cache, isTyping: true });
  };

  renderUsers = () => {
    const { activeUser = {} } = this.state;
    return this.state.users.map(user => (
      <User
        onClick={this.setActiveUser}
        key={user.id}
        activeUser={activeUser}
        user={user}
      />
    ));
  };

  renderMessages = () => {
    const { activeUser, users } = this.state;
    if (!activeUser) {
      return;
    }
    return users
      .find(u => u.id === activeUser.id)
      .messages.map((message, index) => (
        <div className="chat__content" key={index}>
          <div className="chat__message">{message}</div>
        </div>
      ));
  };

  render() {
    const { activeUser, cache, isTyping } = this.state;
    let activeCache;
    if (activeUser) {
      activeCache = cache[activeUser.id] || "";
    }
    return (
      <div className="chat">
        <div className="chat__users">{this.renderUsers()}</div>
        <div className="chat__area">
          <div className="chat__wrapper">
            <div ref={this.chatContainer} className="chat__container">
              {this.renderMessages()}
            </div>
          </div>
          {activeUser ? (
            <ChatBox
              onMessage={this.sendMessage}
              onKey={this.updateDraft}
              cache={activeCache}
              isTyping={isTyping}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
