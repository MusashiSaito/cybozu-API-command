const axios = require('axios');

export async function garoonDeleteRequest(id, domain, header){
  const url = getScheduleEventsUrl(domain)
  await axios.delete(`${url}/${id}`, header)
  .then(() => {
    console.log(`event: id(${id}) is deleted!`)
  })
}