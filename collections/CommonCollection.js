class CommonCollection {
  constructor(props) {
    this.model = props.model;
  }

  getTotalCount() {
    return new Promise((resolve, reject) => {
      this.model.count({}, (err, totalCount)=>{
        if(err) {
          reject(err);
        } else {
          resolve(totalCount);
       }
      });
    });
  }

  async getListByPage(pagination) {
    const totalCount = await this.getTotalCount();

    return new Promise((resolve, reject) => {
      const pageNum = Math.ceil(totalCount / pagination.pageSize);
      this.model.find({}).skip(pagination.skipSize).limit(pagination.pageSize).exec((err, pageContents) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            pageContents: pageContents,
            pageNum: pageNum
          });
        }
      });
    });
  }

  // getListByPage(pagination) {
  //   return new Promise((resolve, reject) => {
  //     this.getTotalCount()
  //       .then((totalCount) => {
  //         const pageNum = Math.ceil(totalCount / pagination.pageSize);
  //         this.model.find({}).skip(pagination.skipSize).limit(pagination.pageSize).exec((err, pageContents) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve({
  //               pageContents: pageContents,
  //               pageNum: pageNum
  //             });
  //           }
  //         });
  //       });
  //   });
  // }

  // getList(){
  //   this.getTotalCount();
  // }
}

module.exports = CommonCollection;