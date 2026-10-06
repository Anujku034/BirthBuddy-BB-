self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();

  const title = data.title || "BirthdayBuddy 🎂";

  const options = {
    body: data.body || "You have a birthday reminder 🎂",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: data,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(
      "http://localhost:5173/dashboard/messages"
    )
  );
});