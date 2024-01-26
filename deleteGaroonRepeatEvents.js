require('dotenv').config();
const axios = require('axios');
const xml2js = require('xml2js');

deleteGaroonRepeatEvents();

async function deleteGaroonRepeatEvents(userInfo){
  for(let i = userInfo.start; i <= userInfo.end; i ++){
    if(getGaroonSoapEvent){
      const checkId = await checkUserId(getGaroonSoapEvent,62)
      if(checkId){
        const deleteXml = createDeleteXml(i)
        await garoonSoapDeleteRequest(deleteXml,i);
      }
    }
  }
}

async function checkUserId(xml, expectedId) {
  const parser = new xml2js.Parser();
  try {
    const result = await parser.parseStringPromise(xml);
    const userElement = result['soap:Envelope']['soap:Body'][0]['schedule:ScheduleGetEventsByIdResponse'][0]['returns'][0]['schedule_event'][0]['members'][0]['member'][0]['user'][0]['$'];

    return userElement.id === expectedId.toString();
  } catch (err) {
    return false
  }
}