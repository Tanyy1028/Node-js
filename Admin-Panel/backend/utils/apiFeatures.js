export class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    if (this.queryStr.search) {
      this.query = this.query.find({
        name: { $regex: this.queryStr.search, $options: "i" }
      });
    }
    return this;
  }

  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}