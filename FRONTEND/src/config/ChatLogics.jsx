export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };

  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };
  
  export const isSameSender = (messages, m, i, userId) => { //mere 2 message ke bich me samne se aye hue jitne message hai unme last message hai ki nhi 
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;//kya abhi vala message bhi pichle vale message ke user ne bheja hai
  };
  
  
  export const isLastMessage = (messages, i, userId) => { //ye check kr rha hai puri message array ka last message + samne se aya ho
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };