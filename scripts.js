document.getElementById('down').addEventListener('click', function() {
    window.location.reload();
});

async function loadRandomWikipediaParagraph() {
    try {
        const response = await fetch('https://fr.wikipedia.org/api/rest_v1/page/random/summary');
        if (!response.ok) throw new Error('Failed to fetch Wikipedia data');
        const data = await response.json();
        const firstParagraph = data.extract.split('\n')[0];
        const title = data.title;
        const pageUrl = data.content_urls.desktop.page;
        const imageUrl = data.thumbnail ? data.thumbnail.source : null;
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.innerHTML = `
                <h2>${title}</h2>
                ${imageUrl ? `<img src="${imageUrl}" alt="${title}" />` : ''}
                <p>${firstParagraph}</p>
                <a href="${pageUrl}" target="_blank">Lire la suite</a>
            `;
        } else {
            console.error('No <main> element found in the document.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

window.addEventListener('load', loadRandomWikipediaParagraph);