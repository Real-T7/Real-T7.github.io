function deleteAllData() {
  if (confirm("are you sure you want to delete all data on this browser?")) {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }
}