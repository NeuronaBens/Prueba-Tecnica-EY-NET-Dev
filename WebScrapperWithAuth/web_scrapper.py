import requests
from bs4 import BeautifulSoup
import json

class Url:
    def __init__(self, baseUrl, keywords="", fromVal=0):
        self.baseUrl = baseUrl
        self.keywords = keywords
        self.fromVal = fromVal
    def updateFrom(self, newFromVal):
        self.fromVal = newFromVal
    def getUrlString(self):
        base_url = self.baseUrl
        search_query = self.keywords
        from_val = self.fromVal

        search_query = search_query.replace(" ", "+")
        search_query = search_query.replace("|", "%7C")

        return f"{base_url}?q={search_query}&from={from_val}"


def extractor(rows):
    result_list = []

    for row in rows:
        # Extract Entity
        entity = row.find("td").find("a").text.strip()
        # Extract Jurisdiction
        jurisdiction = row.find("td", class_="jurisdiction").text.strip()
        # Extract Linked To
        linked_to = row.find("td", class_="country").text.strip()
        # Extract Data From
        data_from = row.find("td", class_="source text-nowrap").find("a")["href"]
        # Create a JSON object and append it to the result list
        result_json = {
            "Entity": entity,
            "Jurisdiction": jurisdiction,
            "Linked To": linked_to,
            "Data From": data_from
        }
        result_list.append(result_json)
    
    return result_list

def scrape_offshore_leaks(entity):
    url_obj = Url("https://offshoreleaks.icij.org/search", entity, 0)
    full_url = url_obj.getUrlString()
    #set configuration to avoid scrape blocking
    request_headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        response = requests.get(full_url, headers=request_headers)
        response.raise_for_status()  # Raise an exception for bad responses

        soup = BeautifulSoup(response.content, "html.parser")

        if(len(soup) <= 1):
            return "The server is having trouble returning the expected output."

        table = soup.find("table", class_="table table-sm table-striped search__results__table")
        rows = table.find("tbody").find_all("tr")

        result_list = extractor(rows)
        # Create the outer JSON object
        outer_json = {
            "entry_count": len(result_list),
            "entries": result_list
        }

        # Convert the outer JSON object to a JSON string
        result_json_array = json.dumps(outer_json, indent=2)
        return result_json_array
    
    except requests.exceptions.RequestException as e:
        print(f"Error during request: {e}")
        return None

# Example usage
# print(scrape_offshore_leaks("china")[0:200])
