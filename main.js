const chatGptMessages = [];

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

const startGame = async (genre) => {
  // Message to send to ChatGPT to start the game
  chatGptMessages.push({
    role: 'system',
    content: 'I want you to play like a classic text adventure game. I will be the protagonist and main player. Don\'t refer to yourself. ' +
      'The setting of this game will have a theme of ' + genre + '. ' +
      'Each setting has a description of 150 characters followed by an array of 3 possible actions that the player can perform. ' +
      'One of these actions is fatal and ends the game. Never add other explanations. Don\'t refer to yourself. ' +
      'Your responses are just in JSON format like this example:\n\n###\n\n {"setting":"setting description","actions":["action 1", "action 2", "action 3"]}\n\n###\n\n'
  });

  showLoadingAnimation(true);

  // Send request to ChatGPT Chat Completion API
  // https://platform.openai.com/docs/api-reference/chat/create
  const chatJSON = await makeRequest(
    _CONFIG_.API_BASE_URL + '/chat/completions',
    {
      model: _CONFIG_.GPT_MODEL,
      messages: chatGptMessages,
      temperature: 0.7
      // The model predicts which text is most likely to follow the text preceding it.
      // Temperature is a value between 0 and 1 that essentially lets you control how confident the model should be when making these predictions.
      // Lowering temperature means it will take fewer risks, and completions will be more accurate and deterministic.
      // Increasing temperature will result in more diverse completions.
  });

  const message = chatJSON.choices[0].message;
  const content = JSON.parse(message.content);
  const { setting, actions } = content;
  console.log('SETTING:', setting);
  console.log('ACTIONS:', actions);

  showLoadingAnimation(false);
}

const init = () => {
  const genres = document.querySelectorAll('.genre');
  genres.forEach((button) => button.addEventListener(
    'click',
    () => startGame(button.dataset.genre))
  )
}

init()
