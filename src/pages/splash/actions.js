export default function attachActions() {
    const browseOpinionsButton = document.getElementById('browse-opinions');
    if (browseOpinionsButton instanceof HTMLButtonElement) {
        browseOpinionsButton.addEventListener('click', browseOpinionsOnClick);
    }
}

function browseOpinionsOnClick() {
    window.location.assign("/blog/dir.html");
}