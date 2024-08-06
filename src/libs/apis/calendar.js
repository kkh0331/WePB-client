import instance from "./base";

export const getDays = async (id, year, month, role) => {
	// console.log({id, year, month, role})
  try {
    const res = await instance.post("/calendar", {
      id, year, month, role
    })
    console.log(res.data);
    return res.data;
	} catch(error) {
    console.log(error)
  }
};