import details from './contest_details.json' with {type: 'json'};

var detailDiv = document.getElementById('details')

const detailHTML = details.map(data => `
    <div class="data">
        <p><strong>Name</strong> : ${data.Name}</p>
        <p><strong>Website</strong> : <a href=${data.website}>${data.website}</a></p>
        <p><strong>Date</strong> : ${data.date}</p>
        <p><strong>Location</strong> : ${data.location}</p>
    </div>
    `)

detailDiv.innerHTML = detailHTML.join('')
