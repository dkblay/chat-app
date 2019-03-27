import React from "react";
import classNames from "classnames";

const User = ({ user, activeUser, onClick }) => {
  const css = classNames("chat__user", {
    "chat__user--active": user.id === activeUser.id
  });
  return (
    <div onClick={() => onClick(user)} className={css}>
      {user.name}
    </div>
  );
};

export default User;
