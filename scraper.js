const apiURL = 'https://api.github.com/users/';
const bar = document.getElementById('g-username');
const button = document.getElementById('btn');
const repoCard = document.getElementById('repo');

bar.addEventListener("keypress", e=>{
    if(e.key === "Enter"){
        e.preventDefault();
        button.click();
    }
});

button.addEventListener('click',showGitHubProfile);

const createErrorCard = (message) => {
    const cardHTML = `
        <div class="repo-card"><h1>${message}</h1></div>
    `;
    document.getElementById('res').innerHTML = cardHTML;
}

function showGitHubProfile(){
    const username = bar.value;
    const url = apiURL+username;

    const request = async () =>{
        try{
            const res = await fetch(url);
            const data = await res.json();
            const repositoriesData = await (await fetch(`${apiURL}${username}/repos`)).json();
            if(data.message){
                createErrorCard("Hmm, this profile doesn't exist..");
                console.log('No profile sorry!')
            }
                document.getElementById("res").innerHTML = `
                <div class="profile-card">
                <img class="profile-pic" src="${data.avatar_url}"/>
                <p class="profile-name">${data.name}</p>
                <a class="profile-header" href="https://github.com/${data.login}">${data.login}</a>
    
                <ul class="list">
                    <li>${data.followers} followers</li>
                    <li>${data.following} following</li>
                    <li>${data.public_repos} repositories</li>
                </ul>
                </div> 
    
                `;
                document.getElementById('res').style.display = "grid";    
        
                repositoriesData.forEach(repo => {
                        const repoDiv = document.createElement('div');
                        repoDiv.classList.add('repo-card');
                      
                        const repoTitle = document.createElement('h3');
                        repoTitle.textContent = repo.name;
                        repoDiv.appendChild(repoTitle);
                      
                        const repoAbout = document.createElement('p');
                        repoAbout.textContent = repo.description || 'No description available.';
                        repoDiv.appendChild(repoAbout);
                      
                        const repoURL = document.createElement('a');
                        repoURL.href = repo.html_url;
                        repoURL.textContent = 'View on GitHub';
                        repoDiv.appendChild(repoURL);
                      
                        repoCard.appendChild(repoDiv);
                      });
                      
            }catch (error) {
                console.log('Error:', error);
            }
        };
    request();
    }




