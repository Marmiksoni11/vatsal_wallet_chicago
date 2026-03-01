// All Chicago ZIP codes mapped to neighborhoods/community areas
export interface ChicagoZip {
  zip: string;
  neighborhood: string;
  area: string;
}

export const CHICAGO_ZIPS: ChicagoZip[] = [
  { zip: "60601", neighborhood: "The Loop", area: "Loop" },
  { zip: "60602", neighborhood: "The Loop", area: "Loop" },
  { zip: "60603", neighborhood: "The Loop", area: "Loop" },
  { zip: "60604", neighborhood: "The Loop", area: "Loop" },
  { zip: "60605", neighborhood: "South Loop", area: "Near South Side" },
  { zip: "60606", neighborhood: "The Loop", area: "Loop" },
  { zip: "60607", neighborhood: "West Loop", area: "Near West Side" },
  { zip: "60610", neighborhood: "Old Town", area: "Near North Side" },
  { zip: "60611", neighborhood: "Streeterville", area: "Near North Side" },
  { zip: "60614", neighborhood: "Lincoln Park", area: "Lincoln Park" },
  { zip: "60654", neighborhood: "River North", area: "Near North Side" },
  { zip: "60661", neighborhood: "West Loop", area: "Near West Side" },
  { zip: "60613", neighborhood: "Lakeview", area: "Lake View" },
  { zip: "60618", neighborhood: "North Center", area: "North Center" },
  { zip: "60625", neighborhood: "Lincoln Square", area: "Lincoln Square" },
  { zip: "60626", neighborhood: "Rogers Park", area: "Rogers Park" },
  { zip: "60630", neighborhood: "Jefferson Park", area: "Jefferson Park" },
  { zip: "60631", neighborhood: "Edison Park", area: "Edison Park" },
  { zip: "60634", neighborhood: "Portage Park", area: "Portage Park" },
  { zip: "60640", neighborhood: "Uptown", area: "Uptown" },
  { zip: "60641", neighborhood: "Old Irving Park", area: "Irving Park" },
  { zip: "60645", neighborhood: "West Ridge", area: "West Ridge" },
  { zip: "60646", neighborhood: "Sauganash", area: "Forest Glen" },
  { zip: "60647", neighborhood: "Bucktown", area: "Logan Square" },
  { zip: "60656", neighborhood: "Norwood Park", area: "Norwood Park" },
  { zip: "60657", neighborhood: "Lakeview", area: "Lake View" },
  { zip: "60659", neighborhood: "West Ridge", area: "West Ridge" },
  { zip: "60660", neighborhood: "Edgewater", area: "Edgewater" },
  { zip: "60622", neighborhood: "Wicker Park", area: "West Town" },
  { zip: "60639", neighborhood: "Belmont Cragin", area: "Belmont Cragin" },
  { zip: "60642", neighborhood: "Noble Square", area: "West Town" },
  { zip: "60651", neighborhood: "Humboldt Park", area: "Humboldt Park" },
  { zip: "60608", neighborhood: "Pilsen", area: "Lower West Side" },
  { zip: "60612", neighborhood: "Near West Side", area: "Near West Side" },
  { zip: "60616", neighborhood: "Chinatown", area: "Armour Square" },
  { zip: "60623", neighborhood: "Little Village", area: "South Lawndale" },
  { zip: "60624", neighborhood: "West Garfield Park", area: "West Garfield Park" },
  { zip: "60636", neighborhood: "West Englewood", area: "West Englewood" },
  { zip: "60644", neighborhood: "Austin", area: "Austin" },
  { zip: "60609", neighborhood: "Back of the Yards", area: "New City" },
  { zip: "60615", neighborhood: "Hyde Park", area: "Hyde Park" },
  { zip: "60617", neighborhood: "South Chicago", area: "South Chicago" },
  { zip: "60619", neighborhood: "Chatham", area: "Chatham" },
  { zip: "60620", neighborhood: "Auburn Gresham", area: "Auburn Gresham" },
  { zip: "60621", neighborhood: "Englewood", area: "Englewood" },
  { zip: "60628", neighborhood: "Roseland", area: "Roseland" },
  { zip: "60629", neighborhood: "Chicago Lawn", area: "Chicago Lawn" },
  { zip: "60632", neighborhood: "Brighton Park", area: "Brighton Park" },
  { zip: "60633", neighborhood: "Hegewisch", area: "Hegewisch" },
  { zip: "60637", neighborhood: "Woodlawn", area: "Woodlawn" },
  { zip: "60638", neighborhood: "Garfield Ridge", area: "Garfield Ridge" },
  { zip: "60643", neighborhood: "Beverly", area: "Beverly" },
  { zip: "60649", neighborhood: "South Shore", area: "South Shore" },
  { zip: "60652", neighborhood: "Ashburn", area: "Ashburn" },
  { zip: "60653", neighborhood: "Bronzeville", area: "Grand Boulevard" },
  { zip: "60655", neighborhood: "Pullman", area: "Pullman" },
  { zip: "60627", neighborhood: "Riverdale", area: "Riverdale" },
];

export const ALL_CHICAGO_ZIP_CODES = [...new Set(CHICAGO_ZIPS.map(z => z.zip))].sort();

export function getNeighborhood(zip: string): string {
  const entry = CHICAGO_ZIPS.find(z => z.zip === zip);
  return entry?.neighborhood ?? "Chicago";
}

export function getCommunityArea(zip: string): string {
  const entry = CHICAGO_ZIPS.find(z => z.zip === zip);
  return entry?.area ?? "Chicago";
}

export function isValidChicagoZip(zip: string): boolean {
  return ALL_CHICAGO_ZIP_CODES.includes(zip);
}
