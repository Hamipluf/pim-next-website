import React from "react";
import axios from "axios";

function index() {
  const medicData = async () => {
    axios
      .get("/api/get-all")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  medicData()
  return <div>index</div>;
}

export default index;
