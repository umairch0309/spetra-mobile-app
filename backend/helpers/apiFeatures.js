const { isBefore, isSameDay, isAfter, addHours, subDays } = require("date-fns");
const formatDate = require("date-fns/format");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  searchOne() {
    let queryString = { ...this.queryString };

    let searchValue = queryString.keywordOne;

    if (
      [null, "null", undefined, "undefined", Infinity, "Infinity", ""].includes(
        searchValue
      )
    ) {
      this.query = this.query
        .find({ status: "active" })
        .sort([["updatedAt", "descending"]]);
    } else {
      this.query = this.query
        .find({
          status: "active",
          $or: [
            { practices: searchValue },
            { "speciality.name": searchValue },
            { name: searchValue },
          ],
        })
        .sort([["updatedAt", "descending"]]);
    }

    return this;
  }

  searchTwo() {
    let queryString = { ...this.queryString };

    let searchValue = queryString.keywordTwo;

    if (
      [null, "null", undefined, "undefined", Infinity, "Infinity", ""].includes(
        searchValue
      )
    ) {
      this.query = this.query
        .find({ status: "active" })
        .sort([["updatedAt", "descending"]]);
    } else {
      this.query = this.query
        .find({
          status: "active",
          $or: [
            { "location.city": searchValue },
            { "location.state": searchValue },
          ],
        })
        .sort([["updatedAt", "descending"]]);
    }

    return this;
  }

  videoFilter() {
    const queryCopy = { ...this.queryString };

    if (
      [null, "null", undefined, "undefined", false, "false", ""].includes(
        queryCopy.provideVideo
      )
    ) {
      this.query = this.query
        .find({ status: "active" })
        .sort([["updatedAt", "descending"]]);
    } else {
      this.query = this.query
        .find({ isVideo: true, status: "active" })
        .sort([["updatedAt", "descending"]]);
    }

    return this;
  }

  dateFilter() {
    const queryCopy = { ...this.queryString };

    if (
      ["null", undefined, "undefined", "null", ""].includes(
        queryCopy.availability
      )
    ) {
      this.query = this.query
        .find({ status: "active" })
        .sort([["updatedAt", "descending"]]);
    } else {
      // Filter Day
      const filterDate = addHours(new Date(queryCopy.availability), 3);
      const filterDay = formatDate(filterDate, "ccc");

      // Filter Today
      const todayDate = addHours(new Date(), 3);
      const today = formatDate(todayDate, "ccc");

      const maxTodayQueryDate = new Date(queryCopy.availability);
      const minTodayQueryDate = new Date(queryCopy.availability);
      maxTodayQueryDate.setHours(0, 0, 0, 0);
      minTodayQueryDate.setHours(23, 59, 59, 0);

      const provideVideo =
        queryCopy.provideVideo == true
          ? "videoTimeSlot.start"
          : "physicalTimeSlot.start";

      this.query = this.query
        .find({
          status: "active",
          [provideVideo]:
            today === filterDay
              ? {
                  $lt: minTodayQueryDate.toISOString(),
                  $gte: maxTodayQueryDate.toISOString(),
                }
              : {
                  $lte: new Date(queryCopy.availability).toISOString(),
                  $gt: new Date().toISOString(),
                },
        })
        .sort([["updatedAt", "descending"]]);
    }

    return this;
  }

  count() {
    const queryCopy = { ...this.queryString };

    this.query = this.query
      .limit(Number(queryCopy.count))
      .sort([["updatedAt", "descending"]]);
    return this;
  }

  dashboardCounts() {
    const queryCopy = { ...this.queryString };

    this.query = this.query.limit(Number(queryCopy.count));

    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query
      .limit(resPerPage)
      .skip(skip)
      .sort([["updatedAt", "descending"]]);

    return this;
  }
}

module.exports = APIFeatures;
