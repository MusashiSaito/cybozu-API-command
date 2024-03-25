import { config } from 'dotenv';
config();
import { axios } from 'axios';
import { xml2js } from 'xml2js';
const appId = '4403';
const subdomain = process.env.DOMAIN;
const apiToken = process.env.ACCESS_TOKEN;
const chobiitUserName = process.env.USER_NAME;
const user_id = 165
const start = 1522066
const end = 1523066

async () => {
  for(let i = start; i < end; i ++){
    console.log(i)
    const xml = getXml(i);
    const getGaroonSoapEvent = await garoonSoapGetRequest(`https://${subdomain}/g/cbpapi/schedule/api.csp`,xml,"ScheduleGetEventsById")
    if(getGaroonSoapEvent){
      const checkId = await checkUserId(getGaroonSoapEvent, user_id)
      if(checkId){
        const deleteXml = getDeleteXml(i)
        await garoonSoapDeleteRequest(deleteXml,i);
      }
    }
  }
}



function getXml (id){
  return `<?xml version="1.0" encoding="UTF-8"?>
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
    <soap:Header>
      <Action>ScheduleGetEventsById</Action>
      <Security>
        <UsernameToken>
          <Username>Novel-tester-001</Username>  
          <Password>Novel-tester-001</Password> 
        </UsernameToken>
      </Security>
      <Timestamp>
        <Created>2023-10-17T16:41:00Z</Created>
        <Expires>2037-08-12T14:45:00Z</Expires>
      </Timestamp>
      <Locale>ja</Locale>
    </soap:Header>
    <soap:Body>
      <ScheduleGetEventsById>
        <parameters>
          <event_id xmlns="">${id}</event_id>
        </parameters>
      </ScheduleGetEventsById>
    </soap:Body>
  </soap:Envelope>`
}


function getDeleteXml(id){
  return `<?xml version="1.0" encoding="UTF-8"?>
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
    <soap:Header>
      <Action>ScheduleRemoveEventsFromRepeatEvent</Action>
      <Security>
        <UsernameToken>
          <Username>Novel-tester-001</Username>  
          <Password>Novel-tester-001</Password> 
        </UsernameToken>
      </Security>
      <Timestamp>
        <Created>2023-10-17T16:41:00Z</Created>
        <Expires>2037-08-12T14:45:00Z</Expires>
      </Timestamp>
      <Locale>ja</Locale>
    </soap:Header>
    <soap:Body>
      <ScheduleRemoveEventsFromRepeatEvent>
        <parameters>
  <operation event_id="${id}" type="all"></operation>
        </parameters>
      </ScheduleRemoveEventsFromRepeatEvent>
    </soap:Body>
  </soap:Envelope>`
}

async function checkUserId(xml, expectedId) {
  const parser = new xml2js.Parser();
  try {
    const result = await parser.parseStringPromise(xml);
    const userElement = result['soap:Envelope']['soap:Body'][0]['schedule:ScheduleGetEventsByIdResponse'][0]['returns'][0]['schedule_event'][0]['members'][0]['member'][0]['user'][0]['$'];
    const userId = userElement.id;

    return userId === expectedId.toString();
  } catch (err) {
    return false
  }
}

async function garoonSoapGetRequest(url,xml,soapAction){
  const result = await axios.post(
    url,
    xml,
    {
      headers: {
        'Content-Type': 'text/xml',
        'SOAPAction': soapAction,
      }
    }
    )
    .then((response) => {
      return response.data
    })
    .catch(() => {
      return false
    });
    return result;
}

async function garoonSoapDeleteRequest(xml,id){
  await axios.post(
    `https://${subdomain}/g/cbpapi/schedule/api.csp`,
    xml,
    {
      headers: {
        'Content-Type': 'text/xml',
        'SOAPAction': 'ScheduleGetEventsById',
      }
    }
    ).then(() => {
      console.log(`${id} >> Delete!`)
    })
    .catch(() => {
      console.log(`${id} >> No Delete!`)
    });
}