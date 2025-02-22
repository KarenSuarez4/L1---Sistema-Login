document.getElementsByTagName("button")[0].addEventListener("click", async () => {
    try {
        const response = await fetch('/logout', { method: 'POST' });
        if (response.ok) {
            document.location.href = "/";
        } else {
            console.error('Error during log out');
        }
    } catch (error) {
        console.error('Error during log out', error);
    }
});