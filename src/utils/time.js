import moment from "moment";

export const getYM = () => {
  return moment(new Date()).format("YYYYMM")
}

export const changeYYYYMMDD = (date) => {
  return moment(date).format("YYYY년 MM월 DD일")
}