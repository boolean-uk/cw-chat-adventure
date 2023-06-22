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

const showLoadingAnimation = (isLoading) => {
  const loadingScreen = document.querySelector('.loading');
  if(isLoading) {
    loadingScreen.classList.remove('hidden');
  } else {
    loadingScreen.classList.add('hidden');
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
