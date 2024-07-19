// CustomToast.js

import React from "react";

const CustomToast = ({ accept }) => (
  <div>
    <p>User sent you a request</p>
    <button onClick={accept}>Accept</button>
  </div>
);

export default CustomToast;
