import { config } from 'dotenv';
config();
import axios from 'axios';
const domain = process.env.DOMAIN;
const accessToken = process.env.ACCESS_TOKEN;
const user_id = 165;
const start = 1523672;
const end = 25332604;

eventDelete();

async function eventDelete(){
  const header = {
    headers: {
      'X-Cybozu-Authorization': accessToken,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  }
  for(let i = start; i < end; i ++){
    const getGaroonEvent = await garoonGetRequest(i, domain, header)
    console.log("getGaroonEvent",getGaroonEvent)
    if(getGaroonEvent){
      const checkId = await checkUserId(getGaroonEvent, user_id)
      console.log(checkId)
      if(checkId){
        await garoonDeleteRequest(i, domain, header);
      }
    } else {
      console.log("No get")
    }
  }
}

async function checkUserId(event, expectedId) {
  return Number(event.creator.id) === expectedId
}

async function garoonGetRequest(id, domain, header){
  const url = `https://${domain}/g/api/v1/schedule/events`
  return await axios.get(`${url}/${id}`, header)
  .then((response) => {
    return response.data
  })
  .catch(() => {
    return false
  })
}

async function garoonDeleteRequest(id, domain, header){
  const url = `https://${domain}/g/api/v1/schedule/events`
  await axios.delete(`${url}/${id}`, header)
  .then(() => {
    console.log(`${id} >> Delete!`)
  })
  .catch(() => {
    console.log(`${id} >> No Delete!`)
  })
}