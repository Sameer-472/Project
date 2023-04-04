export let connection_string;
export let image_url;

const PORT = 5000;

if (window.location.hostname == "localhost") {
  connection_string = `http://localhost:${PORT}/api/v1`;
  image_url = `http://localhost:${PORT}/`;
} else {
  connection_string = `https://dev74.onlinetestingserver.com:${PORT}/api/v1`;
  image_url = `https://dev74.onlinetestingserver.com:${PORT}/`;
}
