/**
 * Location type with definition constraints:
 *    street: string(length: 5-100)
 *    city: string(length: 2-30)
 *    state: string(length: 2-30)
 *    country: string(length: 2-30)
 *    timezone: string(Valid timezone value ex. +7:00, -1:00)
 */
type Location = {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
};

export default Location;
