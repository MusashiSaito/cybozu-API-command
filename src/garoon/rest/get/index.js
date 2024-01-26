const axios = require('axios');

export async function getEvent(id, domain, header){
  const url = getScheduleEventsUrl(domain)
  return await axios.get(`${url}/${id}`, header)
}