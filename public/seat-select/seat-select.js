const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const submitButton = document.getElementById('confirm-button');
const errorMsg = document.getElementById('error');
const givenName = document.getElementById('givenName');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const showSeats
const {flights} = req("./testdata/getSeat")
const errorMessages = {
  unavailable: "This seat is unavailable",
  booked: "You have already booked your flight with us!",
};
let selection = "";

const updateForm = () => {
  const flightform = document.getElementById('order').value;
  if (flightform === 'flight') {
    document.getElementById('SA123').style.display = 'flex';
  } else {
    document.getElementById('SA231').style.display = 'none';
  }
  document.getElementById(
    'flight-select'
  ).style.backgroundImage = `url(${flights[flightform].imgUrl}`;
};

const renderSeats = () => {
  document.querySelector(".form-container").style.display = "block";

  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
      
      if (flightSeating[flights]){
        const isAvailable = req.params.isAvailable
      res.render("test-data/flightSeating", {
        //need to put stuff here
      });
    } else {
      res.redirect("fourohfour", {
        title: "This page does not exist",
        path: req.originalUrl,
      })
    } 
 
      // TODO: render the seat availability based on the data...
      seat.innerHTML = seatAvailable;
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = (event) => {
  const flightNumber = flightInput.value;
  console.log("toggleFormContent: ", flightNumber);
  fetch(`/flights/${flightNumber}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
    if (flightNumber[flights]){
      const flight = req.params.id
    res.render("test-data/flightSeating", {
      //need to put stuff here
    });
  } else {
    res.redirect("fourohfour", {
      title: "This page does not exist",
      path: req.originalUrl,
    })
  } 
  // TODO: contact the server to get the seating availability
  //      - only contact the server if the flight number is this format 'SA###'.
  //      - Do I need to create an error message if the number is not valid?

  // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
  renderSeats();
};

const handleConfirmSeat = (event) => {
  event.preventDefault();
  // TODO: everything in here!
  fetch("/users", {
    method: "POST",
    body: JSON.stringify({
      givenName: document.getElementById("givenName").value,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((public) => {
      //might be seat select or verification))
      const { status, error } = public;
      if (status === "success") {
        window.location.href = "/confirmed";
      } else if (error) {
        submitButton.disabled = false;
        errorMsg.style.display = "flex";
        errorMsg.innerText = errorMessages[error];
      }
    });
};

flightInput.addEventListener("blur", toggleFormContent);
