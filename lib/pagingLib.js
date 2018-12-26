const pagingLib = {
  /**
   *
   * @param page
   * @param [pageSize]
   * @returns {{page: *, skipSize: number, pageSize: *, pageNum: number}}
   */
  getPagination(page, pageSize){
    pageSize = pageSize || 10;
    let skipSize = (page - 1) * pageSize;
    let pageNum = 1;

    return {
      page,
      skipSize,
      pageSize,
      pageNum
    };
  }
};

module.exports = pagingLib;