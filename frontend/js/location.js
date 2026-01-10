export function getLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      return resolve({ latitude: 0, longitude: 0 });
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      () => resolve({ latitude: 0, longitude: 0 }), 
      { timeout: 5000 }
    );
  });
}
