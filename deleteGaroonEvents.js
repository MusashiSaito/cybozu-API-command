import { getScheduleEventsUrl } from './getScheduleEventsUrl'
import { garoonDeleteRequest } from './src/garoon/rest/delete'
import { getEvent } from './src/garoon/rest/get'
require('dotenv').config();

deleteGaroonEvent();

export async function deleteGaroonEvent(userInfo){
  const promises = [];
  for (let i = userInfo.start; i <= userInfo.end; i++) {
    promises.push(processGaroonEvent(i, userInfo.domain, userInfo.header));
  }
  await Promise.all(promises);
}

async function processGaroonEvent(i, domain, header) {
  const getGaroonEvent = await getEvent(i, domain, header);
  if (getGaroonEvent && Number(getGaroonEvent.creator.id) === expectedId) {
    await garoonDeleteRequest(i, domain, header);
  }
}
