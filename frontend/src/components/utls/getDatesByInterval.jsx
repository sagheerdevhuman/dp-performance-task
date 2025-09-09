import moment from "moment";


export function getDatesByInterval(value,getDateBy) {
    var list = [];
    var startDate = moment(value.startDate)
    var endDate = moment(value.endDate)
    endDate.subtract(1, getDateBy ); //Substract one month to exclude endDate itself

    var interval = moment(startDate); //clone the startDate
    while( interval < endDate ) {
        interval.add(1, getDateBy );
        list.push(interval.format('YYYY-MM-DD'));
    }
    return list
  }