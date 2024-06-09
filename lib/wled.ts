
async function fetchJson(ip: string) {
    const res = await fetch(`http://${ip}/json`)
    if(!res.ok) {
      throw new Error('failed')
    }
    const json = res.json()
    return json
}

const wledApi = {
  fetchJson
}

export default wledApi
