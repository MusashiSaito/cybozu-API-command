const axios = require('axios');

export async function DeleteRequest(id){
  const xml = createDeleteXml(id)

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

function createDeleteXml(id){
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