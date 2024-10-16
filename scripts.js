import details from './contest_details.json' with {type: 'json'};
import imageUrl from './imageUrl.json' with {type: 'json'};
const imageData = []
function loadJson() {
    var detailDiv = document.getElementById('details')
    const detailHTML = `
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Website</th>
          <th>Date</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        ${imageUrl.map(data => `
          <tr>
            <td data-label="Name">${data.name}</td>
            <td data-label="Website"><a href="${data.website}" target="_blank">${data.website}</a></td>
            <td data-label="Date">${data.date}</td>
            <td data-label="Location">
              <div class="location-container">
                <img src="${data.url}" alt="Image" class="location-image" />
                <span class="location-text">${data.location}</span>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;

    detailDiv.innerHTML = detailHTML;
}


function getSearchQuery(location) {
    const parts = location.split(',').map(part => part.trim());

    const city = parts[0];
    const state = parts[1] ? parts[1].split(' ')[0] : '';

    let query = '';
    if (state) {
        query = `${state} landmarks attractions`;
    } else {
        query = `${city} landmarks attractions`;
    }

    return encodeURIComponent(query);
}

function loadPhotos({ item }) {
    const searchQuery = getSearchQuery(item.location);
    fetch(`https://api.unsplash.com/search/photos?query=${item.location}attraction&client_id=Nku_pW6f-ratkSxLWMQgggXIGxwXuXO-_dkc9RH0wyk`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Some error');
            } else {
                return response.json();
            }
        })
        .then((data) => {
            if (data.results.length > 0) {
                const num = Math.floor(Math.random() * 10)
                imageData.push({ "name": item.Name, "id": item.id, "url": data.results[0].urls.regular, "website": item.website, "date": item.date, "location": item.location, });
            } else {
                console.error(`No image found for ${location}`);
            }
        })
        .catch((error) => {
            console.log(`Error fetching image for ${location}:`, error);
        });
}

function iterateAndFetch() {
    for (const item of updatedDetails) {
        loadPhotos({ item });
    }
    console.log(imageData);
}

const updatedDetails = details.map((data, index) => ({
    ...data,
    id: index + 1
}))
function findMissingId() {
    const fetchedIds = new Set(imageUrl.map(entry => entry.id));
    const missingIds = [];
    const maxId = Math.max(...fetchedIds);
    for (let i = 1; i <= maxId; i++) {
        if (!fetchedIds.has(i)) {
            missingIds.push(i);
        }
    }

    console.log(missingIds);
}

// findMissingId();
// console.log(updatedDetails);
// iterateAndFetch()
loadJson()