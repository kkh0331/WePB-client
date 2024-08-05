import instance from "./base";

export const getSchedulesByYM = (id, ym) => {
	// YYYYMM을 전송하면 해당 월에 해당하는 schedules을 받아온다.
	try {
    // const res = instance.post("/api/schedules", {
    //   id : id,
    //   ym : ym
    // })
    // return res.data;
    console.log(`${id}와 ${ym}으로 schedules 조회`)
    return [];
	} catch(error) {
    console.error(`[getSchedulesByYM Error] ${error}`)
    return [];
  }
};