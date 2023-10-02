const allProfilesDiv = document.querySelector('.all-profiles-div');
const searchInput = document.querySelector('.search-input');
const btn = document.querySelector('.rounded')
const btnIcon = document.querySelector('.fa-solid')
const defaultImage = "https://res.cloudinary.com/djxkmpkuq/image/upload/v1680859085/R_kcyx7x.png"


const loadProfiles = async () => {
  let data = await fetch('/profiles/profiles.json');
  let profiles = await data.json();
  let sortedProfiles = profiles.sort((a, b) => a.name.localeCompare(b.name));

  sortedProfiles.forEach((profile) => {
    let profileDiv = document.createElement('div');
    let profileUrl = `https://github.com/${profile.username}`;

    profileDiv.innerHTML = `
      <a href="${profileUrl}" target="_blank">
        <img src="${profile.image}" onerror="this.onerror=null; this.src='${defaultImage}';"/> 
      </a> 
      <p class="profile-name" onclick="redirect(this)">${profile.name}</p>
      <p class="profile-username" onclick="redirect(this)">@${profile.username}</p>
      <a href="${profileUrl}" target="_blank"><button>Follow</button></a> 
    `;
    profileDiv.classList.add('profile-div');
    allProfilesDiv.append(profileDiv);
    
  });
};

searchInput.addEventListener('keyup', () => {
  if (searchInput.value.length > 0) {
    document.querySelectorAll('.profile-div').forEach((element) => {
      element.style.display = 'none';
    });
  }

  let profileNames = document.querySelectorAll('.profile-name');
  let visibleProfiles = 0;
  profileNames.forEach((profileElement) => {
    if (
      profileElement.innerText.toLowerCase().includes(searchInput.value.toLowerCase().trim())
    ) {
      profileElement.parentElement.style.display = 'flex';
      visibleProfiles++;
    }
  });

  // if there is a profile to show, hide the no profile div
  if (visibleProfiles !== 0) {
    document.querySelector('.no-profile-div').style.display = 'none';
  } else {
    document.querySelector('.no-profile-div').style.display = 'flex';
  }
});

btn.addEventListener('click', e => {
  btn.classList.toggle('background-moon')
  btnIcon.classList.toggle('fa-moon')
  document.body.classList.toggle('night-mode')
 })

// load all profiles
loadProfiles();


// github icons
async function fetchData(repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function updateBadges(repo) {
  const data = await fetchData(repo);

  if (data) {
    const forksBadge = document.getElementById('forks-badge');
    forksBadge.innerHTML = `<a href="https://github.com/${repo}/fork" target="_blank" style="text-decoration: none;"><i class="fas fa-code-branch" style="color: #000;"></i> ${data.forks}</a>`;

    const starsBadge = document.getElementById('stars-badge');
    starsBadge.innerHTML = `<a href="https://github.com/${repo}/stargazers" target="_blank" style="text-decoration: none;"><i class="fas fa-star" style="color: #000;"></i> ${data.stargazers_count}</a>`;

    const contributorsBadge = document.getElementById('contributors-badge');
    contributorsBadge.innerHTML = `<a href="https://github.com/${repo}/graphs/contributors" target="_blank"><i class="fas fa-users" style="color: #000;"></i>${data.contributors}</a>`;
}
}

const repository = ' prashantjagtap2909/Connecting'; 
updateBadges(repository);

