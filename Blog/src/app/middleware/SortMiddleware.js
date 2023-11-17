module.exports = function SortMiddleware(req, res, next) {
  //sử dụng biến local để render được lên view
  res.locals._sort = {
    enable: "false",
    type: "default",
    column :""
  };

  if (req.query.hasOwnProperty("_sort")) {
    res.locals._sort.enable ='true',
    res.locals._sort.type = req.query.type,
    res.locals._sort.column = req.query.column;

    //tương đương code phía trên
    // Object.assign(res.locals._sort, {
    //   enable: true,
    //   type: req.query.type,
    //   column: req.query.column,
    // });
  }

  next();
};
