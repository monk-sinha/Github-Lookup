const apiURL = 'https://api.github.com/users/';

document.getElementById('btn').addEventListener('click',showGitHubProfile);

function showGitHubProfile(){
    let name = document.getElementById('g-username').value;
    let url = apiURL+name;
    
    fetch(url).then(res => res.json()).then(data => {
        if(data.message){
            console.log('No profile sorry!')
        } else {
            console.log(data);
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
        <div class="repo-card">
            <div class="repo-title">repo name</div>
            <div>repo about</div>
            <div>repo tags</div>
        </div>


            `
        }
    }).catch(e => {
        console.log(e)
    })

}