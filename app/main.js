const camera = new Camera($("#player")[0]);

function _init() {
  const messages = new Message();

  // Notify user of connection errors
  window.addEventListener("messages_error", () => {
    toastr.error(
      "Messages could not be retreived. <br /> Will keep trying.",
      "Network connection error"
    );
  });

  // Listen for new message event
  window.addEventListener("new_message", (event) => {
    renderMessage(event.detail);
  });

  // Listen for existing messages from server
  window.addEventListener("messages_ready", () => {
    $("#loader").remove();

    // Check some messages exist
    if (!messages.all.length) {
      toastr.info("Add the first message.", "No messages");
    }

    // Empty out existing messages if this update is from a reconnection
    $("#messages").empty();

    // Loop and render all messages (reverse)
    messages.all.reverse().forEach(renderMessage);
  });

  // Switch on camera
  $("#viewfinder").on("show.bs.modal", () => {
    camera.switchOn();
  });

  // Switch off camera
  $("#viewfinder").on("hidden.bs.modal", () => {
    camera.switchOff();
  });

  // Take photo
  $("#shutter").on("click", () => {
    let photo = camera.takePhoto();

    // Show photo preview in camera button
    $("#camera").css("background-image", `url(${photo})`).addClass("withphoto");
  });

  // Submit message
  $("#send").on("click", () => {
    let caption = $("#caption").val();

    if (!camera.photo || !caption) {
      return toastr.warning("Photo & Caption required.", "Incomplete message");
    }

    let message = messages.add(camera.photo, caption);

    // Render new message in feed
    renderMessage(message);

    // Reset caption on success
    $("#caption").val("");
    $("#camera").css("background-image", "").removeClass("withphoto");

    camera.photo = null;
  });
}

// Create new message element
function renderMessage({ photo, caption }) {
  let msgHTML = `
        <div class="row message bg-light mb-2 rounded shadow" style="display: none">
            <div class="col-2 p-1" style="cursor: pointer">
                <img class="photo w-100 rounded" src="${photo}" alt="Message for this photo: ${caption}" />
            </div>
            <div class="col-10 p-1"> ${caption} </div>
        </div>
    `;

  $(msgHTML)
    .prependTo("#messages")
    .show(500)
    .find("img")
    .on("click", showPhoto);
}

// Show message photo in modal
function showPhoto(event) {
  let photoSrc = $(event.currentTarget).attr("src");

  // Set to and show photoframe modal
  $("#photoframe img").attr("src", photoSrc);
  $("#photoframe").modal("show");
}
