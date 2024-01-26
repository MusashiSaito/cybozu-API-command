const axios = require('axios');

export async function garoonSoapGetRequest(url,xml,soapAction){
  const url = ""
  const header = ""
  const xml = createGetXml(id)
  const result = await axios.post(url, xml, header)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      return false
    });
    return result;
}

function createGetXml(id){
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