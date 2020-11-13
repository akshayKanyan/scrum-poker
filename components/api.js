import axios from "axios";

const get = () => {};

const post = () => {};

const put = () => {};

const getAll = (args) => {
  Promise.all([getUserAccount(), getUserPermissions()]).then(function (
    results
  ) {
    const acct = results[0];
    const perm = results[1];
  });
};


} 
