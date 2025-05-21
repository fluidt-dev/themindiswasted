document.addEventListener("DOMContentLoaded", () => {
    fetch("/socialmedia.html")
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        })
        .then(html => {
            document.getElementById("socialitems").innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading content:", error);
        });
});