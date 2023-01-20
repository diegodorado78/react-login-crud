import axios from "axios";

const baseUrl = "https://ops.enerbit.dev/learning/api/v1/meters";

const getAll = async (pageIndex) => {
 const { data } = await axios.get(`${baseUrl}?page=${pageIndex}&size=10`)
 return data;
};
const getAllNumber = async () => {
 const { data } = await axios.get(`${baseUrl}`)
 return data;
};
const getBySerial = async (serial) => {
 const { data } = await axios.get(`${baseUrl}?serial=${serial}`)
 return data;
};
const add = async (payload) => {
 const res = await axios.post(`${baseUrl}`,payload)
 return res;
};

const edit = async (id,payload) => {
 const res = await axios.patch(`${baseUrl}/${id}`, payload)
 return res;
};

const deleteById = async (itemId) => {
 const res = await axios.delete(`${baseUrl}/${itemId}`)
 return res;
};
export default { getAll, deleteById, getAllNumber, add, edit, getBySerial };
