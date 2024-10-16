import features_data from '../Data/features_data.json' with {type: 'json'};
import advantages_data from '../Data/advantages_data.json' with {type: 'json'};;
import additional_features from '../Data/additional_features.json' with {type: 'json'};;
import subscribers from '../Data/subscribers.json' with {type: 'json'};;
import value from '../Data/value_propositions.json' with {type: 'json'};;

var features_div = document.getElementById('feature_points');
var advantages_div = document.getElementById('advantages_points');
var additional_features_div = document.getElementById('additional_features_points');
var subscribers_div = document.getElementById('subscribers_points');
var value_div = document.getElementById('value_propositions_points');

const createListHTML = (data) => `
  <ul class="list">
    ${data.map(item => `
      <li><strong>${item.title}</strong>: ${item.content}</li>
    `).join('')}
  </ul>
`;

features_div.innerHTML = createListHTML(features_data);
advantages_div.innerHTML = createListHTML(advantages_data);
additional_features_div.innerHTML = createListHTML(additional_features);
subscribers_div.innerHTML = createListHTML(subscribers);
value_div.innerHTML = createListHTML(value);
