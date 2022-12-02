function getBackendUrl() {
  if (process.env.NODE_ENV === "production") {
    return "https://bananabackend.azurewebsites.net/";
  } else {
    return "http://localhost:5000/";
  }
}

export default getBackendUrl;
