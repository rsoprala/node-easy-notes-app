const axios = require('axios');
const config = require('../../config/devconfig.js');

exports.getinfo = (req, res) => {
  const gitUrl = config.git_url;
  const userId = req.params.userId;

  getData(gitUrl, userId).then(data => {
    if (!data) {
      return res.status(404).send({
        message: "Git data not found for userid: " + req.params.userId
      });
    }
    res.send(data);
  });
};

async function getData(url, userId) {
  const userInfo = await getUser(url, userId)
  const repoList = await getRepoList(userInfo.repos_url)
  return {
    id: userInfo.login,
    name: userInfo.name,
    public_repos: userInfo.public_repos,
    repos_url: userInfo.repos_url,
    repo_list: repoList
  }
}

async function getUser(url, userId) {
  try {
    const gitUserUrl = `${url}/${userId}`
    console.log(`Retrieving git user info url:${gitUserUrl}`)
    const response = await axios.get(gitUserUrl);
    console.log(" Git user response login : " + response.data.login)
    return response.data
  } catch (error) {
    console.log(error);
  }
}

async function getRepoList(reposUrl) {
  try {
    console.log(`Retrieving git user repos, url:${reposUrl}`)
    const response = await axios.get(reposUrl);
    return response.data.map(r => r.name);
  } catch (error) {
    console.log(error);
  }
}

