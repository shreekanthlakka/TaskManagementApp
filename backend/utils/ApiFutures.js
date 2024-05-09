class ApiFutures {
    constructor(query, querySearch) {
        this.query = query;
        this.querySearch = querySearch;
    }
    filter() {
        const queryObj = { ...this.querySearch };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((ele) => delete queryObj[ele]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.querySearch.sort) {
            const sortBy = this.querySearch.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    fields() {
        if (this.querySearch.fields) {
            const fields = this.querySearch.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }
        return this;
    }
    paginate() {
        const page = this.querySearch.page * 1 || 1;
        const limit = this.querySearch.limit * 1 || 20;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

export default ApiFutures;
