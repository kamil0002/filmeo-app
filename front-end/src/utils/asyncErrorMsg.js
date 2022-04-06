export default (funcSuccess, funcError, msg, time = 5) => {
  funcError(msg);
  setTimeout(() => {
    funcError(null);
    if (funcSuccess) funcSuccess(null);
  }, time * 1000);
};
