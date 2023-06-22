const makeRequest = async (url, data) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_CONFIG_.API_KEY}`,
      // Our _CONFIG data is imported in the HTML file using the <script> tag meaning
      // it is then accessible via global scope (other JS files, browser console, etc).
    },
    method: 'POST',
    body: JSON.stringify(data)
  });

  return response.json();
}

const addActionMessage = (message) => {
  chatGptMessages.push({
    role: 'user',
    content: `${message}. If this action is fatal the action list is empty. Don't give any text other than a JSON object. Your responses are only in JSON format like this example:\n\n###\n\n {"setting": "
you died for this reason", "actions": []}###`
  })
}

const showLoadingAnimation = (isLoading) => {
  const loadingScreen = document.querySelector('.loading');
  if(isLoading) {
    loadingScreen.classList.remove('hidden');
    stageContainer.classList.add('hidden');
  } else {
    loadingScreen.classList.add('hidden');
    stageContainer.classList.remove('hidden');
  }
}

const showErrorMessage = (isError) => {
  const loadingScreen = document.querySelector('.error');
  if(isError) {
    loadingScreen.classList.remove('hidden');
  } else {
    loadingScreen.classList.add('hidden');
  }
}

const showGenresButtons = (isVisible) => {
  const genres = document.querySelector('.genres');
  if(isVisible) {
    genres.classList.remove('hidden');
  } else {
    genres.classList.add('hidden');
  }
}
