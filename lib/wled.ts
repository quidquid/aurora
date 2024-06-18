
async function fetchJson(ip: string) {
    const res = await fetch(`http://${ip}/json`)
    if(!res.ok) {
      throw new Error('failed')
    }
    const json = res.json()
    return json
}

async function postLEDSettings(ip: string, data: Record <string,string>) {
  const query = new URLSearchParams(data)
  const res = await fetch(`http://${ip}/settings/led`, {
    method: 'POST',
    cache: 'no-cache',
    body: query.toString(),
  })
  if (!res.ok) {
    throw new Error('failed')
  }
  return true
}

function jsonToAttrs(json) {
  return {
    mac:    json.info.mac,
    ip:     json.info.ip,
    name:   json.info.name,
    info:   json.info,
    state:  json.state,
    lastSeen: new Date(),
  }
}

const wledApi = {
  fetchJson,
  postLEDSettings,
  //postUISettings,
  //postWifiSettings,
  jsonToAttrs,
}

export default wledApi
