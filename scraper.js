const apiURL = 'https://api.github.com/users/';
const bar = document.getElementById('g-username');
const button = document.getElementById('btn');
const repoCard = document.getElementById('repository');

const img = document.getElementById('img');
const nameElement = document.getElementById('name');
const portfolioElement = document.getElementById('uname');
const followersElement = document.getElementById('followers');
const followingElement = document.getElementById('following');
const repoElement = document.getElementById('repo');

function showGitHubProfile(){
    const username = bar.value;
    const url = apiURL+username;

    const request = async () =>{
        try{
            const response = await fetch(url);
            const {avatar_url,name, login,html_url,followers,following,public_repos} = await response.json()
            if(response.status === 404){
                console.log('No profile sorry!');
            } 
            img.src = avatar_url;
            nameElement.textContent = name;
            portfolioElement.textContent = login;
            portfolioElement.href = `${html_url}`;
            followersElement.textContent = `${followers} followers`;
            followingElement.textContent = `${following} following`;
            repoElement.textContent = `${public_repos} repostories`;


            document.getElementById('res').style.display = "grid";    

            const repositoriesData = await (await fetch(`${url}/repos`)).json();
        
            repositoriesData.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.classList.add('repo-card');
                      
                const repoTitle = document.createElement('h3');
                repoTitle.innerHTML = repo.name;    
                repoDiv.appendChild(repoTitle);
                      
                    const repoAbout = document.createElement('p');
                    repoAbout.innerHTML = repo.description || 'No description available.';
                    repoDiv.appendChild(repoAbout);
                      
                    const repoURL = document.createElement('a');
                    repoURL.href = repo.html_url;
                    repoURL.innerHTML = 'View on GitHub';
                    repoDiv.appendChild(repoURL);
                      
                repoCard.appendChild(repoDiv);
                });
                      
            }catch (error) {
                console.log('Error:', error);
            }
        };
    request();
    }

 bar.addEventListener("keypress", e=>{
    if(e.key === "Enter"){
        e.preventDefault();
        button.click();
    }
});
    
button.addEventListener('click',showGitHubProfile);