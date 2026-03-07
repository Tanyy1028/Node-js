/**
 * API Features class for database queries
 * Handles search, filter, sort, and pagination
 */
export class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  /**
   * Search functionality - searches across multiple fields
   */
  search() {
    if (this.queryStr.search) {
      const searchRegex = { $regex: this.queryStr.search, $options: "i" };
      this.query = this.query.find({
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { description: searchRegex },
        ],
      });
    }
    return this;
  }

  /**
   * Filter functionality - handles exact and range filters
   */
  filter() {
    // Make a copy of queryStr to avoid modifying the original
    const queryObj = { ...this.queryStr };

    // Remove special query parameters
    const excludedFields = ["page", "sort", "limit", "search", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Handle advanced operators ($gte, $gt, $lte, $lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    this.filteredCount = this.query;

    return this;
  }

  /**
   * Sort functionality - sorts results by specified field
   */
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // Default sort by createdAt descending
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  /**
   * Pagination functionality
   */
  paginate() {
    const page = parseInt(this.queryStr.page) || 1;
    const limit = parseInt(this.queryStr.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  /**
   * Limit fields to return
   */
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }

  /**
   * Get filtered count (for pagination metadata)
   */
  getFilteredCount() {
    return this.queryStr.search || Object.keys(this.queryStr).length > 0
      ? this.filteredCount || 0
      : 0;
  }
}

