import { url } from "./baseUrl";


export const hotels = async () => {
  const res = await fetch(`${url}/hotels`);

  const hotel = await res.json()    
}

module.exports = hotels
