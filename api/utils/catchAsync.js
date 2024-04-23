const catchAsync = function (fn) {
  return function (req, res, next) {
    // orignal fn is async, so calling it returns a promise. thats why we can have a .catch()
    fn(req, res, next).catch((e) => next(e));
  };
};

export default catchAsync;
