// CustomToast.js

import React from "react";

const CustomToast = ({ accept,user }) => (
  <div>
    <p>{user} sent you a request</p>
    <button onClick={accept}>Accept</button>
    <button onClick={accept}>Decline</button>
  </div>
);

export default CustomToast;
